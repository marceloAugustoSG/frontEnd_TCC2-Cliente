import { createStore } from "vuex";
import { http } from "@/services/axiosConfig";
const store = createStore({
  state: {
    ativarBtn: Boolean,
    user: {
      email: String,
      password: String
    },
    pacienteId: Number,
    message: '',
    paciente: {
      id: '',
      nome: '',
      tipo: '',
      matricula: '',
      telefone: '',
      dataNascimento: ''
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
      state.notificacoes = payload;
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
    // notificacoesPaciente: (state) => {
    //   const pacienteId = Number(localStorage.getItem('pacienteId'))
    //   if (pacienteId) {
    //     return state.notificacoes.filter(notificacao => notificacao.pacienteId === pacienteId);
    //   } else {
    //     return [];
    //   }
    // }
  },

  actions: {

    async editarPerfil({ commit }, paciente) {


      const pacienteId = Number(this.state.paciente.id)
      console.log(pacienteId)

      try {
        const resposta = await http.put(`paciente/${pacienteId}`, paciente)
        console.log(resposta.data)
      } catch (error) {
        console.log(error)
      }
    },

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

    // async listarNotificacoes({ commit }) {
    //   try {
    //     const resposta = await http.get('notificacoes');
    //     console.log(resposta.data)
    //     commit('setNotificacoes', resposta.data);

    //     console.log(this.state.notificacoes)
    //     commit('setMensagemNotificacao', resposta.data.message);
    //     console.log(resposta.data.message);
    //   } catch (error) {

    //     const mensagemErro = error.response ? error.response.data.message : 'Erro ao obter notificações.';
    //     commit('setMensagemNotificacao', mensagemErro);
    //   }
    // },
    IsMessage({ commit }, valor) {
      commit('setIsMessage', valor)
      console.log(this.state.isMessageSucesso)


    },
    async getPaciente({ commit }) {
      try {
        const UsuarioId = Number(localStorage.getItem('usuarioId'))
        const paciente = await http.get(`pacienteUsuario/${UsuarioId}`)
        console.log(paciente.data)
        localStorage.setItem('pacienteId', paciente.data.id)

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
        console.log(consultas.data.consultas);
        commit('setConsultas', consultas.data.consultas);
      } catch (error) {
        console.error(error);
      }
    },

    async listarNotificacoesPaciente({ commit }) {
      const pacienteId = Number(localStorage.getItem('pacienteId'));

      try {
        const notificacoes = await http.get(`/${pacienteId}/notificacoes`);
        commit('setNotificacoes', notificacoes.data.notificacoes)
        console.log(this.state.notificacoes)

      } catch (error) {

      }

    },

    async deletarNotificacaoPaciente({ commit }, idNotificacao) {
      const idNot = Number(idNotificacao);
      try {
        const notificacao = await http.delete(`/notificacao/${idNot}`);
        console.log(notificacao.data)
        // console.log(notificacao.status)

      } catch (error) {
        return;

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
        const resposta = await http.post('login', usuario)
        console.log(resposta.data)

        const tokenDecodificado = JSON.parse(atob(resposta.data.token.split('.')[1])); // Decodifica a parte do payload
        console.log(tokenDecodificado)
        localStorage.setItem('token', resposta.data.token)
        localStorage.setItem('usuarioId', tokenDecodificado.id)

      } catch (error) {
        // return error
        commit('setMessage', error.response.data.message)
        // console.log(this.state.message)
      }
    },

    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('pacienteId');
      localStorage.removeItem('usuarioId');
      localStorage.removeItem('message');
      localStorage.clear();
      commit('setNotificacoes', []);
      commit('setMessage', '');
      commit('setConsultas', []);  // Limpar consultas
      commit('setNotificacoes', []);  // Limpar notificacoes
      commit('setPaciente', {
        id: '',
        nome: '',
        tipo: '',
        matricula: '',
      });  // Limpar dados do paciente
    },

    init({ dispatch }) {
      dispatch('getPaciente').then(() => {
        dispatch('listarConsultasPaciente');
        // dispatch('listarNotificacoes');
      });
    }
  }
})

export default store;