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
  //  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU4ODQxMDE2LCJleHAiOjE2NTg4Njk4MTYsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.SwX5CUpoZII21mmPuN1uN25GEEN_NoZVRblVHaIY8CE"
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
