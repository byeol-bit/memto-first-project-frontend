
import style from "./map.module.css"
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk'
import useKakaoLoader from '../hooks/useKakaoLoader'
import { useContext, useMemo } from "react"
import { DetailStateContext } from "./map-layout"

const DEFAULT_CENTER = { lat: 33.450701, lng: 126.570667 }

const Map = () => {
  const { selectedRestaurant, setIsModalOpen } = useContext(DetailStateContext)
  const { loading, error } = useKakaoLoader()

  const center = useMemo(() => {
    if (selectedRestaurant?.location) {
      return {
        lat: selectedRestaurant.location.lat,
        lng: selectedRestaurant.location.lon,
      }
    }
    return DEFAULT_CENTER
  }, [selectedRestaurant])
  const position = useMemo(() => {
    if (selectedRestaurant?.location) {
      return {
        lat: selectedRestaurant.location.lat,
        lng: selectedRestaurant.location.lon,
      }
    }
  }, [selectedRestaurant])

  if (loading) {
    return <div className={style.mapContainer}>지도를 불러오는 중...</div>
  }

  if (error) {
    return <div className={style.mapContainer}>지도를 불러오는 중 오류가 발생했습니다: {error.message}</div>
  }
  const onMarkerClick = () => {
    setIsModalOpen(true)
  }

  return (
    <div className={style.mapContainer}>
      <KakaoMap
        id="map"
        center={center}
        isPanto={true}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
      >
        {position && (
          <MapMarker
            position={position}
            onClick={onMarkerClick}
          />
        )}
      </KakaoMap>
    </div>
  )
}

export default Map