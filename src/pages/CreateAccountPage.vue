<template>
    <v-container class="fill-height">
        <v-row class=" p-4">
            <v-col cols="12" lg="3" md="2" sm="2" xl="4"></v-col>
            <v-col cols="12" lg="6" md="8" sm="8" xl="4">
                <v-card elevation="10">
                    <v-card-text>
                        <h2 class="text-center">Crie sua conta</h2>
                    </v-card-text>
                    <v-card>
                        <v-card-item>
                            <form @submit.prevent="submit">

                                <v-text-field prepend-inner-icon="mdi-account" v-model="nome" label="Nome" required />
                                <v-text-field prepend-inner-icon="mdi-email" v-model="email" :rules="emailRules"
                                    label="E-mail" required />

                                <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="password"
                                    :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showpassword ? 'text' : 'password'"
                                    @click:append-inner="showpassword = !showpassword" label="Senha" :rules="passwordRules"
                                    required />


                                <v-text-field prepend-inner-icon="mdi-form-textbox-password" v-model="confirmPassword"
                                    :append-inner-icon="showCorfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showCorfirmPassword ? 'text' : 'password'"
                                    @click:append-inner="showCorfirmPassword = !showCorfirmPassword" label="Confirmar Senha"
                                    :rules="passwordRules" required />
                                <v-text-field type="number" v-model="matricula" label="Nº Matricula" :rules="matriculaRules"
                                    required />
                                <v-select label="Vinculo com a UFES" v-model="tipo" :items="selectTipos" required />
                                <v-select v-model="nivel" :items="['Graduação', 'Pós-graduação']"
                                    label="Você é estudante de" required />
                                <v-select v-model="curso" :items="cursos" label="Curso" required />




                                <v-text-field type="date" v-model="data" label="Data de Nascimento" required />

                                <v-row class="pb-5">
                                    <v-col>
                                        <v-btn @click="backtoLogin" class="w-100" color="primary">Voltar para o
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

        <v-dialog v-model="isUserCreated" max-width="500">
            <v-card>
                <Alert type="success" title="Aviso" text="Usuário criado com sucesso" variant="outlined" />
            </v-card>
        </v-dialog>

        <v-dialog v-model="differentPass" max-width="500">
            <v-card>
                <Alert type="warning" title="Aviso" text="Senhas diferentes" variant="outlined" />
            </v-card>
        </v-dialog>
        <v-dialog v-model="isCheckEmail" max-width="500">
            <v-card>
                <Alert type="warning" title="Aviso" text="Email deve ser : email@edu.ufes.br" variant="outlined" />
            </v-card>
        </v-dialog>

        <v-dialog v-model="isUserExist" max-width="500">
            <v-card>
                <Alert type="warning" title="Aviso" text="Usuário já existente" variant="outlined" />
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script setup>
import { ref, reactive, computed } from "vue"
import { useRouter } from "vue-router";
import { useStore } from "vuex"
import Alert from "@/components/Alert.vue";
const store = useStore();
const router = useRouter();
let differentPass = ref(false)
let isCheckEmail = ref(false)
let isUserCreated = ref(false)
let isUserExist = ref(false)

let confirmPassword = ref('')
let showpassword = ref(false)
let showCorfirmPassword = ref(false)
let showDialog = ref(false)

let nome = ref('')
let email = ref('')
let password = ref('')
let matricula = ref('')
let tipo = ref('')
let data = ref('')
let curso = ref('')
let nivel = ref('')


const cursos = ['Agronomia', 'Engenharia de Alimentos', 'Engenharia Florestal', 'Engenharia Industrial Madeireira', 'Engenharia Química', 'Medicina Veterinária',
    'Zootecnia', 'Ciência da Computação', 'Ciências Biológicas(Bacharel)', 'Ciências Biológicas(Licenciatura)', 'Farmácia', 'Física(Licenciatura)', 'Geologia', 'Matemática', 'Nutrição'
    , 'Química(Licenciatura)', 'Sistemas de Informação', 'Ciências Florestais(Mestrado ou Doutorado)', 'Ciências Veterinárias(Mestrado)', 'Ciência e Tecnologia de Alimentos(Mestrado),Engenharia Química(Mestado)', 'Genética e Melhoramento(Mestrado ou Doutorado)',
    'Produção Vegetal(Mestrado ou Doutorado)', 'Agroquímica(Mestrado)', 'Ensino,Educação Básica e Formação de Professores(Mestrado)']



const selectTipos = ref(['Aluno', 'Docente', 'Técnico Administrativo'])

async function submit() {

    const novoPaciente = {
        email: email.value,
        password: password.value,
        regra: 'paciente',
        paciente: {
            nome: nome.value,
            tipo: tipo.value,
            matricula: matricula.value,
            dataNascimento: dataFormatada.value,
            curso: curso.value
        }
    }

    try {
        await store.dispatch('criarUsuario', novoPaciente)


        if (store.state.message === "usuario criado com sucesso!") {
            isUserCreated.value = true
            setInterval(() => {
                isUserCreated.value = false
            }, 2500)
            clearInputs()

        }
        if (store.state.message === 'email não aceito') {
            isCheckEmail.value = true
            setInterval(() => {
                isCheckEmail.value = false
            }, 2500)
            clearInputs()
        }
        if (store.state.message === 'usuário ja existe') {
            isUserExist.value = true
            setInterval(() => {
                isUserExist.value = false
            }, 2500)
            clearInputs()
        }

        if (!checkPassoWord()) {
            differentPass.value = true
            setInterval(() => {
                differentPass.value = false
            }, 2500)
        }
    } catch (error) {
        console.log(error)
    }
}
function backtoLogin() {
    router.push({ name: 'login' })
}
function clearInputs() {
    nome.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    matricula.value = ''
    tipo.value = ''
    data.value = ''
}

function checkPassoWord() {
    return password.value === confirmPassword.value ? true : false
}


const dataFormatada = reactive(computed(() => {
    const dataF = new Date(data.value)
    const dia = String(dataF.getDate() + 1).padStart(2, "0");
    const mes = String(dataF.getMonth() + 1).padStart(2, "0");
    const ano = dataF.getFullYear();
    return `${ano}-${mes}-${dia}T00:00:00.000Z`;
}))

// const dataFormatada = reactive(computed(() => {
//     const dataF = new Date(data.value);
//     const dia = String(dataF.getDate()).padStart(2, "0");
//     const mes = String(dataF.getMonth() + 1).padStart(2, "0");
//     const ano = dataF.getFullYear();
//     const horaFormat = hora.value.hours <= 9 ? `0${hora.value.hours}` : hora.value.hours
//     const minutesFormat = hora.value.minutes <= 9 ? `0${hora.value.minutes}` : hora.value.minutes
//     return `${ano}-${mes}-${dia}T${horaFormat}:${minutesFormat}:00.000Z`;
// }))



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

</script>
<style>
.text-center {
    text-align: center;

}
</style>