import axios from "axios"
import Cookies from 'js-cookie'
const http = axios.create({
  baseURL: "http://185.209.179.253:8400",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})



http.interceptors.request.use(function (config) {

  console.log('teste config')
  const tokenTets = Cookies.get('auth._token.local')
  console.log(tokenTets)
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU4MzIxNzgyLCJleHAiOjE2NTgzNTA1ODIsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.ZZoUeTWhfkNUhW_7H-9bTrvbuoWjhbCLjdjOkStvz5M';
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
