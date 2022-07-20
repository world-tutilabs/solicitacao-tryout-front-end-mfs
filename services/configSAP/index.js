import axios from "axios"
import Cookies from 'js-cookie'
const httpSAP = axios.create({
  baseURL: "http://185.209.179.253:3000",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})



httpSAP.interceptors.request.use(function (config) {
  console.log('teste sap')
  const token = Cookies.get('auth._token.local')
  if (!token) {
    token = "";
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
},
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)


export { httpSAP }
