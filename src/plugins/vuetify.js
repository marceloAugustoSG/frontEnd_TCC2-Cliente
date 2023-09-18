
// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VuetifyDateAdapter } from "vuetify/labs/date/adapters/vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const ligth = {
  dark: false,
  colors: {
    background: "#f7f7f7",
    surface: "#eeeeee",
    primary: "#0D3E6D",
    "primary-darken-1": "#0D3E6D",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    'hover': '#c47070',
    error: "#f3022e",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};
const dark = {
  colors: {
    background: "#333333",
    surface: "#333333",
    primary: "#0D3E6D",
    "primary-darken-1": "#0D3E6D",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#f3022e",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4caf50",
  },
};

export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },

  theme: {
    defaultTheme: "dark",
    themes: {
      ligth,
      dark,
    },
  },
});
