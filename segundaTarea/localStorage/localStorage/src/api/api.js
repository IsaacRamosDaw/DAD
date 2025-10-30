const API = "https://jsonplaceholder.typicode.com/users"

export async function getUsers(){
  const res = await fetch(API)
  if (!res.ok) throw new console.error("Error fetching api users");
  return res.json()
}