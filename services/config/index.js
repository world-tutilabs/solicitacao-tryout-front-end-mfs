import axios from "axios"

const http = axios.create({
  baseURL: "http://185.209.179.253:8400",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})


http.interceptors.request.use(function (config) {
  // let token = sessionStorage.getItem("token");

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU3NjU1MTQxLCJleHAiOjE2NTc2ODM5NDEsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.sestg2RFIwe5pw1YxvVuIaaj__6Ybf7JT6LXBx6OPPE';



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


export { http }
