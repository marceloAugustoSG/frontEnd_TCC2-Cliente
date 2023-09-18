import { http } from "../services/axiosConfig";
export default {
    criarConsulta: (data) => {
        return http.post("consulta", data)
    },
    listarConsultas: () => {
        return http.get(`consultas`);
    },
}