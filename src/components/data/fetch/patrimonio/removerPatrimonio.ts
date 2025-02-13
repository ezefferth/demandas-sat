

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverPatrimonio({ id }: Props) {
  try {
    const response = await axios.post("/patrimonio", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover tipo patrimônio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover tipo patrimônio!", error);
    throw error;
  }
}