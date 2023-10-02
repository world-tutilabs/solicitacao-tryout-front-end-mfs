import axios from "axios"
import Cookies from 'js-cookie'

const httpRRIM = axios.create({
  baseURL: `http://172.21.3.192:3366`,                                           //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})


httpRRIM.interceptors.request.use(function (config) {
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


export { httpRRIM }
