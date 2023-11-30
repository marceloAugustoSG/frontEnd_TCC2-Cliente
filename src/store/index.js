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
      id: '',
      nome: '',
      tipo: '',
      matricula: '',
    },
    consultas: [],
    respostas: String,
    isMessageSucesso: false,
    notificacoes: [],
    mensagemNotificacao: ''
  },
  mutations: {
    setMensagemNotificacao(state, payload) {
      state.mensagemNotificacao = payload
    },

    setNotificacoes(state, payload) {
      state.notificacoes = payload
    },

    setIsMessage(state, payload) {
      state.isMessageSucesso = payload

    },
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

  getters: {
    notificacoesPaciente: (state) => {
      const pacienteId = state.paciente.id;
      if (pacienteId) {
        return state.notificacoes.filter(notificacao => notificacao.pacienteId === pacienteId);
      } else {
        return [];
      }
    }

  },

  actions: {
    setMensagemNotificacao({ commit }, mensagem) {
      commit('setMensagemNotificacao', mensagem)
    },

    async excluirNotificacao({ commit }, id) {
      let notificacaoId = Number(id)
      try {
        const resposta = await http.delete(`notificacao/${notificacaoId}`)
        const data = await resposta.data
        console.log(data)
      } catch (error) {
        console.log(error)
      }


    },

    async listarNotificacoes({ commit }) {
      try {
        const resposta = await http.get('notificacoes');
        const data = resposta.data;
        commit('setNotificacoes', data);
        commit('setMensagemNotificacao', data.message);
        console.log(data.message);
      } catch (error) {
        console.error(error);
        // Se houver uma mensagem de erro no objeto error.response.data, use-a
        // Caso contrário, use uma mensagem padrão
        const mensagemErro = error.response ? error.response.data.message : 'Erro ao obter notificações.';
        commit('setMensagemNotificacao', mensagemErro);
      }
    },


    IsMessage({ commit }, valor) {
      commit('setIsMessage', valor)
      console.log(this.state.isMessageSucesso)


    },


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
      console.log('teste');
      const pacienteId = Number(localStorage.getItem('pacienteId'));

      try {
        const consultas = await http.get(`paciente/${pacienteId}/consultas`);
        console.log(consultas.data.consultas.consultas);
        commit('setConsultas', consultas.data.consultas.consultas);
      } catch (error) {
        console.error(error);
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
        commit('setMessage', '')

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
      commit('setNotificacoes', []);
      commit('setMessage', '');
      this.state.consultas = []
      this.state.paciente = {}
    },

    init({ commit, dispatch }) {
      dispatch('getPaciente')
      dispatch('listarConsultasPaciente')
      dispatch('listarNotificacoes')

    }
  }
})

export default store;