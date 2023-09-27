import axios from "axios";


const token = localStorage.getItem('token')
export const http = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
    }
});
