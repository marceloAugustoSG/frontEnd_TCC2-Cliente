<template>
    <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
        <v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112"></v-icon>
        <h2 class="text-h5 mb-6">{{ props.mensagem }}</h2>
        <v-divider class="mb-4" />
        <div class="text-end">
            <v-btn class="text-none" color="success" variant="flat" width="90" @click="fechar">
                OK
            </v-btn>
        </div>
    </v-sheet>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';
import router from '@/router';

const props = defineProps({
    mensagem: String,
})

const store = useStore()
function fechar() {

    router.push('/consultas')
    store.dispatch('IsMessage', false)



}
</script>
