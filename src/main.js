/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import "@vuepic/vue-datepicker/dist/main.css";


// Composables
import {
  createApp
} from "vue";

// Plugins
import {
  registerPlugins
} from "@/plugins";

const app = createApp(App);
registerPlugins(app);
//app.config.globalProperties.isDark = theme.global.current.value.dark
app.mount("#app");
