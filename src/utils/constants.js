// production
// export const BASE_URL = "/api"

//dev mode 
export const BASE_URL = location.hostname == "localhost" ? "http://localhost:7777" : "/api"

