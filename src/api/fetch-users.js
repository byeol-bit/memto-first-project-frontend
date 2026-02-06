export async function fetchUsers() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`)
  if (!response.ok) throw new Error("Fetch Faliled")

  const data = await response.json()
  return data
}