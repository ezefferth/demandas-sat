



import axios from "axios";

type Props = {
  id: string
  statusId: string;
  finalizadoPor: string;
};

export async function AtualizarFinalizarChamado({ id, statusId, finalizadoPor }: Props) {
  try {
    const response = await axios.post("/atualizarFinalizarNaDemanda", { id, statusId, finalizadoPor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em finalizar demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao finalizar demanda!", error);
    throw error;
  }
}