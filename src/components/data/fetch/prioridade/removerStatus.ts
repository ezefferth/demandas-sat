

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverPrioridade({ id }: Props) {
  try {
    const response = await axios.post("/removerPrioridade", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover prioridade!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover prioridade!", error);
    throw error;
  }
}