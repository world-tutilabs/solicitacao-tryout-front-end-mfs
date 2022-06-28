import axios from "axios"

const http = axios.create({
    baseURL: "",                                    //Adicionar Base URL
    headers: {
        "Accept": "application/json",
        "Content": "application/json"
      }
})
export {http}