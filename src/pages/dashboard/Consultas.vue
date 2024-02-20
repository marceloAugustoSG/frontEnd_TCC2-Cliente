<template>
  <div class="aviso" v-if="consultas.length === 0">
    <p style="text-align: center;">Nenhuma consulta solicitada no momento</p>
  </div>
  <v-row v-else-if="consultas && consultas.length > 0">
    <v-col cols="12" sm="6" md="4" lg="4" v-for="consulta in consultas" :key="consulta.id">
      <v-sheet variant="outlined" border elevation="8" rounded>
        <v-toolbar>
          <v-toolbar-title>{{ consulta.servico }}</v-toolbar-title>
          <v-toolbar-items>
          </v-toolbar-items>
        </v-toolbar>
        <v-divider />
        <v-card-item title="Status:">
          <v-card-subtitle
            :class="consulta.status === 'Cancelada' ? 'text-red' : consulta.status === 'Solicitada' ? 'text-orange' : consulta.status === 'Confirmada' ? 'text-green' : consulta.status">{{
              consulta.status
            }}</v-card-subtitle>
        </v-card-item>
        <v-divider />
        <v-card-item title="Observação:" :subtitle="consulta.observacao" />
        <v-divider />
        <v-card-item title="Solicitada em:" :subtitle="formatDate(consulta.data_solicitacao)" />
        <v-divider />
        <v-card-item title="Data:" :subtitle="!consulta.data ? 'Ainda não definida' : formatDate(consulta.data)" />
        <v-divider />
        <v-card-item title="Local:" subtitle="Castelinho" />
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import formatDate from '@/services/date';
const store = useStore()



const consultas = computed(() => store.state.consultas)
console.log(consultas.value)



onBeforeMount(async () => {
  try {
    await store.dispatch('listarConsultasPaciente');
  } catch (error) {
    console.error(error)

  }
});

</script>

<style scoped>
.text-red-5 {
  color: red
}
</style>
