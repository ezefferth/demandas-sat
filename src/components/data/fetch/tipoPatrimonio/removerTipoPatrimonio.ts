

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverTipoPatrimonio({ id }: Props) {
  try {
    const response = await axios.post("/removerTipoPatrimonioDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover tipo patrimônio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover tipo patrimônio!", error);
    throw error;
  }
}