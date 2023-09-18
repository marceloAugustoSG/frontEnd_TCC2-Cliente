import { createStore } from "vuex";

const store = createStore({
  state: {
    agendamentos: [
      // {
      //   id: 1,
      //   nome: "Atendimento Odontológico",
      //   data: "12/08/2020",
      //   hora: "10:00",
      //   descricao: 'Extração do siso'
      // },

      // {
      //   id: 2,
      //   nome: "Atendimento Médico",
      //   data: "12/08/2020",
      //   descricao: 'checkup e exames de raio X........................................................sdsfs lodcsdksvdlksbdkvsbdlkbdklbsdljbvskdlvbdkvjsjkdvbslkfvbsdlkvskjkdfjlkdslfbvkdlfjbdlkfbvkjdfbvklfbjvjsdbfvkjdsbfvkjvkljfjfklvbdfklvdsklfdkjbf'

      // },

      // {
      //   id: 3,
      //   nome: "Atendimento Médico",
      //   data: "12/08/2020",
      //   descricao: 'Avaliação...'

      // },
      // {
      //   id: 4,
      //   nome: "Atendimento médico",
      //   data: "12/08/2020",
      //   descricao: 'Avaliação...'

      // }, {
      //   id: 5,
      //   nome: "Atendimento médico",
      //   data: "12/08/2020",
      //   descricao: 'Avaliação...'

      // },
      // {
      //   id: 6,
      //   nome: "Atendimento Psicológico",
      //   data: "12/08/2023",
      //   hora: "12:00",
      //   descricao: 'Nenhuma descrição'
      // },
    ]

  },
  mutations: {

    //agendamentos
    addAgendamento(state, novoAgendamento) {
      state.agendamentos.push(novoAgendamento)
    }
  },
  getters: {
  },

  actions: {

    //agendamentos
    addAgendamento({ commit }, novoAgendamento) {
      commit('addAgendamento', novoAgendamento)
    }
  }
})

export default store;
