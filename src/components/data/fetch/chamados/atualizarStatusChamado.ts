



import axios from "axios";

type Props = {
  id: string
  statusId: string
};

export async function AtualizarStatusChamado({ id, statusId }: Props) {
  try {
    const response = await axios.post("/atualizarStatusNaDemanda", { id, statusId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar status Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar status Demanda!", error);
    throw error;
  }
}