import { createStore } from "vuex";
import apiUsuario from "@/services/apiUsuario"
import { http } from "@/services/axiosConfig";
const store = createStore({
  state: {
    user: {
      email: String,
      password: String
    },
    token: '',
    message: '',
    pacienteId: '',
    consultas: []

  },
  mutations: {

    setConsultas(state, consultas) {
      state.consultas = consultas

    },

    setPacienteId(state, novoIdPaciente) {
      state.pacienteId = novoIdPaciente
    },
    setUsuario(state, novoUsuario) {
      state.usuario = novoUsuario
    },
    setToken(state, newToken) {
      state.token = newToken
    },

    getMessage(state) {
      return state.message
    },
    setMessage(state, newMessage) {
      state.message = newMessage
    },

    dataUser(state, newUser) {
      state.user = newUser
    },

    addUsuario(state, novoUsuario) {
      state.usuario = novoUsuario
    }
  },
  getters: {

  },
  actions: {

    //agendamentos
    listarConsultasPaciente({ commit }) {
      const pacienteId = localStorage.getItem('pacienteId');
      if (!pacienteId) {
        console.error('ID do paciente não encontrado no localStorage.');
        return; // Sair da função
      }

      http.get(`paciente/${pacienteId}/consultas`)
        .then((resposta) => {
          // Verificar o código de status HTTP da resposta
          if (resposta.status === 200) {
            // Dados foram recebidos com sucesso
            commit('setConsultas', resposta.data.consultas.consultas);
          } else {
            // Tratar casos em que o servidor retornou um código de status de erro
            console.error(`Erro na resposta da API - Código de Status: ${resposta.status}`);
          }
        })
        .catch((e) => {
          // Tratar erros de rede ou outras exceções
          console.error('Erro na chamada da API:', e);
        });
    },

    async agendarConsulta({ commit }, novaConsulta) {
      await apiUsuario.agendarConsulta(novaConsulta).then((res) => {

        console.log(res)
      }).catch((e) => console.log(e))

    },
    async criarUsuario({ commit }, novoUsuario) {
      await apiUsuario.criarUsuario(novoUsuario).then((res) => {
        commit('addUsuario', res.data)
        console.log(res.data)
      }).catch((e) => {
        commit('setMessage', e.response.message)
        console.log(e.response.data.message)
      })
    },

    async logar({ commit }, usuario) {
      try {
        const dados = await apiUsuario.logar(usuario)
        const { token } = dados.data
        localStorage.setItem('token', JSON.stringify(token))
        const tokenLS = localStorage.getItem('token')
        commit('setToken', JSON.parse(tokenLS))
        localStorage.setItem('pacienteId', JSON.stringify(dados.data.usuario.Paciente.id))
        const idPaciente = localStorage.getItem('pacienteId')
        commit('setPacienteId', JSON.parse(idPaciente))
        console.log(`token do state: ${this.state.token}`)
        console.log(`idPaciente do state: ${this.state.pacienteId}`)
        console.log(dados.data)

      } catch (error) {
        console.log(error.response.data.message)

      }

    }
  }
})

export default store;
