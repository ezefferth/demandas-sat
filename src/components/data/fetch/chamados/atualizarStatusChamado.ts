



import axios from "axios";

type Props = {
  id: string
  statusId: string
};

export async function AtualizarStatusChamado({ id, statusId }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75:4001/atualizarStatusChamado", { id, statusId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar status chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar status chamado!", error);
    throw error;
  }
}