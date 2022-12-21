import { createApp } from "vue";
import App from "./App.vue";
import "./main_css.js"

export const backend_base_url = "http://localhost:3000"

const app = createApp(App)
app.mount("#app")
