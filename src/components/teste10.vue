<template>
    <v-stepper mobile v-model="step" hide-actions :items="[1, 2, 3]">
        <template v-slot:item.1>
            <h2>Etapa 1</h2>
            <form @submit.prevent="avancarEtapa">
                <v-text-field label="Nome" v-model="nome" required />

                <v-stepper-actions>
                    <v-card-actions class="pa-5">
                        <v-btn text="ANTERIOR" disabled />
                        <v-spacer />
                        <v-btn type="avancarEtapa" text="PRÓXIMO" />
                    </v-card-actions>
                </v-stepper-actions>
            </form>
        </template>
        <template v-slot:item.2>
            <h2>Etapa 2</h2>
            <form @submit.prevent="avancarEtapa">
                <v-text-field label="idade" v-model="idade" required />

                <v-stepper-actions>
                    <v-card-actions class="pa-5">
                        <v-btn text="ANTERIOR" @click="voltarEtapa" />
                        <v-spacer />
                        <v-btn type="avancarEtapa" text="PRÓXIMO" />
                    </v-card-actions>
                </v-stepper-actions>
            </form>
        </template>

        <template v-slot:item.3>
            <h2>Etapa 3</h2>
            <form @submit.prevent="avancarEtapa">
                <v-text-field label="peso" v-model="peso" required />

                <v-stepper-actions>
                    <v-card-actions class="pa-5">
                        <v-btn text="ANTERIOR" @click="voltarEtapa" />
                        <v-spacer />
                        <v-btn type="avancarEtapa" text="PRÓXIMO" disabled />
                    </v-card-actions>
                </v-stepper-actions>
            </form>
        </template>

        <p>{{ nome }}</p>
        <p>{{ idade }}</p>
        <p>{{ peso }}</p>

    </v-stepper>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const nome = ref('')
const idade = ref('')
const peso = ref('')

function avancarEtapa() {
    if (step.value > 3) {
        step.value = 3
    } else {

        step.value++

    }

}

function voltarEtapa() {

    if (step.value < 1) {
        step.value == 1
    } else {
        step.value--

    }

}
</script>
