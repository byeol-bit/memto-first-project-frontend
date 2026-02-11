
import style from "./map.module.css"
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk'
import useKakaoLoader from '../../hooks/useKakaoLoader'
import { useState, useEffect, useContext, useMemo } from "react"
import { DetailStateContext } from "../layout/map-layout"

const DEFAULT_CENTER = { lat: 33.450701, lng: 126.570667 }
const MAP_LEVEL = 7 // 지도 확대 레벨 (항상 동일한 크기로 유지)

// 맵 인스턴스와 좌표를 받아 중심·줌을 설정하는 유틸 (컴포넌트 없이 사용)
const centerMapOnPosition = (map, position) => {
  if (!map || !position) return
  const { kakao } = window
  if (!kakao?.maps) return
  const latLng = new kakao.maps.LatLng(position.lat + 0.006, position.lng - 0.037)
  map.setCenter(latLng)
  map.setLevel(MAP_LEVEL)
}

const Map = () => {
  const { selectedRestaurant, setIsModalOpen } = useContext(DetailStateContext)
  const { loading, error } = useKakaoLoader()
  const [geocodedPosition, setGeocodedPosition] = useState(null)
  const [map, setMap] = useState(null)

  const center = useMemo(() => {
    if (selectedRestaurant?.location) {
      return {
        lat: selectedRestaurant.location.lat,
        lng: selectedRestaurant.location.lon,
      }
    }
    return DEFAULT_CENTER
  }, [selectedRestaurant])

  useEffect(() => {
    if (!selectedRestaurant) return

    // 이미 location 이 있으면 지오코딩할 필요 없음
    if (selectedRestaurant.location) return

    // location 이 없으면 address 로 좌표 조회
    if (!selectedRestaurant.address) return

    const { kakao } = window
    if (!kakao || !kakao.maps || !kakao.maps.services) {
      console.warn('카카오맵이 아직 로드되지 않았습니다.')
      return
    }

    const geocoder = new kakao.maps.services.Geocoder()

    geocoder.addressSearch(
      selectedRestaurant.address,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          const { y, x } = result[0] // y: 위도, x: 경도
          console.log('geocoder', y, x)
          setGeocodedPosition({
            lat: parseFloat(y),
            lng: parseFloat(x),
          })
        } else {
          console.warn('주소 → 좌표 변환 실패', status, result)
        }
      },
    )
  }, [selectedRestaurant])

  const position = useMemo(() => {
    if (!selectedRestaurant) {
      return null
    }

    if (selectedRestaurant.location) {
      return {
        lat: selectedRestaurant.location.lat,
        lng: selectedRestaurant.location.lon,
      }
    }

    return geocodedPosition
  }, [selectedRestaurant, geocodedPosition])

  // position이 바뀔 때마다 맵 중심·줌 고정 (유저/상세 리스트 오프셋 반영)
  useEffect(() => {
    centerMapOnPosition(map, position)
  }, [map, position])

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
        onCreate={setMap}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={MAP_LEVEL}
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