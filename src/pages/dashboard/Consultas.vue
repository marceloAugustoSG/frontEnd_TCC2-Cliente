<template>
  <div class="aviso" v-if="consultas.length === 0">
    <p style="text-align: center;">Nenhuma consulta agendada no momento</p>
  </div>
  <v-row v-else>
    <v-col cols="12" sm="6" md="4" lg="4" v-for="consulta in consultas" :key="consulta.id">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{ consulta.servico }}</v-toolbar-title>
          <v-toolbar-items>
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
        <v-card-item title="Observação:" :subtitle="consulta.observacao" />
        <v-divider />
        <v-card-item title="Solicitada em:" :subtitle="formatDate(consulta.data_solicitacao)" />
        <v-divider />
        <v-card-item v-show="consulta.status === 'Confirmada' && consulta.data !== null" title="Data:"
          :subtitle="!consulta.data ? 'Ainda não definida' : formatDate(consulta.data)" />
        <v-divider />
        <v-card-item v-show="consulta.status === 'Confirmada' && consulta.data !== null" title="Local:"
          subtitle="Castelinho" />
      </v-card>
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
