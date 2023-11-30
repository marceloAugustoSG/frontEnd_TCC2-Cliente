import axios from "axios";

// Crie uma instância do Axios sem um token inicial
export const http = axios.create({
    baseURL: "http://localhost:3005/"
});

// Adicione um interceptor para atualizar dinamicamente o cabeçalho de autorização
http.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    // Se o token existir, adicione-o ao cabeçalho de autorização
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});
