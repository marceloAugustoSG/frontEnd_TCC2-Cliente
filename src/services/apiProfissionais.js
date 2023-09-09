import { http } from "./axiosConfig";

export default {
  criar: (data) => {
    return http.post("profissional", data);
  },
  listar: () => {
    return http.get("profissionais");
  },
};
