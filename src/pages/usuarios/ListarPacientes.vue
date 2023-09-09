<template>
  <div>
    <Teste :cabecalho="this.headers" :dados="this.pacientes" :texto-label="this.txtLabel" />
  </div>
</template>

<script>
import Teste from '@/components/testes/Table.vue'
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    Teste
  },
  data() {
    return {
      txtLabel: "Procurar por paciente",
      headers: [
        {
          align: "start",
          key: "id",
          sortable: true,
          title: "ID",
        },
        { key: "nome", title: "Nome" },
        { key: "email", title: "E-mail" },
        { key: "tipo", title: "Tipo" },
      ],
    }

  },
  computed: {
    ...mapState(['pacientes'])

  },
  methods: {

    ...mapActions(['getAllPacientes'])
  },


  created() {
    this.getAllPacientes()
  }
}
</script>
