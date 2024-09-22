<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <v-sheet variant="outlined" class="pa-5 " border rounded="">
          <div class="d-flex  align-center justify-space-between mb-5">
            <h2>Meu Perfil</h2>
            <v-btn icon="mdi-pencil" @click="habilitarCampos" variant="tonal" />
          </div>
          <v-spacer></v-spacer>
          <form @submit.prevent="submit">
            <v-text-field prepend-inner-icon="mdi-account" variant="outlined" v-model="store.state.paciente.nome"
              label="Nome" required :disabled="editCampos" />
            <v-text-field type="number" v-model="store.state.paciente.matricula" variant="outlined" label="Nº Matricula"
              required :disabled="editCampos" />
            <v-text-field v-model="store.state.paciente.telefone" label="Telefone" variant="outlined" required
              :disabled="editCampos" />
            <v-select label="Vinculo com a UFES" v-model="store.state.paciente.tipo" variant="outlined"
              :items="selectTipos" required :disabled="editCampos" />
            <v-row class="pb-5">
              <v-col>
                <v-btn type="submit" class="w-100" color="primary" text="Atualizar" :disabled="editCampos"  />
              </v-col>
            </v-row>
          </form>
        </v-sheet>
        <v-dialog v-model="store.state.variaveistelaPerfil.updateNotModifield">
          <Alert type="warning" title="Aviso" text="Usuário não foi atualizado"  />

        </v-dialog>
        <v-dialog v-model="store.state.variaveistelaPerfil.updateModifield">
          <Alert type="success" title="Aviso" text="Usuário atualizado" />

        </v-dialog>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="isPerfilAtualizado" max-width="500">
    <v-card>
      <Alert type="success" title="Aviso" text="Perfil atualizado !" variant="outlined" />
    </v-card>
  </v-dialog>

  <v-dialog v-model="perfilErro" max-width="500">
    <v-card>
      <Alert type="warning" title="Aviso" text="Erro ao atualizar o perfil" variant="outlined" />
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onBeforeMount, ref } from "vue"
import { useStore } from "vuex"
import Alert from "@/components/mensagens/Alert.vue";
const store = useStore();

let isPerfilAtualizado = ref(false)
let perfilErro = ref(false)
let editCampos = ref(true)
const selectTipos = ref(['Aluno', 'Docente', 'Técnico Administrativo'])

function habilitarCampos() {
  editCampos.value = !editCampos.value
}

onBeforeMount(() => {
  store.dispatch('setActiveBtnRefresh', true)
})

async function submit() {

  const novoPaciente = {
    nome: store.state.paciente.nome,
    matricula: store.state.paciente.matricula,
    telefone: store.state.paciente.telefone,
    tipo: store.state.paciente.tipo,
  }
  console.log(novoPaciente)

 

  try {
    await store.dispatch('editarPerfil', novoPaciente)
  } catch (error) {

  }
}
</script>

<style>
.bordered-div {
  border: 1px solid rgba(194, 194, 194, 0.336);
  padding: 10px;
}
</style>
