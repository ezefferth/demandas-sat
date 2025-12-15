


import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  cor: string;
};

export async function AtualizarPrioridade({ id, nome, cor }: Props) {
  try {
    const response = await api.post("/atualizarPrioridadeDemanda", { id, nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar prioridade!", error);
    throw error;
  }
}