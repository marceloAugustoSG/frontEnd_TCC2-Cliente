import apiPacientes from "@/services/apiPacientes";
import apiProfissionais from "@/services/apiProfissionais";
import { createStore } from "vuex";

const store = createStore({
  state: {
    profissionais: [],
    pacientes: [],
    selecionados: [],
  },
  mutations: {
    getProfissionais(state, payload) {
      state.profissionais = payload;
    },

    getPacientes(state, payload) {
      state.pacientes = payload;
    },

    createProfissional(state, payload) {
      state.profissionais.push(payload);
    },

    setSelecionados(state, selecionados) {
      state.selecionados = selecionados;
    },
  },

  actions: {
    async getAllProfissionais({ commit }) {
      await apiProfissionais
        .listar()
        .then((res) => {
          commit("getProfissionais", res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async criarProfissional({ commit }, profissional) {
      await apiProfissionais
        .criar(profissional)
        .then((res) => {
          commit("createProfissional", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getAllPacientes({ commit }) {
      await apiPacientes
        .listar()
        .then((res) => {
          commit("getPacientes", res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});

export default store;
