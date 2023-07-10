import axios from "axios"
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: `http://185.209.179.253:8400`,                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})

console.log({ cookiee: Cookies.get('auth._token.local') });

http.interceptors.request.use(function (config) {
  const token = Cookies.get('auth._token.local')
  // const token = `${process.env.TOKEN_LOCAL}`
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
