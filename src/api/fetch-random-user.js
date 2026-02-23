export async function fetchRandomUsers() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`)
  if (!response.ok) throw new Error("Top 5 Restaurants fetch failed!")

  const data = await response.json()
  return data
}