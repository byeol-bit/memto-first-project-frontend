import { API_URL } from "../lib/constants"

export async function fetchRestaurants() {
  const response = await fetch(`${API_URL}/restaurants`)
  if (!response.ok) throw new Error("Fetch Faliled")

  const data = await response.json()
  return data
}