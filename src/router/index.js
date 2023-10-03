import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";


const routes =
  [
    {
      path: "/",
      redirect: "login",
    },

    {
      path: "/login",
      name: "login",
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
      name: "dashboard",
      path: "/dashBoard",
      beforeEnter: (to, from, next) => {
        const autenticado = localStorage.getItem('token')
        if (autenticado) {
          next()
        } else {
          next('login')
        }
      },

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
