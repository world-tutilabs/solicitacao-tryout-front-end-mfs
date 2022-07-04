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
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU2OTM0MDYxLCJleHAiOjE2NTY5NjI4NjEsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.7m_xuAFd3f_6c0eIQvPj-afvkP47ahAp_prfvR1p31Q';

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


export {http}