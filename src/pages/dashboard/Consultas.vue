<template>
  <v-container>
    <v-dialog v-model="isDetalhes">
      <v-card style="max-width: 500px;">
        <v-card-title>{{ consultaSelecionada.servico }}</v-card-title>
        <v-card-item prepend-icon="mdi-calendar-heart"> {{ consultaSelecionada.data }}</v-card-item>
        <v-card-item prepend-icon="mdi-calendar-heart"> {{ consultaSelecionada.nomeProfissional }}</v-card-item>
      </v-card>
    </v-dialog>
    <div class="aviso" v-if="consultas.length === 0">
      <p style="text-align: center;">Nenhuma consulta agendada no momento</p>
    </div>
    <v-row v-else>

      <v-col cols="12" md="4" sm="4" v-for="(consulta, index) in consultas " :key="index">
        <v-card>
          <v-card-title>{{ consulta.servico }}</v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-calendar-heart"></v-icon>
            {{ dataFormatada(consulta.data) }}
            <br>
            <v-icon icon="mdi-clock-outline"></v-icon> {{ consulta.data.substring(11, 16) }}
          </v-card-subtitle>
          <v-card-text>
            <p v-if="consulta.observacao.length > 30">
              {{ consulta.observacao.substring(0, 20) + "..." }}
            </p>
            <p v-else>
              {{ consulta.observacao }}
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="mostrarDetalhes(consulta)">Detalhes</v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const consultasReady = ref(false);
const isDetalhes = ref(false)
let isSelecionada = ref('')
let consultaSelecionada = reactive({
  data: '',
  status: '',
  observacao: '',
  servico: '',
  nomeProfissional: ''
})


function mostrarDetalhes(consulta) {
  isSelecionada = consulta
  console.log(isSelecionada)
  consultaSelecionada.data = dataFormatada(consulta.data)
  consultaSelecionada.servico = consulta.servico
  consultaSelecionada.nomeProfissional = consulta.Profissional
  isDetalhes.value = true

}

// Use onMounted para chamar a ação após o componente ser montado
onMounted(async () => {

  await store.dispatch('listarConsultasPaciente');
  consultasReady.value = true; // Sinalize que os dados estão prontos
});
const consultas = computed(() => store.state.consultas)

function dataFormatada(consulta) {
  const ano = consulta.substring(0, 4)
  const mes = consulta.substring(5, 7)
  const dia = consulta.substring(8, 10)
  return ` ${dia}/${mes}/${ano}`
}

</script>

<style></style>

<style></style>