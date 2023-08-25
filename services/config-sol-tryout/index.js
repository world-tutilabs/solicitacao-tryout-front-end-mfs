import axios from "axios"
import Cookies from 'js-cookie'
const httpSolTryOut = axios.create({
  baseURL: `http://192.168.137.230:3000/api`, //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})

httpSolTryOut.interceptors.request.use(function (config) {
  const token = Cookies.get('auth._token.local')
  // const token = `${process.env.TOKEN_LOCAL}`
  if (!token) {
    token = "";
  }

  config.headers.Authorization = `${token}`;
  return config;
},
  (error) => {
    return Promise.reject(error)
  }
)



export { httpSolTryOut }
