<template>
    <v-sheet border rounded class="mx-auto" max-width="500">
        <v-card-title class="text-h6 font-weight-regular d-flex justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar color="primary" size="24"> {{ step }}</v-avatar>
        </v-card-title>

        <v-window v-model="step">
            <v-window-item :value="1">
                <form @submit.prevent="next">
                    <v-card-item>
                        <v-text-field variant="underlined" v-model="nome" type="text" label="Nome" required />
                        <v-text-field label="Sobrenome" type="text" v-model="sobrenome" variant="underlined" required />
                        <v-text-field label="Data de Nascimento" variant="underlined" type="date" required />
                    </v-card-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green" variant="flat" type="next" text="próximo" />
                    </v-card-actions>
                </form>
            </v-window-item>

            <v-window-item :value="2">
                <form @submit.prevent="next">
                    <v-card-item>
                        <v-text-field prepend-inner-icon="mdi-email" v-model="email" variant="underlined"
                            :rules="emailRules" label="E-mail" required />


                        <v-text-field prepend-inner-icon="mdi-form-textbox-password" variant="underlined"
                            v-model="password" :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showpassword ? 'text' : 'password'"
                            @click:append-inner="showpassword = !showpassword" label="Senha" :rules="passwordRules"
                            required />



                        <v-text-field prepend-inner-icon="mdi-form-textbox-password" variant="underlined"
                            v-model="confirmPassword"
                            :append-inner-icon="showCorfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showCorfirmPassword ? 'text' : 'password'"
                            @click:append-inner="showCorfirmPassword = !showCorfirmPassword" label="Confirmar Senha"
                            :rules="passwordRules" required />
                    </v-card-item>

                    <v-card-actions>
                        <v-btn color="blue" variant="flat" @click="back" text="anterior" />
                        <v-spacer></v-spacer>
                        <v-btn color="green" variant="flat" type="next" text="Próximo" />
                    </v-card-actions>
                </form>
            </v-window-item>
            <v-window-item :value="3">
                <v-card-item>
                    <v-text-field type="number" v-model="matricula" label="Nº Matricula" variant="underlined"
                        :rules="matriculaRules" required />
                    <v-select label="Vínculo com a UFES" v-model="vinculoUfes" :items="vinculo" type="email"
                        variant="underlined" required />
                    <v-select label="Curso" :items="cursos" type="email" variant="underlined" />
                    <v-select label="Centro acadêmico" v-model="centroAcad" :items="centroAcademico" type="email"
                        variant="underlined" />
                </v-card-item>

                <v-card-actions>
                    <v-btn v-if="step > 1" variant="flat" type="submit" color="blue" @click="back">
                        Anterior
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="step < 5" color="green" variant="flat" @click="next">
                        próximo
                    </v-btn>
                </v-card-actions>


            </v-window-item>
            <v-window-item :value="4">
                <div class="pa-4 text-center">
                    <v-img class="mb-4" height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg" contain />
                    <h3 class="text-h6 font-weight-light mb-2">
                        Welcome to Vuetify
                    </h3>
                    <span class="text-caption text-grey">Thanks for signing up!</span>
                </div>


                <v-divider></v-divider>

                <v-card-actions>
                  
                    <v-spacer></v-spacer>
                    <v-btn color="green" variant="flat" type="next" text="Criar Conta"/>
                </v-card-actions>

            </v-window-item>
        </v-window>

    </v-sheet>
</template>
<script setup>
import { ref, computed } from "vue"
let step = ref(1)

let password = ref('')
let confirmPassword = ref('')
let showpassword = ref(false)
let showCorfirmPassword = ref(false)
let nome = ref('')
let sobrenome = ref('')
let email = ref('')
let vinculoUfes = ref('')
let centroAcad = ref('')
let matricula = ref('')

let vinculo = ['Aluno', 'Docente', 'Técnico Administrativo']
let cursos = ['agronomia', 'biologia', 'matemática']
let centroAcademico = ['agronomia', 'biologia', 'matemática']



function next() {
    step.value++
}

function back() {
    step.value--
}

const emailRules = ref([
    v => !!v || 'E-mail é obrigatório e unico',
    v => /^[a-zA-Z0-9._%+-]+@edu\.ufes\.br/.test(v) || 'E-mail deve ser válido(@edu.ufes.br)',
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

const currentTitle = computed(() => {
    switch (step.value) {
        case 1: return 'Informações Iniciais'
        case 2: return 'Criando Usuário'
        case 3: return 'Informações Acadêmicas'
        default: return 'Conta criada com sucesso!'
    }
})

</script>
