

import axios from "axios";

type Props = {
  descricao: string;
  tipoPatrimonioId: string;
  patrimonio: number;
  status: string
};

export async function CriarPatrimonio({ descricao, tipoPatrimonioId, patrimonio, status }: Props) {
  try {
    const response = await axios.post("/criarPatrimonio", { descricao, tipoPatrimonioId, patrimonio, status }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar tipo patrimonio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar tipo patrimonio!", error);
    throw error;
  }
}