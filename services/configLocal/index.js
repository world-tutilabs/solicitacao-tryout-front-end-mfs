import axios from "axios"
import Cookies from 'js-cookie'
const httpLocal = axios.create({
  baseURL: `${process.env.ROUTER_API_SOLICITATION_TRYOUT}`,                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})


httpLocal.interceptors.request.use(function (config) {
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
