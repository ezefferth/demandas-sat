

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverCategoria({ id }: Props) {
  try {
    const response = await axios.post("/removerCategoria", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover categoria!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover categoria!", error);
    throw error;
  }
}