

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverChamado({ id }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/removerChamado", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover chamado!", error);
    throw error;
  }
}