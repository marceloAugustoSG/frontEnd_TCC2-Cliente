


<template>
  <v-container class="pa-1">
    <form @submit.prevent="agendar">
      <v-row>
        <v-col cols="12" xl="12" sm="8">
          <VueDatePicker required="true" placeholder="Data" locale="pt-BR" :enable-time-picker="false" v-model="data"
            :disabled-week-days="[6, 0]" :start-date="startDate" />
        </v-col>

        <v-col cols="12" xl="12" sm="4">
          <VueDatePicker required v-model="hora" time-picker disable-time-range-validation placeholder="Horário"
            :start-time="{ hours: 8, minutes: 0 }" :max-time="{ hours: 17, minutes: 0 }" no-minutes-overlay
            minutes-increment="30" />
        </v-col>

        <v-col cols="12" md="12">
          <v-select v-model="servico" label="Serviço" :items="[
            'Atendimento Odontológico',
            'Atendimento Médico',
            'Atendimento Psicológico',
          ]" requerid />
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea label="Observações" v-model="observacao" />
        </v-col>
      </v-row>
      <v-btn :loading="loading" block @click="agendar" color="primary" :append-icon="showIcon ? 'mdi-check-circle' : ''">
        Agendar
      </v-btn>
    </form>
    <template>
      <v-dialog v-model="isInputs" max-width="500">
        <v-card>
          <Alert />
        </v-card>
      </v-dialog>
    </template>
  </v-container>

  <p>{{ data }}</p>
  <p>{{ hora }}</p>
  <p>{{ dataFormatada }}</p>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref, computed, reactive } from 'vue';
import { useStore } from "vuex";
import Alert from "@/components/Alert.vue";

let loading = ref(false)
let showIcon = ref(false)
let isInputs = ref(false)


const store = useStore()

const data = ref('')
const hora = ref('')
const servico = ref('')
const observacao = ref('')

function clearCamposConsulta() {
  data.value = ''
  hora.value = ''
  servico.value = ''
  observacao.value = ''
}

function agendar() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1000)

  if (!data.value || !hora.value || !servico.value) {
    // alert('campos vazios')
    isInputs.value = true
  } else {
    const novoAgendamento = {
      data: dataFormatada.value,
      status: "agendado",
      observacao: (!observacao.value ? 'Nenhuma observação' : observacao.value),
      servico: servico.value,
    }
    store.dispatch('agendarConsulta', novoAgendamento)
    store.dispatch('listarConsultasPaciente')
    showIcon.value = !showIcon.value


    clearCamposConsulta()
  }
}



const dataFormatada = reactive(computed(() => {
  const dataF = new Date(data.value);
  const dia = String(dataF.getDate()).padStart(2, "0");
  const mes = String(dataF.getMonth() + 1).padStart(2, "0");
  const ano = dataF.getFullYear();
  const horaFormat = hora.value.hours <= 9 ? `0${hora.value.hours}` : hora.value.hours
  const minutesFormat = hora.value.minutes <= 9 ? `0${hora.value.minutes}` : hora.value.minutes

  return `${ano}-${mes}-${dia}T${horaFormat}:${minutesFormat}:00.000Z`;


}))


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