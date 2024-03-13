import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/login/Login"),
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem("token");
      if (isAuthenticated) {
        next("/dashboard");
      } else {
        next();
      }
    },
  },
  {
    path: "/criarConta",
    name: "criarConta",
    component: () => import("@/pages/criarConta.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/pages/login/Logout"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/dashboard/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/teste",
        name: "testeWindow",
        component: () => import("@/components/testes/testeWindow.vue"),
      },
      {
        path: "/consultas",
        name: "consultas",
        component: () => import("@/pages/dashboard/Consultas.vue"),
      },
      {
        path: "/agendar",
        name: "agendar",
        component: () => import("@/pages/dashboard/SolicitarConsulta.vue"),
      },

      {
        path: "/perfil",
        name: "perfil",
        component: () => import("@/components/DashBoard/Perfil.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
