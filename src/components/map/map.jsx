import { Map as KakaoMap, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import useKakaoLoader from '../../hooks/useKakaoLoader'
import { useState, useEffect, useContext, useMemo } from "react"
import MapInstanceContext from "./map-context"
import { DEFAULT_CENTER, RES_ZOOM_LEVEL, USER_ZOOM_LEVEL } from "./map-constants"
import RestaurantMarkerLayer from "./restaurnat-layer"
import UserMarkerLayer from "./user-layer";

const DEFAULT_ZOOM_LEVEL = 7

const Map = () => {
  const { loading, error } = useKakaoLoader()
  const [map, setMap] = useState(null)


  if (loading) {
    return <div className="w-full h-full">지도를 불러오는 중...</div>
  }

  if (error) {
    return <div className="w-full h-full">지도를 불러오는 중 오류가 발생했습니다: {error.message}</div>
  }


  return (
    <MapInstanceContext.Provider value={{ map }}>
      <div className="w-full h-full">
        <KakaoMap
          id="map"
          center={DEFAULT_CENTER}
          isPanto={true}
          onCreate={setMap}
          style={{ width: "100%", height: "100%", }}
          level={DEFAULT_ZOOM_LEVEL}
        >
          <RestaurantMarkerLayer />
          <UserMarkerLayer />
        </KakaoMap>
      </div>
    </MapInstanceContext.Provider>
  )
}

export default Map