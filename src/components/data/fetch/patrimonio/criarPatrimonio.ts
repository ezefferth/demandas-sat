


import { api } from "../../../../services/api";

type Props = {
  descricao: string;
  tipoPatrimonioId: string;
  patrimonio: number | null;
  status: string
  setorId: string
};

export async function CriarPatrimonio({ descricao, tipoPatrimonioId, patrimonio, status, setorId }: Props) {
  try {
    const response = await api.post("/criarPatrimonioDemanda", { descricao, tipoPatrimonioId, patrimonio, status, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar patrimonio!", error);
    throw error;
  }
}