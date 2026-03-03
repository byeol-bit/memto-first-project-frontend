import { useContext, useEffect, useState, useMemo } from "react"
import MapInstanceContext from "./map-context"
import { DetailStateContext } from "../layout/map-layout";
import { centerMapOnPosition } from "./map-utils";
import { MapMarker } from "react-kakao-maps-sdk";

const RestaurantMarkerLayer = () => {
  const {
    selectedRestaurant,
    setActiveTab,
    setSelectedRestaurant
  } = useContext(DetailStateContext);
  const { map } = useContext(MapInstanceContext);

  const [geocodedPosition, setGeocodedPosition] = useState(null);
  // selectedRestaurant 기준 좌표 계산 (location 우선, 없으면 geocodedPosition)
  const position = useMemo(() => {
    if (!selectedRestaurant) return null;

    if (selectedRestaurant.location) {
      return {
        lat: selectedRestaurant.location.lat,
        lng: selectedRestaurant.location.lon
      }
    }

    return geocodedPosition;
  }, [selectedRestaurant, geocodedPosition]);

  // 주소 → 좌표 지오코딩 (location이 없고 address가 있을 때만)
  useEffect(() => {
    if (!selectedRestaurant) return;

    if (selectedRestaurant.location) return;
    if (!selectedRestaurant.address) return;

    const { kakao } = window;
    if (!kakao || !kakao.maps || !kakao.maps.services) {
      console.warn("카카오맵이 아직 로드되지 않았습니다.");
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      selectedRestaurant.address,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          const { y, x } = result[0]; // y: 위도, x: 경도
          setGeocodedPosition({
            lat: parseFloat(y),
            lng: parseFloat(x),
          });
        } else {
          console.warn("주소 → 좌표 변환 실패", status, result);
        }
      }
    );
  }, [selectedRestaurant]);

  // position 변경 시 지도 중심/줌 이동
  useEffect(() => {
    if (!map || !position) return;
    const listPanelWidth = document.getElementById("list-panel")?.offsetWidth ?? 100;
    const detailPanelWidth = document.getElementById("detail-panel")?.offsetWidth ?? 100;
    const offsetX = (detailPanelWidth + listPanelWidth) / 2 * -1; // 지도를 왼쪽으로 half만큼 밀기
    const offsetY = 10;

    centerMapOnPosition(map, position, { offsetX, offsetY });
  }, [map, position]);

  const handleRestaurantMarkerClick = () => {
    if (!selectedRestaurant) return;
  }

  if (!position) return null;

  return (
    <MapMarker
      position={position}
      onClick={handleRestaurantMarkerClick}
    />
  )

}

export default RestaurantMarkerLayer;