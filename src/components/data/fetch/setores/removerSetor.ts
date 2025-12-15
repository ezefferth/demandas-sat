


import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverSetor({ id }: Props) {
  try {
    const response = await api.post("/removerSetor", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao remover setor!", error);
    throw error;
  }
}