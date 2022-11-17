import axios from 'axios'

const httpUserSystem = axios.create({
  baseURL: 'http://185.209.179.253:7900',
  headers: {
    Accept: 'application/json',
    Content: 'application/json'
  }
})

export { httpUserSystem }
