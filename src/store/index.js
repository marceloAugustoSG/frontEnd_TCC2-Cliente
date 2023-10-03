import { createStore } from "vuex";
import apiUsuario from "@/services/apiUsuario"
import { http } from "@/services/axiosConfig";
const store = createStore({
  state: {
    user: {
      email: String,
      password: String
    },
    message: '',
    pacienteId: '',
    isLogado: false,
    consultas: [],
  },
  mutations: {

    setConsultas(state, consultas) {
      state.consultas = consultas
    },
    setIsLogado(state, logado) {
      state.isLogado = logado
    },
    setPacienteId(state, novoIdPaciente) {
      state.pacienteId = novoIdPaciente
    },
    setToken(state, newToken) {
      state.token = newToken
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
    async listarConsultasPaciente({ commit }) {
      let pacienteId = localStorage.getItem('pacienteId');
      const token = localStorage.getItem('token')
      if (pacienteId) {
        await http.get(`paciente/${pacienteId}/consultas`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(token)}`
          }
        },
        ).then((resposta) => {
          commit('setConsultas', resposta.data.consultas.consultas)
          console.log(resposta.data.consultas.consultas)
        }).catch((e) => {
          console.log(e)
        })
      }
    },

    async agendarConsulta({ commit }, novaConsulta) {
      await apiUsuario.agendarConsulta(novaConsulta).then((res) => {
        console.log(res)
      }).catch((e) => console.log(e))
    },

    async criarUsuario({ commit }, novoUsuario) {
      await http.post("usuario", novoUsuario).then((res) => {
        console.log(res)
        commit('setMessage', res.data.message)
      }).catch((e) => {
        commit('setMessage', e.response.data.message)

      })
    },
    async logar({ commit }, usuario) {
      try {
        const dados = await apiUsuario.logar(usuario)
        const { token } = dados.data
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('pacienteId', JSON.stringify(dados.data.usuario.Paciente.id))
        commit('setIsLogado', true)
        if (this.state.isLogado) {
          this.dispatch('listarConsultasPaciente')
        }
      } catch (error) {
        console.log(error.response.data.message)
        localStorage.setItem('message', JSON.stringify(error.response.data.message))
        return;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('pacienteId')
      localStorage.removeItem('message')
      this.state.message = ''
      this.state.consultas = []
    }
  }
})

export default store;
