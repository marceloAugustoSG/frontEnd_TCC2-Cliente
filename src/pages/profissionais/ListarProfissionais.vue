<template>
  <p>Listar profissionais</p>

  <div>
    <Table
      :cabecalho="this.headers"
      :dados="this.profissionais"
      :texto-label="this.label"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Table from "@/components/testes/Table.vue";
export default {
  components: {
    Table,
  },
  data() {
    //Configurações do componente de tabela
    return {
      label: "Procurar por profissionais",
      headers: [
        {
          align: "start",
          key: "id",
          sortable: true,
          title: "ID",
        },
        { key: "nome", title: "Nome" },
        { key: "especialidade", title: "Especialidade" },
      ],
    };
  },
  computed: {
    ...mapState(["profissionais"]),
  },
  methods: {
    ...mapActions(["getAllProfissionais"]),
  },

  created() {
    this.getAllProfissionais();
    console.log(this.teste);
  },
};
</script>
