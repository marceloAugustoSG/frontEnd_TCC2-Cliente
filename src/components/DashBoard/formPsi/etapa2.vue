<template>
    <v-form @submit.prevent="submit">
        <p class="pa-5">Com quem você reside em Alegre?</p>
        <v-checkbox v-model="resideCom" value="Pais" label="Com seus pais" required />
        <v-checkbox v-model="resideCom" value="Mãe" label="Com sua mãe" required />
        <v-checkbox v-model="resideCom" value="Pai" label="Com seu pai" required />
        <v-checkbox v-model="resideCom" value="Irmãos" label="Com seus irmãos" required />
        <v-checkbox v-model="resideCom" value="Irmã" label="Com sua irmã" required />
        <v-checkbox v-model="resideCom" value="Irmão" label="Com seu irmão" required />
        <v-checkbox v-model="resideCom" value="Avós/Avô/Avó" label="Com seus avós/avô/avó" required />
        <v-checkbox v-model="resideCom" value="Familiares" label="Com familiares" required />
        <v-checkbox v-model="resideCom" value="Sozinho" label="Sozinho" required />
        <v-checkbox v-model="resideCom" value="Amigos" label="Com amigos" required />
        <v-checkbox v-model="resideCom" value="Colegas estudantes" label="Com colegas estudantes" required />
        <v-checkbox v-model="resideCom" value="Alojamento" label="No alojamento" required />
        <v-checkbox v-model="resideCom" value="República" label="Em uma república" required />
        <v-checkbox v-model="resideCom" value="Outros" label="Outros" required />
        <p>{{ resideCom }}</p>
        <v-divider />
        <p class="mt-3 mb-3">Explique com suas palavras e de forma breve os motivos que
            te levaram a procurar
            atendimento psicológico</p>
        <v-textarea v-model="motivosAtendimento" label="Motivos" required></v-textarea>
    </v-form>
</template>

<script setup >

</script>

<style></style>