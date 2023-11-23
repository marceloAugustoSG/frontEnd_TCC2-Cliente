import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
const store = createStore({
  state: {
    ativarBtn: Boolean,
    user: {
      email: String,
      password: String
    },
    message: '',
    paciente: {
      nome: '',
      tipo: '',
      matricula: '',
    },
    consultas: [],
    respostas: String,
  },
  mutations: {
    setPaciente(state, payload) {
      state.paciente = payload
    },
    setAtivarBtn(state, payload) {
      state.ativarBtn = payload
    },

    setRespostas(state, payload) {
      state.respostas = payload
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
    async getPaciente({ commit }) {
      try {
        const pacienteId = Number(localStorage.getItem('pacienteId'))
        const paciente = await http.get(`paciente/${pacienteId}`)
        console.log(paciente.data)
        
        commit('setPaciente', paciente.data)
        console.log(this.state.paciente)
      } catch (error) {
        console.error(error)
      }
    },


    setAtivarBtn({ commit }, valor) {
      commit('setAtivarBtn', valor)
    },
    setRespostas({ commit }, respostas) {

      commit('setRespostas', respostas)

      console.log(respostas)

    },


    //agendamentos
    async listarConsultasPaciente({ commit }) {
      console.log('teste')
      const pacienteId = Number(localStorage.getItem('pacienteId'))
      try {
        const consultas = await http.get(`paciente/${pacienteId}/consultas`)

        console.log(consultas.data)
        commit('setPaciente', consultas.data.consultas)
        const resposta = await consultas.data.consultas.consultas
        console.log(resposta)
        commit('setConsultas', resposta)
      } catch (error) {
        console.error(error)
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
      await http.post('usuarioPaciente', novoUsuario).then((res) => {
        console.log(res.data)
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
        console.log(resposta)
        console.log(resposta.usuario.paciente)
        localStorage.setItem('token', resposta.token)
        localStorage.setItem('usuarioId', resposta.usuario.id)
        localStorage.setItem('pacienteId', resposta.usuario.paciente.id)
        // this.dispatch('listarConsultasPaciente')
      } catch (error) {
        console.error(error)
        commit('setMessage', error.response.data.message)
        console.log(this.state.message)
      }



    },

    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('pacienteId')
      localStorage.removeItem('message')
      localStorage.clear()
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