import axios from "axios"
import Cookies from 'js-cookie'
const http = axios.create({
  baseURL: `${process.env.ROUTER_API_RRIM}`,                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})

http.interceptors.request.use(function (config) {
   const token = Cookies.get('auth._token.local')
  if (!token) {
    token = "";
  }
  config.headers.Authorization = `${token}`;
  return config;
},
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)


export { http }
