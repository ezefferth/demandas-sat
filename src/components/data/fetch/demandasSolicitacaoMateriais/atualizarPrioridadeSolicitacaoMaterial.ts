



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: number
  prioridadeId: string
};

export async function AtualizarPrioridadeSolicitacaoMaterial({ id, prioridadeId }: Props) {
  try {
    const response = await api.post("/atualizarPrioridadeSolicitacaoMaterial", { id, prioridadeDemandaId: prioridadeId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar prioridade Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar prioridade SolicitacaoMaterial!", error);
    throw error;
  }
}