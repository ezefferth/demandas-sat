


import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverPrioridade({ id }: Props) {
  try {
    const response = await api.post("/removerPrioridadeDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover prioridade!", error);
    throw error;
  }
}