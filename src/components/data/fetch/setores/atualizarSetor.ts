

import axios from "axios";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarSetor({ id, nome }: Props) {
  try {
    const response = await axios.post("/api/atualizarSetor", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor!", error);
    throw error;
  }
}