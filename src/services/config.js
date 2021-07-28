import axios from 'axios'
// http://localhost:8080/api
export const http = axios.create({
    baseURL: 'http://localhost:8080/api'
})
