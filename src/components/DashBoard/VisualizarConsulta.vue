<template>
    <v-row>
        <v-col>
            <v-dialog v-model="dialog">
                <v-card>
                    <v-toolbar class="pa-1" title="Detalhes da consulta">
                        <v-btn icon="mdi-close" @click="dialog = !dialog" />
                    </v-toolbar>
                    <v-card-item>

                        <v-card-item title="Status">
                            <v-card-subtitle
                                :class="props.consulta.status === 'Agendada' ? 'text-orange' : props.consulta.status === 'Confirmada' ? 'text-green' : props.consulta.status">{{
                                    props.consulta.status }}
                            </v-card-subtitle>
                        </v-card-item>
                        <v-divider />
                        <div v-show="props.consulta.data">
                            <v-card-item title="Data e hora da consulta: " :subtitle="dataFormatada(props.consulta.data)" />
                        </div>
                        <v-divider />
                        <v-card-item title="Local:" subtitle="Castelinho" />
                        <v-divider />
                        <v-card-item title="Solicitada em : " :subtitle="dataFormatada(props.consulta.data_solicitacao)" />
                        <v-divider />
                        <v-card-item v-show="props.consulta.Profissional" title="Profissional:"
                            :subtitle="`${profissional} | ${especialidade}`">
                        </v-card-item>
                        <v-divider />
                    </v-card-item>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-btn icon="mdi-dots-vertical" @click="teste" />
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    consulta: Object,
})


const profissional = props.consulta.Profissional ? `Dr ${props.consulta.Profissional.nome}` : 'nenhum profissional'
const especialidade = props.consulta.Profissional ? `${props.consulta.Profissional.especialidade}` : ''
const dialog = ref(false)

function teste() {
    dialog.value = !dialog.value
}


function dataFormatada(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getUTCDate()).padStart(2, '0');
    const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0'); // Lembre-se que os meses em JavaScript são base 0 (janeiro é 0)
    const ano = dataObj.getUTCFullYear();
    const hora = String(dataObj.getUTCHours()).padStart(2, '0');
    const minuto = String(dataObj.getUTCMinutes()).padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    return dataFormatada;
}









</script>

<style></style>