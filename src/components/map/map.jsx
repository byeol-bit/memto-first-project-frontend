
import style from "./map.module.css"
import { Map as KakaoMap, MapMarker, Polyline } from 'react-kakao-maps-sdk'
import useKakaoLoader from '../../hooks/useKakaoLoader'
import { useState, useEffect, useContext, useMemo } from "react"
import { DetailStateContext } from "../layout/map-layout"
import { useUserReviews } from "../../hooks/queries/use-reviews-data"

const DEFAULT_CENTER = { lat: 33.450701, lng: 126.570667 }
const DEFAULT_ZOOM_LEVEL = 7
const RES_ZOOM_LEVEL = 7 // 지도 확대 레벨 (항상 동일한 크기로 유지)
const USER_ZOOM_LEVEL = 9 // 지도 확대 레벨 (항상 동일한 크기로 유지)

// 맵 인스턴스와 좌표를 받아 중심·줌을 설정 (맛집 단일 마커용)
const centerMapOnPosition = (map, position) => {
  if (!map || !position) return
  const { kakao } = window
  if (!kakao?.maps) return
  const latLng = new kakao.maps.LatLng(position.lat + 0.006, position.lng - 0.037)
  map.setCenter(latLng)
  map.setLevel(RES_ZOOM_LEVEL)
}

// 여러 마커가 모두 보이도록 지도 범위 재설정 (유저 방문 경로용)
const centerMapOnPositions = (map, positions) => {
  if (!map || !positions?.length) return
  const { kakao } = window
  if (!kakao?.maps) return
  const bounds = new kakao.maps.LatLngBounds()
  positions.forEach(({ lat, lng }) => {
    bounds.extend(new kakao.maps.LatLng(lat + 0.006, lng - 0.3))
  })
  map.setBounds(bounds)
  map.setLevel(USER_ZOOM_LEVEL)
}

const Map = () => {
  const {
    selectedUser,
    selectedRestaurant,
    setIsModalOpen
  } = useContext(DetailStateContext)
  const { loading, error } = useKakaoLoader()
  const [geocodedPosition, setGeocodedPosition] = useState(null)
  const [map, setMap] = useState(null)

  // 유저 관련
  const { data: reviews } = useUserReviews(selectedUser?.id)
  const [reviewPositions, setReviewPositions] = useState([])

  useEffect(() => {
    if (!reviews?.length) {
      setReviewPositions([])
      return
    }

    setReviewPositions([]) // 유저 변경 시 초기화

    const { kakao } = window
    if (!kakao?.maps?.services) return

    const geocoder = new kakao.maps.services.Geocoder()

    const sortedRiviews = [...reviews].sort(
      (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
    )

    sortedRiviews.forEach((review, idx) => {
      const r = review.restaurant
      if (!r) return

      if (r.latitude != null && r.longitude != null) {
        setReviewPositions(prev => ([
          ...prev,
          { lat: parseFloat(r.latitude), lng: parseFloat(r.longitude) }
        ]))
        return
      }

      if (!r.address) return

      geocoder.addressSearch(r.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          const { y, x } = result[0]
          setReviewPositions(prev => ([
            ...prev,
            { lat: parseFloat(y), lng: parseFloat(x) }
          ]))
        }
      })
    })
  }, [reviews])


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

  useEffect(() => {
    centerMapOnPositions(map, reviewPositions)
  }, [map, reviewPositions])

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
        level={DEFAULT_ZOOM_LEVEL}
      >
        {position && (
          <MapMarker
            position={position}
            onClick={onMarkerClick}
          />
        )}

        {reviewPositions.map((pos, idx) => (
          <MapMarker
            key={`review-marker-${idx}`}
            position={pos}
          // onClick 등 필요하면 추가
          />
        ))}
        {reviewPositions.length >= 2 && (
          <Polyline
            path={reviewPositions}
            strokeWeight={4}
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}
      </KakaoMap>
    </div>
  )
}

export default Map