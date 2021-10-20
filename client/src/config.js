import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://lamasocial.herokuapp.com/api/"
})