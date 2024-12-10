

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverSetor({ id }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75/removerSetor", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover setor!", error);
    throw error;
  }
}