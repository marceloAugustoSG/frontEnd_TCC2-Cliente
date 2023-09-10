<template>
  <v-container class="pa-1">
    <form @submit.prevent="agendar">
      <v-row>
        <v-col cols="12" xl="12" sm="8">
          <VueDatePicker required="true" placeholder="Data" locale="pt-BR" :enable-time-picker="false" v-model="data"
            :disabled-week-days="[6, 0]" />
        </v-col>

        <v-col cols="12" xl="12" sm="4">
          <VueDatePicker required v-model="hora" time-picker disable-time-range-validation placeholder="Horário"
            :min-time="{ hours: 8, minutes: 0 }" :max-time="{ hours: 17, minutes: 0 }"
            :start-time="{ hours: 9, minutes: 0 }" no-minutes-overlay />
        </v-col>

        <v-col cols="12" md="12">
          <v-select v-model="servico" label="Serviço" :items="[
            'Atendimento Odontologia',
            'Atendimento Médico',
            'Atendimento Psicológico',
          ]"></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea label="Observações" v-model="observacao" />
        </v-col>
      </v-row>
      <v-btn :loading="loading" block @click="agendar" color="primary" :append-icon="showIcon ? 'mdi-check-circle' : ''">
        Agendar
      </v-btn>
    </form>
  </v-container>

  <!-- <p>{{ dataFormatada }}</p>
  <p>{{ hora }}</p>
  <p>{{ servico }}</p>
  <p>{{ observacao }}</p> -->
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref, computed, reactive } from 'vue';
import { useStore } from "vuex";

let loading = ref(false)
let showIcon = ref(false)

const store = useStore()

const data = ref('')
const hora = ref('')
const servico = ref('')
const observacao = ref('')

function clearConsulta() {
  data.value = ''
  hora.value = ''
  servico.value = ''
  observacao.value = ''
}


function agendar() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1000)
  showIcon.value = !showIcon.value

  const novoAgendamento = {
    nome: servico.value,
    data: dataFormatada,
    hora: `${hora.value.hours} horas e ${hora.value.minutes <= 9 ? `0${hora.value.minutes}` : hora.value.minutes} minutos`,
    descricao: (!observacao.value ? 'Nenhuma descrição' : observacao.value)
  }

  const teste = {
    id: 1,
    nome: "Atendimento Odontológico",
    data: "12/08/2020",
    hora: "10:00",
    descricao: 'Extração do siso'
  }
  store.dispatch('addAgendamento', novoAgendamento)
}

const dataFormatada = reactive(computed(() => {
  const dataF = new Date(data.value);
  const dia = String(dataF.getDate()).padStart(2, "0");
  const mes = String(dataF.getMonth() + 1).padStart(2, "0");
  const ano = dataF.getFullYear();

  return `${dia}/${mes}/${ano}`;


}))


</script>
