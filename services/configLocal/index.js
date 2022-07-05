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
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiI1MDU0IiwiaWF0IjoxNjU3MDMzMzE1LCJleHAiOjE2NTcwNjIxMTUsInN1YiI6ImEzMDZmYTVmLTJmZmItNDMwNi05YmY2LWExNzg1YTY3OThjZiJ9.mjNqk8Y7QngKPH0ZJcKrzBau0Snw9P30LsLDRQcocz4';

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



export {httpLocal}