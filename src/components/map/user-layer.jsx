import { useContext, useEffect, useMemo, useState } from "react";
import { Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";
import { DetailStateContext } from "../layout/map-layout";
import { useUserReviews } from "../../hooks/queries/use-reviews-data";
import { useRestaurantThumbnails } from "../../hooks/queries/use-restaurants-data";
import { getCarDirection } from "../../api/kakao-directions";
import { centerMapOnPositions } from "./map-utils";
import MapInstanceContext from "./map-context";

const UserMarkerLayer = () => {
  const {
    selectedUser,
    selectedRestaurant,
    setActiveTab,
    setSelectedRestaurant,
  } = useContext(DetailStateContext);
  const { map } = useContext(MapInstanceContext);

  const { data: reviews } = useUserReviews(selectedUser?.id);

  // 동일한 맛집(restaurant_id)에 대해 리뷰 id가 가장 낮은 것 하나만 유지
  const reviewsByRestaurant = useMemo(() => {
    if (!reviews?.length) return [];
    const byRestaurant = new Map();
    for (const r of reviews) {
      const rid = r?.restaurant_id ?? r?.restaurantId ?? r?.restaurant?.id;
      if (rid == null) continue;
      const key = Number(rid);
      if (Number.isNaN(key)) continue;
      const reviewIdNum = Number(r?.id ?? r?.visit_id ?? r?.visitId ?? Infinity);
      const existing = byRestaurant.get(key);
      const existingIdNum =
        existing == null
          ? Infinity
          : Number(existing?.id ?? existing?.visit_id ?? existing?.visitId ?? Infinity);
      if (existing == null || existingIdNum > reviewIdNum) {
        byRestaurant.set(key, r);
      }
    }
    return [...byRestaurant.values()].sort(
      (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
    );
  }, [reviews]);

  // 리뷰별 마커 위경도 결과
  const [reviewMarkers, setReviewMarkers] = useState([]);
  // Kakao Mobility API에서 받아온 도로 경로 세그먼트 (1→2, 2→3 ...)
  const [routeSegments, setRouteSegments] = useState([]);
  // 마커/경로가 어떤 유저 것인지 (selectedUser 변경 시 이전 경로가 안 보이도록)
  const [markersUserId, setMarkersUserId] = useState(null);

  // 1) reviewsByRestaurant에서 restaurantId 배열 뽑기
  const restaurantIds = useMemo(
    () =>
      (reviewsByRestaurant ?? [])
        .map((r) => r?.restaurant_id ?? r?.restaurantId ?? r?.restaurant?.id)
        .filter((id) => id != null && !Number.isNaN(Number(id))),
    [reviewsByRestaurant]
  );


  // 2) 한 번에 썸네일 맵 가져오기 (키: 맛집 id 숫자, 값: URL 문자열)
  const {
    data: thumbnailMap = {},
  } = useRestaurantThumbnails(restaurantIds);

  // 지오코딩은 reviewsByRestaurant만 보고 실행 (thumbnailMap 제외 → 썸네일 로드 시 재실행 방지로 경로 지연 해소)
  useEffect(() => {
    if (!selectedUser?.id || !reviewsByRestaurant?.length) return;

    const currentUserId = selectedUser.id;
    const { kakao } = window;
    if (!kakao?.maps?.services) return;

    const geocoder = new kakao.maps.services.Geocoder();

    const geocodePromises = reviewsByRestaurant.map((review) => {
      const r = review.restaurant;
      if (!r) return Promise.resolve(null);

      console.log('thumbnail', thumbnailMap[review.restaurant_id])
      const thumbnail = thumbnailMap[review.restaurant_id] ?? null

      if (r.latitude != null && r.longitude != null) {
        return Promise.resolve({
          position: {
            lat: parseFloat(r.latitude),
            lng: parseFloat(r.longitude),
          },
          restaurant: r,
          thumbnail
        })
      }

      if (!r.address) return Promise.resolve(null);

      return new Promise((resolve) => {
        geocoder.addressSearch(r.address, (result, status) => {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            const { x, y } = result[0];
            resolve({
              position: { lat: parseFloat(y), lng: parseFloat(x) },
              restaurant: r,
              thumbnail
            });
          } else {
            resolve(null);
          }
        })
      })
    });

    let cancelled = false;

    Promise.all(geocodePromises).then((markers) => {
      if (cancelled) return;
      if (currentUserId !== selectedUser?.id) return;
      setReviewMarkers(markers.filter(Boolean));
      setMarkersUserId(currentUserId);
    });

    return () => {
      cancelled = true;
    };
  }, [selectedUser?.id, thumbnailMap])

  // reviewsByRestaurant가 맛집당 1개이므로 reviewMarkers도 맛집당 1개 → 별도 unique/limited 제거
  useEffect(() => {
    if (!reviewMarkers?.length || reviewMarkers.length < 2) {
      return;
    }

    let cancelled = false;
    const positions = reviewMarkers.map((m) => m.position);

    const fetchRoute = async () => {
      const segments = [];

      for (let i = 0; i < positions.length - 1; i++) {
        if (cancelled) return;

        const segment = await getCarDirection(positions[i], positions[i + 1]);
        if (cancelled) return;

        // API 실패 시: 단순 직선 경로로 대체
        let path =
          segment && segment.length ? segment : [positions[i], positions[i + 1]];
        if (path.length === 1) path = [positions[i], positions[i + 1]];

        // 경로 중간쯤을 라벨 위치로 사용
        const mid = Math.floor(path.length / 2);
        const labelPosition = path[mid] || positions[i + 1];

        segments.push({ path, labelPosition });
      }

      if (!cancelled) setRouteSegments(segments);
    };

    fetchRoute();
    return () => {
      cancelled = true;
    };
  }, [reviewMarkers]);

  const pathPositions = useMemo(
    () => (reviewMarkers.length ? reviewMarkers.map((m) => m.position) : []),
    [reviewMarkers]
  );

  // 4) 마커/경로 기준으로 지도 중심 맞추기
  useEffect(() => {
    const listPanelWidth = document.getElementById("list-panel")?.offsetWidth ?? 100;
    const detailPanelWidth = document.getElementById("detail-panel")?.offsetWidth ?? 100;
    const offsetX = (detailPanelWidth + listPanelWidth) / 2 * -1; // 지도를 왼쪽으로 half만큼 밀기
    const offsetY = 10;

    centerMapOnPositions(map, pathPositions, { offsetX, offsetY });
  }, [map, pathPositions, reviewMarkers]);

  // 5) 마커 클릭 시: 해당 식당 상세로 전환
  const handleUserPathMarkerClick = (restaurant) => {
    setActiveTab?.("restaurants");
    setSelectedRestaurant?.(restaurant);
  };

  // 유저가 선택되지 않았거나, 맛집이 선택된 상태라면 아예 아무 것도 렌더하지 않음
  if (!selectedUser || selectedRestaurant) return null;
  // 현재 마커/경로가 선택된 유저 것일 때만 표시 (selectedUser 변경 시 이전 경로 즉시 제거)
  if (markersUserId !== selectedUser?.id) return null;

  const SEGMENT_COLORS = [
    // 무지개 계열 파스텔 톤
    "#ffb3ba", // red
    "#ffd1ba", // orange
    "#ffe6ba", // light orange/yellow
    "#fff5ba", // yellow
    "#e4ffba", // yellow-green
    "#baffc9", // green
    "#bafff2", // cyan
    "#bae1ff", // blue
    "#d7baff", // indigo/purple
    "#ffbaff", // pink
    // 추가: 겹치지 않는 창의적인 파스텔/소프트 컬러들
    "#ffc9de", // soft rose
    "#c9ffeb", // mint
    "#c9e5ff", // sky
    "#e0c9ff", // lavender
    "#ffc9c9", // soft coral
    "#c9ffd1", // mint green
    "#ffe0c9", // peach
    "#f5ffc9", // pale lemon
    "#c9f0ff", // pale aqua
    "#f0c9ff", // soft magenta
  ];

  return (
    <>
      {/* 유저가 방문한 맛집 위치: 썸네일 원형 뱃지 + 상단 번호 */}
      {reviewMarkers.map(({ position, restaurant, thumbnail }, idx) => (
        <CustomOverlayMap key={`review-marker-${idx}`} position={position} yAnchor={1}>
          <button
            type="button"
            onClick={() => handleUserPathMarkerClick(restaurant)}
            className="relative flex items-center justify-center w-12 h-12 rounded-full shadow-md border border-white overflow-hidden bg-gray-100"
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt={restaurant?.name ?? "맛집"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <span className="relative z-10 self-start px-1.5 text-red-400 font-bold">
              {idx + 1}
            </span>
          </button>
        </CustomOverlayMap>
      ))}

      {/* 마커 2개 이상일 때만 경로 표시 */}
      {reviewMarkers.length >= 2 &&
        routeSegments.map((segment, idx) => (
          <Polyline
            key={`route-segment-bg-${idx}`}
            path={segment.path}
            strokeWeight={6} // 색 선보다 살짝 두껍게
            strokeColor="#9ca3af" // gray-400
            strokeOpacity={0.7}
            strokeStyle="solid"
          />
        ))}

      {reviewMarkers.length >= 2 &&
        routeSegments.map((segment, idx) => (
          <Polyline
            key={`route-segment-${idx}`}
            path={segment.path}
            strokeWeight={4}
            strokeColor={
              SEGMENT_COLORS[idx] ?? SEGMENT_COLORS[SEGMENT_COLORS.length - 1]
            }
            strokeOpacity={0.9}
            strokeStyle="solid"
          />
        ))}

      {reviewMarkers.length >= 2 &&
        routeSegments.map((segment, idx) => {
          // 경로의 라벨 번호: 항상 1부터 다시 시작
          const labelNumber = idx + 1;

          return (
            <CustomOverlayMap
              key={`route-label-${idx}`}
              position={segment.labelPosition}
              yAnchor={0.5}
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#ee5a6f] text-[10px] font-bold shadow">
                {labelNumber}
              </div>
            </CustomOverlayMap>
          );
        })}
    </>
  );
}

export default UserMarkerLayer