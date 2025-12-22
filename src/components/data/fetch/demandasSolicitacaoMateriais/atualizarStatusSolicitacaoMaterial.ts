



// import axios from "axios";

import { api } from "../../../../services/api";

type Props = {
  id: number
  statusDemandaId: string
};

export async function AtualizarStatusSolicitacaoMaterial({ id, statusDemandaId }: Props) {
  try {
    const response = await api.post("/atualizarStatusSolicitacaoMaterial", { id, statusDemandaId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar status Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar status SolicitacaoMaterial!", error);
    throw error;
  }
}