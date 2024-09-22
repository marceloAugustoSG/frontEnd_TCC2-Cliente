<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-dialog v-model="alertMessage" max-width="500">
      <v-card>
        <Alert type="warning" density="compact" title="Aviso" variant="outlined" text="email ou senha incorretos" />
      </v-card>
    </v-dialog>
    <v-col>
      <v-sheet max-width="400" style="display: flex; align-items: center;" class="mx-auto pa-3 mb-2" border rounded>
        <img src="../../assets/icone-prazo.png" width="50px" alt="" srcset="">
        <h2 style="font-family: 'Poppins'; font-weight: 300; text-align: center;"> Agenda SASAS</h2>
      </v-sheet>
      <v-sheet max-width="400" class="mx-auto pa-3" border rounded>

        <h2 class="text-center text-subtitle-1">Login</h2>
        <form @submit.prevent="submit">
          <v-text-field prepend-inner-icon="mdi-email" variant="outlined" v-model="usuario.email" :rules="emailRules"
            label="E-mail" required />
          <v-text-field prepend-inner-icon="mdi-form-textbox-password" variant="outlined" v-model="usuario.password"
            :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'
              " :type="showpassword ? 'text' : 'password'" @click:append-inner="showpassword = !showpassword"
            label="Senha" required />
          <v-row class="pb-5">
            <v-col>
              <v-btn prepend-icon="mdi-account-plus" to="/criarConta" text="Criar
                  Conta" color="secundary" variant="tonal" class="w-100" />
            </v-col>
            <v-col>
              <v-btn type="submit" class="w-100" text="Entrar" prepend-icon="mdi-login" color="primary" />
            </v-col>
          </v-row>
        </form>
      </v-sheet>
    </v-col>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import Alert from "@/components/mensagens/Alert.vue";

const store = useStore();
const router = useRouter();
let alertMessage = ref(false)

let usuario = reactive({
  email: '',
  password: '',
})
const showpassword = ref(false)
const emailRules = ref([
  v => !!v || 'E-mail é obrigatório',
  v => /^[a-zA-Z0-9._%+-]+@edu\.ufes\.br/.test(v) || 'E-mail deve ser válido(@edu.ufes.br)',
])


async function submit() {

  await store.dispatch('logar', usuario).then(() => {
    const message = store.state.message
    message ? alertMessage.value = true : alertMessage.value = false
    router.push({ name: 'consultas' })
  }).catch((e) => {
    console.log(e)
  })
}

</script>

<style>
.text-center {
  text-align: center;
}
</style>