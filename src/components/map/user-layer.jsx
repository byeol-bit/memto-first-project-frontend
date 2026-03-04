import { useContext, useEffect, useMemo, useState } from "react";
import { Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";
import { DetailStateContext } from "../layout/map-layout";
import { useUserReviews } from "../../hooks/queries/use-reviews-data";
import { useRestaurantThumbnails } from "../../hooks/queries/use-restaurants-data";
import { getCarDirection } from "../../api/kakao-directions";
import { centerMapOnPositions, getRestaurantThumbnail } from "./map-utils";
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

  // 리뷰별 마커 위경도 결과
  const [reviewMarkers, setReviewMarkers] = useState([]);
  // Kakao Mobility API에서 받아온 도로 경로 세그먼트 (1→2, 2→3 ...)
  const [routeSegments, setRouteSegments] = useState([]);

  // 1) reviews에서 restaurantId 배열 뽑기
  const restaurantIds = (reviews ?? []).map((r) => r?.restaurant_id)

  // 2) 한 번에 썸네일 맵 가져오기
  const {
    data: thumbnailMap = {},
    isLoading: isThumbLoading,
  } = useRestaurantThumbnails(restaurantIds);

  useEffect(() => {
    if (!reviews) return;

    const { kakao } = window;
    if (!kakao?.maps?.services) return;

    const geocoder = new kakao.maps.services.Geocoder();
    const sortedReviews = [...reviews].sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))

    const geocodePromises = sortedReviews.map((review) => {
      const r = review.restaurant;
      if (!r) return Promise.resolve(null);

      const thumbFromMap = thumbnailMap[review.restaurant_id] ?? null;

      // 1-1) 이미 lat/lng가 있으면 바로 사용
      if (r.latitude != null && r.longitude != null) {
        return Promise.resolve({
          position: {
            lat: parseFloat(r.latitude),
            lng: parseFloat(r.longitude),
          },
          restaurant: r,
          thumbnail: thumbFromMap,
        })
      }

      // 1-2) 주소도 없으면 스킵
      if (!r.address) return Promise.resolve(null);

      // 1-3) 주소 -> 좌표 변환
      return new Promise((resolve) => {
        geocoder.addressSearch(r.address, (result, status) => {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            const { x, y } = result[0];
            resolve({
              position: { lat: parseFloat(y), lng: parseFloat(x) },
              restaurant: r,
              thumbnail: thumbFromMap,
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
      setReviewMarkers(markers.filter(Boolean));
    });

    return () => {
      cancelled = true;
    };
  }, [reviews])

  // 동일한 가게(restaurant)로의 여러 리뷰는 하나의 마커로만 사용
  const uniqueMarkers = useMemo(() => {
    if (!reviewMarkers?.length) return [];

    const result = [];
    for (const marker of reviewMarkers) {
      const last = result[result.length - 1];
      const lastRestaurantId = last?.restaurant?.id ?? last?.restaurant?.restaurant_id;
      const currentRestaurantId =
        marker.restaurant?.id ?? marker.restaurant?.restaurant_id;

      // 바로 이전 스텝과 같은 가게이면 스킵 (좌표가 같다고 가정)
      if (last && lastRestaurantId && currentRestaurantId && lastRestaurantId === currentRestaurantId) {
        continue;
      }

      result.push(marker);
    }

    return result;
  }, [reviewMarkers]);

  // uniqueMarkers → Kakao Mobility 경로 호출 → 경로 세그먼트 계산
  useEffect(() => {
    if (!uniqueMarkers?.length || uniqueMarkers.length < 2) {
      return;
    }

    let cancelled = false;
    const positions = uniqueMarkers.map((m) => m.position);

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
  }, [uniqueMarkers]);

  const limitedMarkers = useMemo(() => uniqueMarkers, [uniqueMarkers]);

  const pathPositions = useMemo(
    () => (limitedMarkers.length ? limitedMarkers.map((m) => m.position) : []),
    [limitedMarkers]
  );

  // 4) 마커/경로 기준으로 지도 중심 맞추기
  useEffect(() => {
    const listPanelWidth = document.getElementById("list-panel")?.offsetWidth ?? 100;
    const detailPanelWidth = document.getElementById("detail-panel")?.offsetWidth ?? 100;
    const offsetX = (detailPanelWidth + listPanelWidth) / 2 * -1; // 지도를 왼쪽으로 half만큼 밀기
    const offsetY = 10;

    centerMapOnPositions(map, pathPositions, { offsetX, offsetY });
  }, [map, pathPositions, uniqueMarkers]);

  // 5) 마커 클릭 시: 해당 식당 상세로 전환
  const handleUserPathMarkerClick = (restaurant) => {
    setActiveTab?.("restaurants");
    setSelectedRestaurant?.(restaurant);
  };

  // 유저가 선택되지 않았거나, 맛집이 선택된 상태라면 아예 아무 것도 렌더하지 않음
  if (!selectedUser || selectedRestaurant) return null;

  // 유저가 선택되지 않았거나, 맛집이 선택된 상태라면 아예 아무 것도 렌더하지 않음
  if (!selectedUser || selectedRestaurant) return null;

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
      {limitedMarkers.map(({ position, restaurant, thumbnail }, idx) => (
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
            {/* 상단 번호 배지 (이미지 위에 작게) */}
            <span className="relative z-10 self-start px-1.5 text-red-400 font-bold">
              {idx + 1}
            </span>
          </button>
        </CustomOverlayMap>
      ))}

      {/* 경로 세그먼트: 1→2, 2→3 ... 회색 테두리 + 색 선 */}
      {routeSegments.map((segment, idx) => (
        <Polyline
          key={`route-segment-bg-${idx}`}
          path={segment.path}
          strokeWeight={6} // 색 선보다 살짝 두껍게
          strokeColor="#9ca3af" // gray-400
          strokeOpacity={0.7}
          strokeStyle="solid"
        />
      ))}

      {routeSegments.map((segment, idx) => (
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

      {/* 경로 중간 라벨: 1번→2번 경로에는 1, 2번→3번 경로에는 2 ... */}
      {routeSegments.map((segment, idx) => {
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