import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./main_css.js"
import Home from "@/routes/Home.vue"
import Library from "@/routes/Library.vue"
import Admin from "@/routes/Admin.vue"


const backendHost = "192.168.0.2:3000"

const routes = [
  { path: "/", component: Home },
  { path: "/library", component: Library },
  { path: "/admin", component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const app = createApp(App)
app.use(router)
app.config.globalProperties.$backendHost = backendHost
app.config.globalProperties.$backendBaseUrl = "http://" + backendHost
app.mount("#app")
