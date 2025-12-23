



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: number
  statusDemandaId: string;
  finalizadoPor: string;
};

export async function AtualizarFinalizarSolicitacaoMaterial({ id, statusDemandaId, finalizadoPor }: Props) {
  try {
    const response = await api.post("/atualizarFinalizarDemandaMaterial", { id, statusDemandaId, finalizadoPor }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em finalizar demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao finalizar SolicitacaoMaterial!", error);
    throw error;
  }
}