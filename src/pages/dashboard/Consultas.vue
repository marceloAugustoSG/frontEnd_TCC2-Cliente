<template>
  <v-container>
    <div class="aviso" v-if="consultas.length === 0">
      <p style="text-align: center;">Nenhuma consulta agendada no momento</p>
    </div>
    <v-row v-else>
      <v-col cols="12" md="10" sm="12" lg="3" v-for="(consulta, index) in consultas " :key="index">
        <v-card>
          <v-toolbar elevation="3">
            <span>{{ consulta.servico }}</span>
            <v-spacer />
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props" />
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" v-model="opcao" :key="index" :value="index"
                  @click="teste(opcao)">
                  <v-list-item-title>{{ item.opcao }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card-item>
            <v-card-text>
              <v-card-item>
                <p><strong>Status:</strong> {{ consulta.status }}</p>
              </v-card-item>
              <v-card-item>
                <p v-if="consulta.observacao.length > 30">
                  {{ consulta.observacao.substring(0, 20) + "..." }}
                </p>
                <p v-else>
                  {{ consulta.observacao }}
                </p>

              </v-card-item>
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const opcao = ref()


function teste(opcao) {
  alert(` marcelo: ${opcao}`)
}
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



</script>


<style></style>