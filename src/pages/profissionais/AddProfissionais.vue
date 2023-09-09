<template>
  <form @submit.prevent="salvar">
    <v-card class="pa-5">
      <v-text-field label="Nome" v-model="profissional.nome" required />
      <v-row>
        <v-col cols="6">
          <v-text-field label="Email"  />
        </v-col>
        <v-col>
          <v-select v-model="profissional.especialidade" :items="especialidades" label="Especialidade" required />
        </v-col>
      </v-row>
      <v-btn type="submit" text="Salvar" />
    </v-card>
  </form>
  <p>Criar profissional</p>
  <p>{{ profissional }}</p>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      //configuracao da tela
      especialidades: ["Medicina", "Psicologia", "Odontologia"],

      //dados

      profissional: {
        nome: "",
        especialidade: "",
      },

    };
  },
  methods: {
    ...mapActions(['criarProfissional']),
    async salvar() {
      try {
        await this.criarProfissional(this.profissional)
        alert("salvo com sucesso")
      } catch (error) {
        alert(error)

      }
    }
  },
};
</script>
