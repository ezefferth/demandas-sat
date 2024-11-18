

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  categoriaId: string;
};

export async function AtualizarAssunto({ id, nome, categoriaId }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/atualizarAssunto", { id, nome, categoriaId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar assunto!", error);
    throw error;
  }
}