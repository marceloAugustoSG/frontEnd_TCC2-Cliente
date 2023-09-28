import { createStore } from "vuex";
import apiUsuario from "@/services/apiUsuario"
import { http } from "@/services/axiosConfig";
import { useRouter } from "vue-router";
const store = createStore({
  state: {
    user: {
      email: String,
      password: String
    },
    message: '',
    pacienteId: '',
    isLogado: false,
    consultas: []
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
          // console.log(resposta.data.consultas.consultas)
          commit('setConsultas', resposta.data.consultas.consultas)

        }).catch((e) => console.log({ message: `${e}` }))

      } else {
        console.log('paciente id nao encontrado')
      }
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
      const router = useRouter()
      try {
        const dados = await apiUsuario.logar(usuario)
        const { token } = dados.data
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('pacienteId', JSON.stringify(dados.data.usuario.Paciente.id))
        commit('setIsLogado', true)
        console.log(`logado? : ${this.state.isLogado}`)
        this.dispatch('listarConsultasPaciente')
      } catch (error) {
        console.log(error.response.data.message)
        commit('setMessage', error.response.data.message)
        console.log(`mensagem do state: ${this.state.message}`)
        commit('setIsLogado', false)
        console.log(`logado? : ${this.state.isLogado}`)
      }
    },

    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('pacienteId')
    }
  }

})

export default store;
