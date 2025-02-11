

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverStatus({ id }: Props) {
  try {
    const response = await axios.post("/removerStatus", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover status!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover status!", error);
    throw error;
  }
}