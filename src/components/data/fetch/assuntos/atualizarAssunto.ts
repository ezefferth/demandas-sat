

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  tempoLimite: number;
  categoriaId: string;
};

export async function AtualizarAssunto({ id, nome, categoriaId, tempoLimite }: Props) {
  try {
    const response = await axios.post("/atualizarAssunto", { id, nome, categoriaId, tempoLimite }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar assunto!", error);
    throw error;
  }
}