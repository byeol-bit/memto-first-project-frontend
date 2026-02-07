import { Map as KakaoMap, MapMarker } from "react-kakao-maps-sdk";

const MiniMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  const center = {
    lat: Number(latitude),
    lng: Number(longitude),
  };

  if (Number.isNaN(center.lat) || Number.isNaN(center.lng)) return null;

  return (
    <KakaoMap
      center={center}
      level={3}
      style={{
        width: "100%",
        height: "100%",
      }}
      draggable={false}
      zoomable={false}
    >
      <MapMarker position={center} />
    </KakaoMap>
  );
};

export default MiniMap;
