import { http } from "./axiosConfig";
export default {
    criarUsuario: (data) => {
        return http.post("usuario", data)
    },
    getConsultasUsuario: () => {

        const idPaciente = localStorage.getItem('pacienteId')
        const pacienteId = JSON.parse(idPaciente)
        return http.get(`paciente/${pacienteId}/consultas`)

    },

    logar: (data) => {
        return http.post("login", data)
    },
    agendarConsulta: (data) => {
        const pacienteId = localStorage.getItem('pacienteId')
        return http.post(`paciente/${pacienteId}/consulta`, data)

        // return http.post("consulta", data)
    },

    listarConsultas: () => {
        return http.get('consultas')
    }

}