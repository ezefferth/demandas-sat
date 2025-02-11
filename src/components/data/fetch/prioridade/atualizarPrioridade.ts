

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  cor: string;
};

export async function AtualizarStatus({ id, nome, cor }: Props) {
  try {
    const response = await axios.post("/atualizarStatus", { id, nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar status!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar status!", error);
    throw error;
  }
}