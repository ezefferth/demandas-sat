

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  cor: string;
};

export async function AtualizarPrioridade({ id, nome, cor }: Props) {
  try {
    const response = await axios.post("/atualizarPrioridadeDemanda", { id, nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar prioridade!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar prioridade!", error);
    throw error;
  }
}