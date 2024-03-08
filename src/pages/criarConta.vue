<template>
    <v-container class="fill-height">
        <v-sheet max-width="400" class="mx-auto pa-3" border rounded :elevation="8">
            <h2 class="text-center text-subtitle-1 mb-5">Criar conta</h2>
            <form @submit.prevent="submit">

                <v-text-field prepend-inner-icon="mdi-account" variant="outlined" v-model="nome" label="Nome" required />
                <v-text-field prepend-inner-icon="mdi-email" v-model="email" variant="outlined" :rules="emailRules"
                    label="E-mail" required />

                <v-text-field prepend-inner-icon="mdi-form-textbox-password" variant="outlined" v-model="password"
                    :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showpassword ? 'text' : 'password'"
                    @click:append-inner="showpassword = !showpassword" label="Senha" :rules="passwordRules" required />


                <v-text-field prepend-inner-icon="mdi-form-textbox-password" variant="outlined" v-model="confirmPassword"
                    :append-inner-icon="showCorfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showCorfirmPassword ? 'text' : 'password'"
                    @click:append-inner="showCorfirmPassword = !showCorfirmPassword" label="Confirmar Senha"
                    :rules="passwordRules" required />
                <v-text-field type="number" v-model="matricula" label="Nº Matricula" variant="outlined"
                    :rules="matriculaRules" required />
                <v-select label="Vinculo com a UFES" v-model="tipo" variant="outlined" :items="selectTipos" required />

                <v-text-field v-model="telefone" label="Telefone" variant="outlined" required />
                <v-text-field type="date" v-model="data" label="Data de Nascimento" variant="outlined" required />


                <v-row class="pb-5">
                    <v-col>
                        <v-btn @click="backtoLogin" class="w-100" color="primary">Voltar para o
                            Login</v-btn>
                    </v-col>

                    <v-col>
                        <v-btn type="submit" class="w-100" variant="outlined" color="create">Criar
                            Conta</v-btn>
                    </v-col>
                </v-row>
            </form>
        </v-sheet>
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
import Alert from "@/components/mensagens/Alert.vue";
const store = useStore();
const router = useRouter();
let differentPass = ref(false)
let isCheckEmail = ref(false)
let isUserCreated = ref(false)
let isUserExist = ref(false)

let confirmPassword = ref('')
let showpassword = ref(false)
let showCorfirmPassword = ref(false)

let nome = ref('')
let email = ref('')
let password = ref('')
let matricula = ref('')
let tipo = ref('')
let data = ref('')
let telefone = ref('')
let curso = ref('')


const cursos = ['Agronomia', 'Engenharia de Alimentos', 'Engenharia Florestal', 'Engenharia Industrial Madeireira', 'Engenharia Química', 'Medicina Veterinária',
    'Zootecnia', 'Ciência da Computação', 'Ciências Biológicas(Bacharel)', 'Ciências Biológicas(Licenciatura)', 'Farmácia', 'Física(Licenciatura)', 'Geologia', 'Matemática', 'Nutrição'
    , 'Química(Licenciatura)', 'Sistemas de Informação', 'Ciências Florestais(Mestrado ou Doutorado)', 'Ciências Veterinárias(Mestrado)', 'Ciência e Tecnologia de Alimentos(Mestrado),Engenharia Química(Mestado)', 'Genética e Melhoramento(Mestrado ou Doutorado)',
    'Produção Vegetal(Mestrado ou Doutorado)', 'Agroquímica(Mestrado)', 'Ensino,Educação Básica e Formação de Professores(Mestrado)']



const selectTipos = ref(['Aluno', 'Docente', 'Técnico Administrativo'])


async function submit() {
    console.log('começo da função')
    console.log('isCreate ' + isUserCreated.value)
    console.log('isUserExist ' + isUserExist.value)
    const novoPaciente = {
        email: email.value,
        password: password.value,
        regra: 'paciente',
        paciente: {
            nome: nome.value,
            tipo: tipo.value,
            matricula: matricula.value,
            dataNascimento: dataFormatada.value,
            curso: curso.value,
            telefone: telefone.value
        }
    }
    if (!checkPassoWord()) {
        differentPass.value = true
        return;
    } else {
        await store.dispatch('criarUsuario', novoPaciente)
        if (store.state.createError) {
            isUserExist.value = true
            console.log('error : ' + store.state.createError)
            console.log('erro ao criar o paciente')
        } if (store.state.createSucces) {
            isUserCreated.value = true
            console.log('sucesso : ' + store.state.createSucces)
        }
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
    return new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`);
}))

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