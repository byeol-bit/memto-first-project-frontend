import { useContext, useEffect, useMemo, useState } from "react";
import { MapMarker, Polyline } from "react-kakao-maps-sdk";
import { DetailStateContext } from "../layout/map-layout";
import { useUserReviews } from "../../hooks/queries/use-reviews-data";
import { getCarDirection } from "../../api/kakao-directions";
import { centerMapOnPositions } from "./map-utils";
import MapInstanceContext from "./map-context";

const UserMarkerLayer = () => {
  const {
    selectedUser,
    setActiveTab,
    setSelectedRestaurant,
  } = useContext(DetailStateContext);
  const { map } = useContext(MapInstanceContext);

  const { data: reviews } = useUserReviews(selectedUser?.id);

  // 리뷰별 마커 위경도 결과
  const [reviewMarkers, setReviewMarkers] = useState([]);
  // Kakao Mobility API에서 받아온 도로 경로
  const [routePath, setRoutePath] = useState([]);

  useEffect(() => {
    if (!reviews?.length) {
      setReviewMarkers([]);
      return;
    }

    const { kakao } = window;
    if (!kakao?.maps?.services) return;

    const geocoder = new kakao.maps.services.Geocoder();
    const sortedReviews = [...reviews].sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at))

    const geocodePromises = sortedReviews.map((review) => {
      const r = review.restaurant;
      if (!r) return Promise.resolve(null);

      // 1-1) 이미 lat/lng가 있으면 바로 사용
      if (r.latitude != null && r.longitude != null) {
        return Promise.resolve({
          position: {
            lat: parseFloat(r.latitude),
            lng: parseFloat(r.longitude),
          },
          restaurant: r,
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

  // reviewMarkers → Kakao Mobility 경로 호출 → routePath
  useEffect(() => {
    if (!reviewMarkers?.length || reviewMarkers.length < 2) {
      setRoutePath([]);
      return;
    }

    let cancelled = false;
    const positions = reviewMarkers.map((m) => m.position);

    const fetchRoute = async () => {
      const allPath = [];

      for (let i = 0; i < positions.length - 1; i++) {
        if (cancelled) return;

        const segment = await getCarDirection(
          positions[i],
          positions[i + 1]
        );

        if (cancelled) return;

        if (segment.length === 0) {
          // API 실패 시: 직선 구간(도착점만 추가해 중복 방지)
          if (allPath.length === 0) allPath.push(positions[i]);
          allPath.push(positions[i + 1]);
        } else {
          // 앞 구간 끝점과 새 구간 시작점이 겹치지 않게 조정
          if (allPath.length > 0) allPath.pop();
          allPath.push(...segment);
        }
      }

      if (!cancelled) setRoutePath(allPath);
    };

    fetchRoute();

    return () => {
      cancelled = true;
    };
  }, [reviewMarkers]);

  const pathPositions = useMemo(
    () =>
      reviewMarkers?.length
        ? reviewMarkers.map((m) => m.position)
        : [],
    [reviewMarkers]
  );

  // 4) 마커/경로 기준으로 지도 중심 맞추기
  useEffect(() => {
    const listPanelWidth = document.getElementById("list-panel")?.offsetWidth ?? 100;
    const detailPanelWidth = document.getElementById("detail-panel")?.offsetWidth ?? 100;
    const offsetX = (detailPanelWidth + listPanelWidth) / 2 * -1; // 지도를 왼쪽으로 half만큼 밀기
    const offsetY = 10;

    centerMapOnPositions(map, pathPositions, { offsetX, offsetY });
  }, [map, pathPositions]);

  // 5) 마커 클릭 시: 해당 식당 상세로 전환
  const handleUserPathMarkerClick = (restaurant) => {
    setActiveTab?.("restaurants");
    setSelectedRestaurant?.(restaurant);
  };

  if (!reviewMarkers.length) return null;

  return (
    <>
      {reviewMarkers.map(({ position, restaurant }, idx) => (
        <MapMarker
          key={`review-marker-${idx}`}
          position={position}
          onClick={() => handleUserPathMarkerClick(restaurant)}
        />
      ))}

      {pathPositions.length >= 2 && (
        <Polyline
          path={routePath.length >= 2 ? routePath : pathPositions}
          strokeWeight={4}
          strokeColor="#FF0000"
          strokeOpacity={0.8}
          strokeStyle="solid"
        />
      )}
    </>
  );
}

export default UserMarkerLayer