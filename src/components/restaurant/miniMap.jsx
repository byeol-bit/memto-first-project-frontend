import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";

const MiniMap = ({ latitude, longitude }) => {
  const { loading, error } = useKakaoLoader();

  if (loading)
    return (
      <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center">
        지도를 불러오는 중...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-[300px] bg-red-50 flex items-center justify-center">
        지도 에러: {error.message}
      </div>
    );

  return (
    <Map
      center={{ lat: latitude, lng: longitude }} // 지도의 중심 좌표
      style={{ width: "100%", height: "300px" }} // 지도 크기 (높이는 조절 가능)
      level={3} // 확대 레벨 (숫자가 작을수록 확대)
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default MiniMap;
