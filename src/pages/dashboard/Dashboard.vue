<template>
  <v-app>
    <v-layout>
      <v-app-bar style="position: fixed; " elevation="1">
        <v-app-bar-nav-icon style="margin: 0 10px ; " variant="text" @click.stop="isOpenSBar = !isOpenSBar" />
        <v-app-bar-title>Agenda Sasas</v-app-bar-title>

        <template #append>
          <v-btn class="mr-3" @click="toggleTheme" rounded="40"
            :icon="theme.global.current.value.dark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'">
            <v-icon v-if="theme.global.current.value.dark" icon="mdi-white-balance-sunny" color="orange" />
            <v-icon v-else icon="mdi-moon-waning-crescent" color="blue" />
          </v-btn>
          <v-btn @click="refresh" icon="mdi-refresh" color="red" rounded="40"
            :disabled="store.state.activeBtnRefresh" />
          <v-btn icon class="mr-3">
            <v-badge dot>
              <v-icon icon="mdi-bell-outline" />
            </v-badge>
            <v-menu activator="parent">
              <Notificacoes :notificacoes="notificacoes" />
            </v-menu>
          </v-btn>

          <v-menu>
            <template #activator="{ props }">
              <v-avatar v-bind="props" style="max-width: 30px; max-height: 30px">
                <v-btn>
                  <v-icon size="25" v-bind="props" color="colorIcons" icon="mdi-account " />
                </v-btn>
              </v-avatar>
            </template>
            <v-card min-width="230px" class="mt-5">
              <v-list nav density="compact">
                <v-list-item prepend-icon="mdi-account" to="/perfil">
                  <v-list-item-title>Meu Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-logout" to="/logout">
                  <v-list-item-title>Sair</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>

      <v-navigation-drawer style="position: fixed;" v-model="isOpenSBar">
        <v-list>

          <v-list-group value="users">
            <template #activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-view-agenda" title="Opções">
              </v-list-item>
            </template>


            <v-list-item to="/consultas" prepend-icon="mdi-list-box-outline">
              <v-list-item-title>Consultas</v-list-item-title>
            </v-list-item>
            <v-list-item to="/agendar" prepend-icon="mdi-calendar-check">
              <v-list-item-title>Solicitar</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item to="/teste" prepend-icon="mdi-calendar-check">
              <v-list-item-title>teste</v-list-item-title>
            </v-list-item> -->
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { onBeforeMount, ref } from "vue";
import Notificacoes from '@/components/DashBoard/Notificacoes.vue'
import { useStore } from "vuex";
const theme = useTheme();
const isOpenSBar = ref(true);
const store = useStore();

const notificacoes = [
  { title: "notificacao 1" },
  { title: "notificacao 2" },
  { title: "notificacao 3" },
  { title: "notificacao 4" },
];
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? "ligth"
    : "dark";
}

const refresh = async () => {
  await store.dispatch('listarConsultasPaciente');
}



onBeforeMount(() => {



  try {
    store.dispatch('init')
    store.dispatch('clearMessage')

  } catch (error) {
    console.error(error)

  }

})
</script>
