import axios from "axios"

const httpSAP = axios.create({
  baseURL: "http://185.209.179.253:3000",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})



httpSAP.interceptors.request.use(function (config) {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU3OTA4Mjg5LCJleHAiOjE2NTc5MzcwODksInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.x7MS2yZX-YdebO4UxTQ5HqEUlVpdrZrmUU4ooFPzoA4';




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
