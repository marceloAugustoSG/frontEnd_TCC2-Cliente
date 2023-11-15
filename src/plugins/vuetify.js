
// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VuetifyDateAdapter } from "vuetify/labs/date/adapters/vuetify";
import { VStepper } from 'vuetify/labs/VStepper'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const ligth = {
  dark: false,
  colors: {
    background: "#F7F7F7",
    surface: "#EEE",
    primary: "#0D3E6D",
    secundary: "#12AF83",
    "primary-darken-1": "#0D3E6D",
    "secondary-darken-1": "#018786",
    'hover': '#C47070',
    error: "#F3022E",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4CAF50"
  },
};
const dark = {
  colors: {
    background: "#333333",
    surface: "#333333",
    primary: "#0D3E6D",
    secundary: "#12AF83",
    "primary-darken-1": "#0D3E6D",
    "secondary-darken-1": "#018786",
    'hover': '#FFD700',
    error: "#F3022E",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4CAF50",
  },
};

export default createVuetify({
  date: {
    adapter: VuetifyDateAdapter,
  },
  components: {
    VStepper,
  },

  theme: {
    defaultTheme: "dark",
    themes: {
      ligth,
      dark,
    },
  },
});
