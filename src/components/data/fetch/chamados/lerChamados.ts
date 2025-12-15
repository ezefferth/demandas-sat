

// import axios from "axios";

import { api } from "../../../../services/api";
import { Chamado } from "../../../types";

type Props = {
  setChamados: (value: Array<Chamado>) => void;
};

export async function LerChamados({ setChamados }: Props) {
  try {
    const response = await api.get("/lerDemandas", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler Demandas!");
    setChamados(response.data);
  } catch (error) {
    console.log("Erro em ler Demandas!", error);
  }
}