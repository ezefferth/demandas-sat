


import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverUsuario({ id }: Props) {
  try {
    const response = await api.post("/removerUsuario", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover usuario!", error);
    throw error;
  }
}