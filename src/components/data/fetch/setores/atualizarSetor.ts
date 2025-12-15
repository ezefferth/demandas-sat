

import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  status: boolean;
  recebeAssunto: boolean;
};

export async function AtualizarSetor({ id, nome, status, recebeAssunto }: Props) {
  try {
    const response = await api.post("/atualizarSetor", { id, nome, status, recebeAssunto }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor!", error);
    throw error;
  }
}