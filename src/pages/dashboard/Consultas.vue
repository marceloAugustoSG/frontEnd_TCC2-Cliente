<template>
  <v-container>
    <v-row>

      <v-col cols="12" md="4" sm="4" v-for="consulta in consultas " :key="consulta.id">
        <v-card>
          <v-card-title>{{ consulta.nome }}</v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-calendar-heart"></v-icon>
            {{ consulta.data }} às <v-icon icon="mdi-clock-outline"></v-icon> {{ consulta.hora }}
          </v-card-subtitle>
          <v-card-text>
            <p v-if="consulta.descricao.length > 30">
              {{ consulta.descricao.substring(0, 20) + "..." }}
            </p>
            <p v-else>
              {{ consulta.descricao }}
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn>Detalhes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>



    </v-row>

  </v-container>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({

  consultas: Array

})

const consultas = ref([

  {
    id: 1,
    nome: "Atendimento Odontológico",
    data: "12/08/2020",
    hora: "10:00",
    descricao: 'Extração do siso'
  },

  {
    id: 2,
    nome: "Atendimento Médico",
    data: "12/08/2020",
    descricao: 'checkup e exames de raio X........................................................sdsfs lodcsdksvdlksbdkvsbdlkbdklbsdljbvskdlvbdkvjsjkdvbslkfvbsdlkvskjkdfjlkdslfbvkdlfjbdlkfbvkjdfbvklfbjvjsdbfvkjdsbfvkjvkljfjfklvbdfklvdsklfdkjbf'

  },

  {
    id: 3,
    nome: "Atendimento Médico",
    data: "12/08/2020",
    descricao: 'Avaliação...'

  },
  {
    id: 4,
    nome: "Atendimento médico",
    data: "12/08/2020",
    descricao: 'Avaliação...'

  }, {
    id: 4,
    nome: "Atendimento médico",
    data: "12/08/2020",
    descricao: 'Avaliação...'

  }

])

</script>
<style scoped></style>
