<template>
    <v-card class="mt-3" min-width="300">
        <v-list>
            <v-list-item v-if="store.state.mensagemNotificacao === 'Nenhuma notificação'">
                <v-list-item-title class="d-flex align-center justify-space-between">
                    <p>Nenhuma notificação</p>
                </v-list-item-title>
            </v-list-item>

            <v-list-item v-else v-for="(notificacao, index) in store.getters.notificacoesPaciente" :key="index"
                :value="index">
                <v-divider />
                <v-list-item-title class="d-flex align-center justify-space-between" style="white-space: pre-line;">{{
                    notificacao.mensagem }}
                    <v-btn @click="apagarNotificacao(notificacao.id)">X</v-btn>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
import { onBeforeMount } from "vue"
import { useStore } from "vuex"

const store = useStore()
const props = defineProps(
    {
        notificacoes: Array
    }
)
function apagarNotificacao(index) {
    store.dispatch('excluirNotificacao', index)
    // store.state.notificacoes.splice(index, 1)
}

onBeforeMount(() => {
    store.dispatch('listarNotificacoes')
    console.log(store.state.notificacoes)
    console.log('teste')
})


</script>

<style></style>