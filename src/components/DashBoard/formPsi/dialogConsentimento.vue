<template>
    <v-dialog v-model="showDialog" width="600">
        <v-card style="text-align: center;" title="Termo de Consentimento" >
            <v-divider />
            <v-card-text>
                <p style="text-align: justify;"> Ao participar deste estudo sobre os motivos que levaram ao atendimento
                    psicológico, você será convidado a
                    responder um inventário. Ao conceder seu consentimento, suas respostas ajudarão a identificar padrões de
                    problemas, facilitando a oferta de soluções e melhorando a saúde mental na comunidade acadêmica da UFES.
                    A
                    participação é voluntária, sem compensação financeira, mas proporciona um benefício indireto ao
                    contribuir
                    para aprimorar as ações de prevenção e cuidado em saúde mental. Se concordar, autoriza o uso das
                    informações
                    em estudos científicos, garantindo a confidencialidade.</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="fecharDialog" text="OK" variant="tonal" />

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'


let showDialog = ref(true)

function fecharDialog() {
    showDialog.value = false
}
console.log(showDialog.value);
</script>

<style></style>
