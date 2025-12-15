



import { Prioridade } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setPrioridades: (value: Array<Prioridade>) => void;
};

export async function LerPrioridades({ setPrioridades }: Props) {
  try {
    const response = await api.get("/lerPrioridadesDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    setPrioridades(response.data);
  } catch (error) {
    console.log("Erro em ler prioridades!", error);
  }
}