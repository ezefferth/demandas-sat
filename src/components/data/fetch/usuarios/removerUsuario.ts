

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverUsuario({ id }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75/removerUsuario", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover usuario!", error);
    throw error;
  }
}