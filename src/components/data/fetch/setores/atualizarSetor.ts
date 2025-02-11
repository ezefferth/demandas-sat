

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  status: boolean;
};

export async function AtualizarSetor({ id, nome, status }: Props) {
  try {
    const response = await axios.post("/atualizarSetor", { id, nome, status }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor!", error);
    throw error;
  }
}