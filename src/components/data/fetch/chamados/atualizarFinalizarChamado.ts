



import axios from "axios";

type Props = {
  id: string
  statusId: string;
  finalizadoPor: string;
};

export async function AtualizarFinalizarChamado({ id, statusId, finalizadoPor }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75/atualizarFinalizarChamado", { id, statusId, finalizadoPor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em finalizar chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao finalizar chamado!", error);
    throw error;
  }
}