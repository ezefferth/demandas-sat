


import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  cor: string;
};

export async function AtualizarStatus({ id, nome, cor }: Props) {
  try {
    const response = await api.post("/atualizarStatusDemanda", { id, nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar status!", error);
    throw error;
  }
}