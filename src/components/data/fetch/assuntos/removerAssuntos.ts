

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverAssunto({ id }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75:4001/removerAssunto", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover assunto!", error);
    throw error;
  }
}