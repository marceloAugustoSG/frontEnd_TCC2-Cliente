<template>
  <v-container>
    <div class="aviso" v-if="consultas.length === 0" style="">
      <p style="text-align: center;">Nenhuma consulta agendada no momento...</p>

    </div>


    <v-row v-else>
      <v-col cols="12" md="4" sm="4" v-for="(consulta, index) in consultas " :key="index">
        <v-card>
          <v-card-title>{{ consulta.nome }}</v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-calendar-heart"></v-icon>
            {{ consulta.data }}
            <br>
            <v-icon icon="mdi-clock-outline"></v-icon> {{ consulta.hora }}
          </v-card-subtitle>
          <v-card-text>
            <p v-if="consulta.descricao.length > 30">
              {{ consulta.descricao.substring(0, 20) + "..." }}
            </p>
            <p v-else>
              {{ consulta.descricao }}
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn>Detalhes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
// import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const consultas = computed(() => store.state.agendamentos);



</script>
<style scoped>
.aviso {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;


}
</style>
