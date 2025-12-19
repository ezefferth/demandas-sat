

// import axios from "axios";

import { api } from "../../../../services/api";
import { Demanda } from "../../../types";

type Props = {
  setDemandas: (value: Array<Demanda>) => void;
};

export async function LerDemandas({ setDemandas }: Props) {
  try {
    const response = await api.get("/lerDemandas", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler Demandas!");
    setDemandas(response.data);
  } catch (error) {
    console.log("Erro em ler Demandas!", error);
  }
}