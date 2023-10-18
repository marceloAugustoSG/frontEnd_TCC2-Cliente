import axios from "axios";


const token = localStorage.getItem('token')
console.log(token)
export const http = axios.create({
    baseURL: "http://localhost:3005/",
    headers: {

        'Authorization': `Bearer ${JSON.parse(token)}`
    }
});
