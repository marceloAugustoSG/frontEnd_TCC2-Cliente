<template>
    <v-alert :density="props.density" :type="props.type" :title="props.title" :text="props.text" :variant="props.variant" />
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    density: String,
    variant: String,
    type: String,
    title: String,
    text: String,
});
</script>