<template>
  <v-container>
    <v-sheet class="pa-5" border rounded>
      <form @submit.prevent="submit">
        <v-row>
          <!-- <p>{{ store.state.paciente.id }}</p> -->
          <v-col cols="12">
            <v-text-field label="Seu nome" variant="outlined" v-model="store.state.paciente.nome" disabled />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Matricula"  variant="outlined" v-model="store.state.paciente.matricula" disabled />
          </v-col>
          <v-col cols="12" md="12">
            <v-select v-model="servico"  variant="outlined" label="Serviço" :items="[
              'Atendimento Médico',
              'Atendimento Psicológico',
            ]" required />
          </v-col>
          <v-col v-if="servico === 'Atendimento Psicológico'">
            <dialogMensagem :tipo="servico" />
            <teste />
          </v-col>
          <v-col v-else cols="12" md="12">
            <v-textarea label="Observações" variant="outlined" v-model="observacao" clearable />
          </v-col>
        </v-row>
        <v-btn type="submit" :loading="loading" block color="primary" :append-icon="showIcon ? 'mdi-check-circle' : ''"
          text="Solicitar Consulta" />
      </form>
    </v-sheet>
    <v-dialog v-model="store.state.isMessageSucesso">
      <mensagemSucesso :mensagem="msg" />
    </v-dialog>

  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useStore } from "vuex";
import teste from '@/components/DashBoard/FormStepper.vue'
import dialogMensagem from './dialogMensagem.vue';
import mensagemSucesso from '@/components/mensagens/mensagemSucesso.vue';


let loading = ref(false)
let showIcon = ref(false)
let sucesso = ref(false)
const store = useStore()
const servico = ref('')
const observacao = ref('')
const msg = ref('Consulta solicitada com sucesso!')

function clearCamposConsulta() {
  servico.value = ''
  observacao.value = ''
}
async function submit() {
  loading.value = true
  sucesso.value = true
  setTimeout(() => {
    loading.value = false
    sucesso.value = false
  }, 1000)
  const novoAgendamento = {
    status: "Solicitada",
    observacao: (!observacao.value ? 'Nenhuma observação' : observacao.value),
    servico: servico.value,
    pacienteId: Number(localStorage.getItem('pacienteId')),
    respostas: null
  }

  if (novoAgendamento.servico === 'Atendimento Médico') {
    await store.dispatch('agendarConsulta', novoAgendamento)
    sucesso.value = true
    showIcon.value = !showIcon.value
    clearCamposConsulta()
    store.dispatch('listarConsultasPaciente')
  } else if (novoAgendamento.servico === 'Atendimento Psicológico') {
    novoAgendamento.respostas = store.state.respostas
    console.log(store.state.respostas)
    console.log(novoAgendamento.respostas)
    await store.dispatch('agendarConsulta', novoAgendamento)
    console.log('Consulta para psicologo')
    sucesso.value = true
    showIcon.value = !showIcon.value

    clearCamposConsulta()
  }
  store.dispatch('IsMessage', true)
}

onBeforeMount(async () => {
  try {
    await store.dispatch('getPaciente')
  } catch (error) {
    console.error(error)
  }
})

</script>


<style scoped></style>
