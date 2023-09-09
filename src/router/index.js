import {
  createRouter,
  createWebHistory
}
  from "vue-router";

const routes =
  [
    {
      path: "/",
      redirect: "login",
    },

    {
      path: "/login",
      component: () => import("@/pages/login/Login"),
    },
    {
      path: "/criarConta",
      component: () => import("@/pages/CreateAccountPage.vue"),
    },
    {
      path: "/logout",
      component: () => import("@/pages/login/Logout"),
    },
    {
      path: "/dashBoard",
      component: () => import("@/pages/dashboard/Dashboard.vue"),
      children: [
        {
          path: "/inicio",
          component: () => import("@/pages/dashboard/Inicio.vue"),
        },

        {
          path: "/consultas",
          component: () => import("@/pages/dashboard/Consultas.vue"),
        },
        {
          path: "/agendar",
          component: () => import("@/pages/dashboard/AgendarConsulta.vue"),
        },

        {
          path: "/configuracoes",
          component: () => import("@/components/DashBoard/Configuracoes.vue"),
        },
        {
          path: "/perfil",
          component: () => import("@/components/DashBoard/Perfil.vue"),
        }
      ]
    }]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
