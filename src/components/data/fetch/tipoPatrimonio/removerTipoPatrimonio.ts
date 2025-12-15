

import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverTipoPatrimonio({ id }: Props) {
  try {
    const response = await api.post("/removerTipoPatrimonioDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover tipo patrimônio!", error);
    throw error;
  }
}