

import axios from "axios";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarSetor({ id, nome }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75/atualizarSetor", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor!", error);
    throw error;
  }
}