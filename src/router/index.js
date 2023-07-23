import { createRouter, createWebHistory } from "vue-router"
import useAuthUser from "@/composables/UseAuthUser"

const routes = [
  {
    name: "EmailConfirmation",
    path: "/email-confirmation",
    component: () => import("@/pages/EmailConfirmation.vue"),
  },
  {
    name: "Home",
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "Me",
    meta: {
      requiresAuth: true,
    },
    path: "/me",
    component: () => import("@/pages/Me.vue"),
  },
  {
    name: "New",
    meta: {
      requiresAuth: true,
    },
    path: "/new",
    component: () => import("@/pages/New.vue"),
  },
  {
    name: "Solarium",
    path: "/:path",
    component: () => import("@/pages/Solarium.vue"),
    props: true,
  },
  {
    name: "Edit",
    meta: {
      requiresAuth: true,
    },
    path: "/e/:path",
    component: () => import("@/pages/Edit.vue"),
    props: true,
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    component: () => import("@/pages/ForgotPassword.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser()
      await logout()
      return { name: "Home" }
    },
  },
  {
    name: "Register",
    path: "/register",
    component: () => import("@/pages/Register.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  // here we check it the user is logged in
  // if they aren't and the route requries auth we redirect to the login page
  const { isLoggedIn } = useAuthUser()
  if (!isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes("fromEmail")) {
    return { name: "Login" }
  }
})

export default router
