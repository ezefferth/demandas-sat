

import axios from "axios";

type Props = {
  descricao: string;
  tipoPatrimonioId: string;
  patrimonio: number | null;
  status: string
  setorId: string
};

export async function CriarPatrimonio({ descricao, tipoPatrimonioId, patrimonio, status, setorId }: Props) {
  try {
    const response = await axios.post("/criarPatrimonio", { descricao, tipoPatrimonioId, patrimonio, status, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar patrimonio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar patrimonio!", error);
    throw error;
  }
}