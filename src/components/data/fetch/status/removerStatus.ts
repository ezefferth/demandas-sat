

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverStatus({ id }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/removerStatus", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover status!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover status!", error);
    throw error;
  }
}