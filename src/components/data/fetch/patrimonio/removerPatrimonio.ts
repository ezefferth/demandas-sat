

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverPatrimonio({ id }: Props) {
  try {
    const response = await axios.post("/removerPatrimonio", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover patrimônio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover patrimônio!", error);
    throw error;
  }
}