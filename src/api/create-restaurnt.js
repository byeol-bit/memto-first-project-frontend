export async function createRestaurant({
  name,
  address,
  phone_number,
  category,
  latitude,
  longitude,
  kakao_place_id
}) {

  // latitude, longitude를 숫자로 변환 (빈 문자열/undefined는 제외)
  const payload = {
    name,
    address,
    phone_number,
    category,
    kakao_place_id
  }

  if (latitude !== "" && latitude != null) {
    payload.latitude = parseFloat(latitude)
  }
  if (longitude !== "" && longitude != null) {
    payload.longitude = parseFloat(longitude)
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })
  if (!response.ok) throw new Error("Create Restaurant Failed")
  const data = await response.json()
  return data
}
