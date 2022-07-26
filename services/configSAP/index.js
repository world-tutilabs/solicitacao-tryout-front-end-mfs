import axios from "axios"
import Cookies from 'js-cookie'
const httpSAP = axios.create({
  baseURL: `${process.env.ROUTER_API_SAP}`,                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})

httpSAP.interceptors.request.use(function (config) {
 
     const token = Cookies.get('auth._token.local')
    // const token  = `${process.env.TOKEN_LOCAL}`

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
export { httpSAP }
