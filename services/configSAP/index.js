import axios from "axios"

const httpSAP = axios.create({
  baseURL: "http://185.209.179.253:3000",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})



httpSAP.interceptors.request.use(function (config) {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU3ODMwNzcwLCJleHAiOjE2NTc4NTk1NzAsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.rMFeAKBXWlkL_x-26JVCXJZuHFU1YROXHmSqf-GH3MA';




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
