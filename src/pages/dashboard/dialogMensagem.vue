<template>
    <v-dialog v-model="showDialog" width="600">
        <v-card>

            <v-card-text>
                Ao solicitar uma consulta com o psicólogo,você precisará responder um questionário que será enviado
                posteriormente para a psicologa
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="fecharDialog" text="OK" />

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    tipo: String
});

const showDialog = ref(props.tipo === 'Atendimento Psicológico');

function fecharDialog() {
    // Modificando a variável reativa em vez da propriedade
    showDialog.value = false;
}
console.log(showDialog.value);
</script>

<style></style>
