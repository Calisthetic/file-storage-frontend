export function CheckForError(code:number) {
  switch (code) {
    case 400:
      throw new Error("Bad request")
    case 401:
      throw new Error("Unauthorized")
    case 403:
      throw new Error("Access denied")
    case 404:
      throw new Error("Not found")
    case 500:
      throw new Error("Server is not responding")
    case 504:
      throw new Error("Request timeout")
  } 
}