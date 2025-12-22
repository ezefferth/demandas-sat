

import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverComentario({ id }: Props) {
  try {
    const response = await api.post("/removerComentarioDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover comentarioDemanda!", error);
    throw error;
  }
}