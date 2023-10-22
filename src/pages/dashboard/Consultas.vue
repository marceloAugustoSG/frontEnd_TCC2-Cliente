<template>
  <div class="aviso" v-if="consultas.length === 0">
    <p style="text-align: center;">Nenhuma consulta agendada no momento</p>
  </div>

  <div v-else>
    <v-col v-for="consulta in consultas" :key="consulta.id">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{ consulta.servico }}</v-toolbar-title>
          <v-toolbar-items v-show="consulta.data">
            <visualizar-consulta :consulta="consulta" />
          </v-toolbar-items>
        </v-toolbar>
        <v-divider />
        <v-card-item title="Status:">
          <v-card-subtitle
            :class="consulta.status === 'Agendada' ? 'text-orange' : consulta.status === 'Confirmada' ? 'text-green' : consulta.status">{{
              consulta.status
            }}</v-card-subtitle>
        </v-card-item>
        <v-divider />
        <v-card-item title="Data:" :subtitle="!consulta.data ? 'Ainda não definida' : dataFormatada(consulta.data)" />
        <v-divider />
        <v-card-item title="Observação:" :subtitle="consulta.observacao" />

      </v-card>
    </v-col>
  </div>
</template>
<script setup>
import { computed, ref, onMounted, reactive } from 'vue';
import VisualizarConsulta from '@/components/DashBoard/VisualizarConsulta.vue';
import { useStore } from 'vuex';

const store = useStore()
// let opcao = ref('')
let showDialog = ref(false)


// function teste(opcao) {
//   if (opcao === 'Visualizar') {
//     showDialog.value = true
//     // alert('Alert vizualizar')
//   } if (opcao === 'Cancelar') {
//     alert('alert cancelar')
//   }
// }
let isSelecionada = ref('')
let consultaSelecionada = reactive({
  data: '',
  hora: '',
  status: '',
  observacao: '',
  servico: '',
  nomeProfissional: '',
  especialidade: ''
})

const items = ref([
  { opcao: 'Visualizar' },
  { opcao: 'Cancelar' },
])



// Use onMounted para chamar a ação após o componente ser montado
onMounted(async () => {

  await store.dispatch('listarConsultasPaciente');
});
const consultas = computed(() => store.state.consultas)

function dataFormatada(data) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getUTCDate()).padStart(2, '0');
  const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0 (janeiro é 0)
  const ano = dataObj.getUTCFullYear();
  const hora = String(dataObj.getUTCHours()).padStart(2, '0');
  const minuto = String(dataObj.getUTCMinutes()).padStart(2, '0');

  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  return dataFormatada;
}




</script>


<style></style>