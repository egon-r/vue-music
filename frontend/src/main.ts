import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./main_css.js"
import Home from "@/routes/Home.vue"
import Library from "@/routes/Library.vue"
import Settings from "./routes/Settings.vue"

const backendHost = "192.168.0.2:3000"

const routes = [
  { path: "/", component: Home },
  { path: "/library", component: Library },
  { path: "/settings", component: Settings }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const app = createApp(App)
app.use(router)
app.mount("#app")
