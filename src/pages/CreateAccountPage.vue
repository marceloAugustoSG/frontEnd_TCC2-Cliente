<template>
    <v-container class="fill-height">
        <v-row class=" p-4">
            <v-col cols="12" lg="3" md="2" sm="2" xl="4"></v-col>
            <v-col cols="12" lg="6" md="8" sm="8" xl="4">
                <v-card>
                    <v-card-text>
                        <h2 class="text-center">Crie sua conta</h2>
                    </v-card-text>
                    <v-card>
                        <v-card-item>
                            <form @submit.prevent="submit">

                                <v-text-field prepend-inner-icon="mdi-account" v-model="usuario.Paciente.nome" label="Nome"
                                    required />
                                <v-text-field prepend-inner-icon="mdi-email" v-model="usuario.email" :rules="emailRules"
                                    label="E-mail" required />

                                <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="usuario.password"
                                    :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showpassword ? 'text' : 'password'"
                                    @click:append-inner="showpassword = !showpassword" label="Senha" :rules="passwordRules"
                                    required />


                                <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="confirmPassword"
                                    :append-inner-icon="showCorfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showCorfirmPassword ? 'text' : 'password'"
                                    @click:append-inner="showCorfirmPassword = !showCorfirmPassword" label="Confirmar Senha"
                                    :rules="passwordConfirm" required />


                                <v-text-field type="number" v-model="usuario.Paciente.matricula" label="Nº Matricula"
                                    :rules="matriculaRules" />

                                <v-select label="Tipo" v-model="usuario.Paciente.tipo" :items="selectTipos"></v-select>

                                <v-row class="pb-5">
                                    <v-col>
                                        <v-btn to="/login" class="w-100" color="primary">Voltar para o
                                            Login</v-btn>
                                    </v-col>

                                    <v-col>
                                        <v-btn type="submit" class="w-100" color="create">Criar
                                            Conta</v-btn>
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
</template>

<script setup>
import { ref, reactive } from "vue"
import { useStore } from "vuex"

const store = useStore();

let usuario = reactive({
    email: '',
    password: '',
    Paciente: {
        nome: '',
        tipo: '',
        matricula: ''
    },
})

let confirmPassword = ref('')
let showpassword = ref(false)
let showCorfirmPassword = ref(false)

const emailRules = ref([
    v => !!v || 'E-mail é obrigatório e unico',
    v => /^[a-zA-Z0-9._%+-]+@edu\.ufes\.br/.test(v) || 'E-mail deve ser válido',
])
const passwordRules = ref([
    v => !!v || 'Senha é obrigatoria',

])

const matriculaRules = ref([
    value => !!value || "Campo obrigatório",
    value =>
        (value && /^\d{10}$/.test(value)) ||
        "A matricula deve ter exatamente 10 números",
    value => value.leng
])

const selectTipos = ref(['Aluno', 'Servidor'])


function submit() {
    if (confirmarPassword()) {
        alert(`Nome: ${usuario.Paciente.nome}\n
                   Email: ${usuario.email}\n
                   Senha: ${usuario.password}\n
                   Senha Confirmada: ${usuario.confirmPassword}\n
                   Matricula:${usuario.Paciente.matricula}\n
                   Tipo: ${usuario.Paciente.tipo}`)

        store.dispatch('criarUsuario', usuario)
    } else {
        alert("senhas diferentes")
    }
}

function confirmarPassword() {
    return usuario.password === confirmPassword.value ? true : false
}
</script>

<style>
.text-center {
    text-align: center;

}
</style>