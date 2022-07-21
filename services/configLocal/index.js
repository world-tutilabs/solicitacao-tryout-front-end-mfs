import axios from "axios"

const httpLocal = axios.create({
  baseURL: "http://localhost:5000/api",                                    //Adicionar Base URL
  headers: {
    "Accept": "application/json",
    "Content": "application/json"
  }
})


httpLocal.interceptors.request.use(function (config) {
  // let token = sessionStorage.getItem("token");

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU4NDAyNDkxLCJleHAiOjE2NTg0MzEyOTEsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.uMQATKpTmM68oImVAVbw-tN-Miw55w_4qfbsBQxzPiI';




  if (!token) {
    token = "";
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
},
  (error) => {
    return Promise.reject(error)
  }
)



export { httpLocal }
