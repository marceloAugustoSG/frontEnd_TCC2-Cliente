import { http } from "./axiosConfig";
export default {
    criarUsuario: (data) => {
        return http.post("usuario", data)
    },
    // listarConsultas: () => {
    //     return http.get(`consultas`);
    // },
}