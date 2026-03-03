import { RES_ZOOM_LEVEL, USER_ZOOM_LEVEL } from "./map-constants";

// 단일 마커일때 중심 설정
export const centerMapOnPosition = (map, position, { offsetX = 0, offsetY = 0 } = {}) => {
  if (!map || !position) return;

  const { kakao } = window;
  if (!kakao?.maps) return;

  const latLng = new kakao.maps.LatLng(position.lat, position.lng);

  map.setCenter(latLng);

  map.setLevel(RES_ZOOM_LEVEL);

  // 2) 그 다음에, 픽셀 단위로 살짝 이동시킨다.
  //    (offsetX: 오른쪽 양수, 왼쪽 음수 / offsetY: 아래 양수, 위쪽 음수)
  if (offsetX !== 0 || offsetY !== 0) {
    map.panBy(offsetX, offsetY);
  }
}

// 다중 마커일 때 중심 설정
export const centerMapOnPositions = (map, positions, { offsetX = 0, offsetY = 0 } = {}) => {
  if (!map || !positions?.length) return;

  const { kakao } = window;
  if (!kakao?.maps) return;

  const bounds = new kakao.maps.LatLngBounds();

  positions.forEach(({ lat, lng }) => {
    // 기존 offset 로직 유지
    bounds.extend(new kakao.maps.LatLng(lat, lng));
  });

  map.setBounds(bounds);

  // map.setLevel(USER_ZOOM_LEVEL);

  // 2) 그 다음에, 픽셀 단위로 살짝 이동시킨다.
  //    (offsetX: 오른쪽 양수, 왼쪽 음수 / offsetY: 아래 양수, 위쪽 음수)
  if (offsetX !== 0 || offsetY !== 0) {
    map.panBy(offsetX, offsetY);
  }
}