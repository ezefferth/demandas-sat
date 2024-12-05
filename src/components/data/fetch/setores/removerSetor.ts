

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverSetor({ id }: Props) {
  try {
    const response = await axios.post("/api/removerSetor", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover setor!", error);
    throw error;
  }
}