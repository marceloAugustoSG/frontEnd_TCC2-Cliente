<template>
  <v-container class="pa-1">
    <form @submit.prevent="agendar">
      <v-row>
        <v-col cols="12" xl="12" sm="8">
          <VueDatePicker required="true" placeholder="Data" locale="pt-BR" :enable-time-picker="false"
            v-model="consulta.data" :disabled-week-days="[6, 0]" />
        </v-col>

        <v-col cols="12" xl="12" sm="4">
          <VueDatePicker required v-model="consulta.hora" time-picker disable-time-range-validation placeholder="Horário"
            :min-time="{ hours: 8, minutes: 0 }" :max-time="{ hours: 17, minutes: 0 }"
            :start-time="{ hours: 9, minutes: 0 }" no-minutes-overlay />
        </v-col>

        <v-col cols="12" md="12">
          <v-select v-model="consulta.servico" label="Serviço" :items="[
            'Atendimento Odontologia',
            'Atendimento Médico',
            'Atendimento Psicológico',
          ]"></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea label="Observações" v-model="consulta.observacao" />
        </v-col>
      </v-row>
      <v-btn :loading="loading" block @click="agendar(consulta)" color="primary"
        :append-icon="showIcon ? 'mdi-check-circle' : ''">
        Agendar
      </v-btn>
    </form>
  </v-container>
  <!-- <p>{{ consulta.data }}</p>
  <p>{{ consulta.hora }}</p>
  <p>{{ consulta.servico }}</p>
  <p>{{ consulta.observacao }}</p> -->


  <p>{{ dataFormatada }}</p>
  <p>Consultas:</p>
  <ul>
    <li v-for="(consulta, index) in consultas" :key="index">
      {{ index }} - {{ dataFormatada }} - {{ consulta.hora.hours }} horas</li>
  </ul>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref, computed, reactive } from 'vue';

let loading = ref(false)
let showIcon = ref(false)
const consultas = reactive([])

const consulta = reactive({
  data: ref(''),
  hora: ref(''),
  servico: ref(''),
  observacao: ref('')
})

function clearConsulta() {
  consulta.data = ''
  consulta.hora = ''
  consulta.servico = ''
  consulta.observacao = ''
}


function agendar(consulta) {
  loading.value = true
  setTimeout(() => (loading.value = false), 1000)
  showIcon.value = !showIcon.value

  consultas.push({ ...consulta })
  // clearConsulta()
}

const dataFormatada = reactive(computed(() => {
  const data = new Date(consulta.data);
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;


}))
</script>
