<template>
    <form @submit.prevent="submit">
        <v-select v-model="estudanteNivel" :items="['Graduação', 'Pós-graduação']" label="Você é estudante de"
            required></v-select>
        <v-select v-model="centro" :items="['CCAE', 'CCENS']" label="Seu Centro é o" required></v-select>
        <v-select v-model="curso" :items="cursos" label="Seu Curso é" required></v-select>
        <p>Se mudou para vir estudar na UFES?</p>
        <v-radio-group v-model="mudancaResidencia" required>
            <v-radio label="Não" value="Não"></v-radio>
            <v-radio label="Sim" value="Sim"></v-radio>
        </v-radio-group>
        <v-btn type="submit" text="proximo" />
    </form>
</template>

<script setup>
import { ref } from "vue"

const cursos = ['Agronomia', 'Engenharia de Alimentos', 'Engenharia Florestal', 'Engenharia Industrial Madeireira', 'Engenharia Química', 'Medicina Veterinária',
    'Zootecnia', 'Ciência da Computação', 'Ciências Biológicas(Bacharel)', 'Ciências Biológicas(Licenciatura)', 'Farmácia', 'Física(Licenciatura)', 'Geologia', 'Matemática', 'Nutrição'
    , 'Química(Licenciatura)', 'Sistemas de Informação', 'Ciências Florestais(Mestrado ou Doutorado)', 'Ciências Veterinárias(Mestrado)', 'Ciência e Tecnologia de Alimentos(Mestrado),Engenharia Química(Mestado)', 'Genética e Melhoramento(Mestrado ou Doutorado)',
    'Produção Vegetal(Mestrado ou Doutorado)', 'Agroquímica(Mestrado)', 'Ensino,Educação Básica e Formação de Professores(Mestrado)']

const estudanteNivel = ref('')
const centro = ref('')
const curso = ref('')


function submit() {
    alert('clicado')
}

</script>

<style></style>