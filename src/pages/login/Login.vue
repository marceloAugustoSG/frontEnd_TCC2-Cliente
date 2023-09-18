<template>
  <v-app class="">
    <v-container class="fill-height">
      <v-row class="p-4">
        <v-col cols="12" lg="3" md="2" sm="2" xl="4"></v-col>
        <v-col cols="12" lg="6" md="8" sm="8" xl="4">
          <v-card>
            <v-card-text>
              <h2 class="text-center">Login</h2>
            </v-card-text>
            <v-card>
              <v-card-item>
                <form @submit.prevent="submit">
                  <v-text-field prepend-inner-icon="mdi-email" v-model="email" :rules="emailRules" label="E-mail"
                    required />
                  <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="password" :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'
                    " :type="showpassword ? 'text' : 'password'" @click:append-inner="showpassword = !showpassword"
                    label="Senha" :rules="passwordRules" required />
                  <v-row class="pb-5">
                    <v-col>
                      <v-btn prepend-icon="mdi-account-plus" to="/criarConta" class="w-100" color="create">Criar
                        Conta</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn class="w-100" color="primary" append-icon="mdi-login"
                        :to="isLogado ? '/dashBoard' : '/login'" text="Entrar" @click="logar" />
                      <template>
                        <v-dialog v-model="dialog" max-width="500">
                          <v-card>
                            <Alert />
                          </v-card>
                        </v-dialog>
                      </template>
                    </v-col>
                  </v-row>
                </form>
              </v-card-item>
            </v-card>
          </v-card>
          <v-col cols="12" lg="3" md="2" sm="2" xl="4" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Alert from '@/components/Alert.vue'


const email = ref('')
const password = ref('')
const showpassword = ref(false)
const isLogado = ref(false)
const dialog = ref(false);
const router = useRouter();


const emailRules = ref([
  v => !!v || 'E-mail é obrigatório e unico',
  v => /^[a-zA-Z0-9._%+-]+@edu\.ufes\.br/.test(v) || 'E-mail deve ser válido(@edu.ufes.br)',
])


function logar() {
  if (!email.value || !password.value) {
    isLogado.value = false
    dialog.value = true

  } else {
    dialog.value = false
    isLogado.value = true
    router.push({ name: 'dashboard' })

  }

}
</script>

<style>
.text-center {
  text-align: center;
}
</style>
