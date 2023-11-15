<template>
  <v-container class="pa-1">
    <v-card class="pa-5" elevation="10">
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <v-text-field label="Seu nome" v-model="paciente.nome" disabled />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Matricula" v-model="paciente.matricula" disabled />
          </v-col>
          <v-col cols="12" md="12">
            <v-select v-model="servico" label="Serviço" :items="[

              'Atendimento Médico',
              'Atendimento Psicológico',
            ]" required />
          </v-col>
          <v-col v-if="servico === 'Atendimento Psicológico'">

            <dialogMensagem :tipo="servico" />
            <teste />
          </v-col>
          <v-col v-else cols="12" md="12">
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
import { computed, onBeforeMount, ref } from 'vue';
import { useStore } from "vuex";
import teste from '@/components/DashBoard/FormStepper.vue'
import dialogMensagem from './dialogMensagem.vue';


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
onBeforeMount(async () => {

  await store.dispatch('listarConsultasPaciente');

})
const paciente = computed(() => store.state.paciente)

async function submit() {
  loading.value = true
  sucesso.value = true
  setTimeout(() => {
    loading.value = false
    sucesso.value = false
  }, 1000)
  const novoAgendamento = {
    status: "Agendada",
    observacao: (!observacao.value ? 'Nenhuma observação' : observacao.value),
    servico: servico.value,
    pacienteId: Number(localStorage.getItem('pacienteId'))
  }

  if (novoAgendamento.servico === 'Atendimento Médico') {
    await store.dispatch('agendarConsulta', novoAgendamento)
    sucesso.value = true
    showIcon.value = !showIcon.value
    clearCamposConsulta()
    store.dispatch('listarConsultasPaciente')
  } else if (novoAgendamento.servico === 'Atendimento Psicológico') {

  }
}

</script>
<style scoped></style>
