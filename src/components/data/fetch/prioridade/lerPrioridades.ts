

import axios from "axios";

import { Prioridade } from "../../../types";

type Props = {
  setPrioridades: (value: Array<Prioridade>) => void;
};

export async function LerPrioridades({ setPrioridades }: Props) {
  try {
    const response = await axios.get("/lerPrioridadesDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler prioridades!");
    setPrioridades(response.data);
  } catch (error) {
    console.log("Erro em ler prioridades!", error);
  }
}