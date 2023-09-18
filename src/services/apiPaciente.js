import { http } from "../services/axiosConfig";
export default {
    criarUsuario: (data) => {
        return http.post("paciente", data)
    },
    listarConsultas: () => {
        return http.get(`consultas`);
    },
}