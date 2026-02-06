export async function createUser({
  nickname,
  password,
  introduction,
  category
}
) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      password,
      introduction,
      category
    })
  })
  if (!response.ok) throw new Error("Create User Failed")

  const data = await response.json()
  return data
}