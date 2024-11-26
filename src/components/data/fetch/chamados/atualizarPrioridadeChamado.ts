



import axios from "axios";

type Props = {
  id: string
  prioridadeId: string
};

export async function AtualizarPrioridadeChamado({ id, prioridadeId }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/atualizarPrioridadeChamado", { id, prioridadeId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar prioridade chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar prioridade chamado!", error);
    throw error;
  }
}