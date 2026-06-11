import axios from "axios"

// URL base da API definida em .env (VITE_API_URL).
// Se não estiver definida, as requisições usam caminhos relativos
// e o proxy do Vite (vite.config.js) encaminha /api em desenvolvimento.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default api
