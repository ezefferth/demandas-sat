



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: string
  statusId: string;
  finalizadoPor: string;
};

export async function AtualizarFinalizarDemanda({ id, statusId, finalizadoPor }: Props) {
  try {
    const response = await api.post("/atualizarFinalizarDemanda", { id, statusId, finalizadoPor }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em finalizar demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao finalizar demanda!", error);
    throw error;
  }
}