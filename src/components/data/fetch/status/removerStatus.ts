

import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverStatus({ id }: Props) {
  try {
    const response = await api.post("/removerStatusDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover status!", error);
    throw error;
  }
}