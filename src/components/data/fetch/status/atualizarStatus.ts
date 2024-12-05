

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  cor: string;
};

export async function AtualizarPrioridade({ id, nome, cor }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75:4001/atualizarPrioridade", { id, nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar prioridade!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar prioridade!", error);
    throw error;
  }
}