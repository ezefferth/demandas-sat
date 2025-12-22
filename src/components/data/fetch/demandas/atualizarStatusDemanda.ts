



// import axios from "axios";

import { api } from "../../../../services/api";

type Props = {
  id: string
  statusId: string
};

export async function AtualizarStatusDemanda({ id, statusId }: Props) {
  try {
    const response = await api.post("/atualizarStatusNaDemanda", { id, statusId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar status Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar status Demanda!", error);
    throw error;
  }
}