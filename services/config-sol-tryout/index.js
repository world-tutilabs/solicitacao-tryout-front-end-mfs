import axios from "axios";
import Cookies from "js-cookie";

// servidor
const httpSolTryOut = axios.create({
  baseURL: `http://185.209.179.253:5000/api`, //Adicionar Base URL
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

// local
// const httpSolTryOut = axios.create({
//   baseURL: `http://172.21.3.192:3000/api`,     //Adicionar Base URL
//   headers: {
//     "Accept": "application/json",
//     "Content": "application/json"
//   }
// })

httpSolTryOut.interceptors.request.use(
  function (config) {
    const token = Cookies.get("auth._token.local");
    // const token = `${process.env.TOKEN_LOCAL}`
    if (!token) {
      token = "";
    }

    config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpSolTryOut };
