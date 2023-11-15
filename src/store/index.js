import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
const store = createStore({
  state: {
    user: {
      email: String,
      password: String
    },
    message: '',
    paciente: {
      nome: String,
      tipo: String,
      matricula: String,
    },
    pacienteId: '',
    isLogado: false,
    consultas: [],
  },
  mutations: {
    setPaciente(state, payload) {
      state.paciente = payload
    },

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
    },
    setPaciente(state, payload) {
      state.paciente = payload
    }
  },

  getters: {},

  actions: {
    //agendamentos
    async listarConsultasPaciente({ commit }) {
      console.log('teste')

      const pacienteId = Number(localStorage.getItem('pacienteId'))
      try {
        const consultas = await http.get(`paciente/${pacienteId}/consultas`)
        console.log(consultas.data.consultas)
        commit('setPaciente', consultas.data.consultas)
        const resposta = await consultas.data.consultas.consultas
        console.log(resposta)
        commit('setConsultas', resposta)
      } catch (error) {
        console.log(error)
        return
      }
    },
    async agendarConsulta({ commit }, novaConsulta) {
      try {
        const consulta = await http.post('consulta', novaConsulta)
        const resposta = await consulta.data
        console.log(resposta)
      } catch (error) {
        console.log(error)
      }

    },

    async criarUsuario({ commit }, novoUsuario) {
      await http.post('usuario', novoUsuario).then((res) => {
        console.log(res)
        commit('setMessage', res.data.message)
      }).catch((e) => {
        commit('setMessage', e.response.data.message)

      })
    },
    clearMessage({ commit }) {
      localStorage.removeItem("message");

    },
    clearLocalStorage({ commit }) {
      localStorage.clear()

    },

    async logar({ commit }, usuario) {
      try {
        const dados = await http.post('login', usuario)
        const resposta = await dados.data
        commit('setPaciente', resposta.usuario.paciente)
        console.log(this.state.paciente.nome)
        this.state.message = ''
        const { token } = dados.data
        console.log(resposta)
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('pacienteId', JSON.stringify(dados.data.usuario.paciente.id))
        commit('setIsLogado', true)
        if (this.state.isLogado) {
          this.dispatch('listarConsultasPaciente')
        }
      } catch (error) {
        return;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('pacienteId')
      localStorage.removeItem('message')
      this.state.message = ''
      this.state.consultas = []
    },

    init({ commit }) {

      localStorage.removeItem('token')
      localStorage.removeItem('pacienteId')
      localStorage.removeItem('message')
      this.state.message = ''
      this.state.consultas = []
    }
  }
})

export default store;