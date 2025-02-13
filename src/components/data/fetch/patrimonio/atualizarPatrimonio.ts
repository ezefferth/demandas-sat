

import axios from "axios";

type Props = {
  id: string;
  descricao: string;
  tipoPatrimonioId: string;
  patrimonio: number;
  status: string
};

export async function AtualizaPatrimonio({ id, descricao, tipoPatrimonioId, patrimonio, status }: Props) {
  try {
    const response = await axios.post("/atualizarPatrimonio", { id, descricao, tipoPatrimonioId, patrimonio, status }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar patrimônio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar patrimônio!", error);
    throw error;
  }
}