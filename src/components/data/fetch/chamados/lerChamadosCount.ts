

// import axios from "axios";
import { api } from "../../../../services/api";


type Props = {
  setCountDemanda: (value: number) => void;
};

export async function LerDemandasCount({ setCountDemanda }: Props) {
  try {
    const response = await api.post("/lerDemandasCount", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em count comentarios!");
    setCountDemanda(response.data);
    return response.data
  } catch (error) {
    console.log("Erro em count Demandas!", error);
  }
}