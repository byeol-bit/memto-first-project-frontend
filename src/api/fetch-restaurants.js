export async function fetchRestaurants() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/restaurants`)
  if (!response.ok) throw new Error("Fetch Faliled")

  const data = await response.json()
  return data
}