<template>
  <v-container class="pa-1">
    <v-card class="pa-5" elevation="10">
      <form @submit.prevent="submit">
        <v-row>
          <v-col>
            <v-text-field label="Seu nome" v-model="teste" disabled="" />
          </v-col>
          <v-col cols="12" md="12">
            <v-select v-model="servico" label="Serviço" :items="[
              'Atendimento Odontológico',
              'Atendimento Médico',
              'Atendimento Psicológico',
            ]" required />
          </v-col>
          <v-col cols="12" md="12">
            <v-textarea label="Observações" v-model="observacao" />
          </v-col>
        </v-row>
        <v-btn type="submit" :loading="loading" block color="primary" :append-icon="showIcon ? 'mdi-check-circle' : ''"
          text="Solicitar Consulta" />
      </form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from "vuex";

let loading = ref(false)
let showIcon = ref(false)
let sucesso = ref(false)
const store = useStore()
const servico = ref('')
const observacao = ref('')

function clearCamposConsulta() {

  servico.value = ''
  observacao.value = ''
}

async function submit() {

  console.log('teste')
  loading.value = true
  sucesso.value = true
  setTimeout(() => {
    loading.value = false
    sucesso.value = false
  }, 1000)
  const novoAgendamento = {
    status: "Agendada",
    observacao: (!observacao.value ? 'Nenhuma observação' : observacao.value),
    servico: servico.value
  }
  await store.dispatch('agendarConsulta', novoAgendamento)
  sucesso.value = true
  showIcon.value = !showIcon.value
  clearCamposConsulta()
  store.dispatch('listarConsultasPaciente')
}

// const dataFormatada = reactive(computed(() => {
//   const dataF = new Date(data.value);
//   const dia = String(dataF.getDate()).padStart(2, "0");
//   const mes = String(dataF.getMonth() + 1).padStart(2, "0");
//   const ano = dataF.getFullYear();
//   const horaFormat = hora.value.hours <= 9 ? `0${hora.value.hours}` : hora.value.hours
//   const minutesFormat = hora.value.minutes <= 9 ? `0${hora.value.minutes}` : hora.value.minutes
//   return `${ano}-${mes}-${dia}T${horaFormat}:${minutesFormat}:00.000Z`;
// }))



</script>
<style scoped></style>















<!-- <template>
  <h2>agendar consulta</h2>
</template>

<script setup>

import { useStore } from 'vuex';
const store = useStore()

console.log('agendar consultas: ' + store.state.pacienteId)
</script>

<style></style> -->