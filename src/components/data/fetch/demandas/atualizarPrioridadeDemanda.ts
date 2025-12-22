



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: string
  prioridadeId: string
};

export async function AtualizarPrioridadeDemanda({ id, prioridadeId }: Props) {
  try {
    const response = await api.post("/atualizarPrioridadeNaDemanda", { id, prioridadeId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar prioridade Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar prioridade Demanda!", error);
    throw error;
  }
}