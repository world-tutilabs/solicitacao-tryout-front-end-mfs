import axios from "axios"
import Cookies from 'js-cookie'
const httpLocal = axios.create({
  baseURL: "http://185.209.179.253:5000/api",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})


httpLocal.interceptors.request.use(function (config) {
  // let token = sessionStorage.getItem("token");
  const token = Cookies.get('auth._token.local')

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



export { httpLocal }
