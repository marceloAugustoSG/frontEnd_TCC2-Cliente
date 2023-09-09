import { http } from "./axiosConfig";

export default {
  listar: () => {
    return http.get("pacientes");
  },
};
