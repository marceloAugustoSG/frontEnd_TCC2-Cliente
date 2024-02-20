<template>
    <v-card class="mt-3" min-width="300">
        <v-list>
            <v-list-item v-if="notificacoes.length === 0">
                <v-list-item-title class="d-flex align-center justify-space-between">
                    <p>Nenhuma notificação</p>
                </v-list-item-title>
            </v-list-item>

            <v-list-item v-else v-for="(notificacao, index) in notificacoes" :key="index" :value="index">
                <v-divider />

                <v-list-item-title class="d-flex align-center justify-space-between" style="white-space: pre-line;">
                    {{ notificacao.mensagem }}
                    <v-btn @click="apagarNotificacao(notificacao.id)">X</v-btn>
                </v-list-item-title>
                <v-divider />

            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
import { onBeforeMount, computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const props = defineProps(
    {
        notificacoes: Array
    }
)
function apagarNotificacao(index) {
    store.dispatch('deletarNotificacaoPaciente', index)
}

onBeforeMount(() => {
    store.dispatch('listarNotificacoesPaciente')
})
const notificacoes = computed(() => store.state.notificacoes)


</script>

<style></style>