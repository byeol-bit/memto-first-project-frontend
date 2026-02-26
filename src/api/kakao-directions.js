/**
 * Kakao Mobility Directions API (apis-navi.kakaomobility.com)
 * - 차량 경로 조회 후 좌표 배열로 반환
 * - ⚠️ 지도용 키(VITE_KAKAO_API_KEY)와 다름. 401 나오면 아래대로 발급 필요.
 * - 발급: https://developers.kakaomobility.com/ → 앱 등록 후 REST API 키 발급
 * - .env에 VITE_KAKAO_MOBILITY_REST_API_KEY=발급받은키 로 설정
 */

const DIRECTIONS_URL = 'https://apis-navi.kakaomobility.com/v1/directions'

/**
 * vertexes 배열 [lng, lat, lng, lat, ...] 를 { lat, lng }[] 로 변환
 */
function vertexesToPath(vertexes) {
  if (!Array.isArray(vertexes) || vertexes.length < 2) return []
  const path = []
  for (let i = 0; i < vertexes.length; i += 2) {
    const lng = vertexes[i]
    const lat = vertexes[i + 1]
    if (lat != null && lng != null) path.push({ lat, lng })
  }
  return path
}

/**
 * API 응답에서 경로 좌표 배열 추출
 * - 실제 응답 구조에 맞게 수정 가능 (routes[].sections[].roads[].vertexes)
 */
function parsePathFromResponse(data) {
  try {
    const routes = data?.routes
    if (!routes?.length) return []

    const allPath = []
    for (const route of routes) {
      const sections = route?.sections
      if (!sections?.length) continue
      for (const section of sections) {
        const roads = section?.roads
        if (!roads?.length) continue
        for (const road of roads) {
          const vertexes = road?.vertexes
          if (vertexes?.length) allPath.push(...vertexesToPath(vertexes))
        }
      }
    }
    return allPath
  } catch {
    return []
  }
}

/**
 * 출발지 → 목적지 차량 경로 조회
 * @param {{ lat: number, lng: number }} origin - 출발지
 * @param {{ lat: number, lng: number }} destination - 목적지
 * @returns {Promise<{ lat: number, lng: number }[]>} 경로 좌표 배열 (실패 시 빈 배열)
 */
export async function getCarDirection(origin, destination) {
  const apiKey = import.meta.env.VITE_KAKAO_MOBILITY_REST_API_KEY
  if (!apiKey) {
    console.warn(
      'VITE_KAKAO_MOBILITY_REST_API_KEY가 없습니다. 카카오 모빌리티(developers.kakaomobility.com)에서 REST API 키를 발급한 뒤 .env에 넣어주세요.'
    )
    return []
  }

  const originStr = `${origin.lng},${origin.lat}`
  const destinationStr = `${destination.lng},${destination.lat}`

  const queryParams = new URLSearchParams({
    origin: originStr,
    destination: destinationStr,
  })
  const requestUrl = `${DIRECTIONS_URL}?${queryParams}`

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        console.error(
          'Directions API 401: 카카오 모빌리티 전용 REST API 키가 필요합니다. developers.kakaomobility.com 에서 발급 후 .env에 VITE_KAKAO_MOBILITY_REST_API_KEY 로 설정하세요. (지도용 VITE_KAKAO_API_KEY 와 다릅니다.)'
        )
      }
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return parsePathFromResponse(data)
  } catch (error) {
    console.error('Kakao Directions API Error:', error)
    return []
  }
}
