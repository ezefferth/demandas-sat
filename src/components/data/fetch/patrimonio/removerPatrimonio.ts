

import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverPatrimonio({ id }: Props) {
  try {
    const response = await api.post("/removerPatrimonioDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover patrimônio!", error);
    throw error;
  }
}