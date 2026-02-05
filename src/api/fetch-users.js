import { API_URL } from "../lib/constants"

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) throw new Error("Fetch Faliled")

  const data = await response.json()
  return data
}