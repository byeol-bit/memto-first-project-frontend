export async function fetchTopFiveRestaurants() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/restaurants/top?limit=5`)
  if (!response.ok) throw new Error("Top 5 Restaurants fetch failed!")

  const data = await response.json()
  return data
}