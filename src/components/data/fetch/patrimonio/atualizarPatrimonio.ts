


import { api } from "../../../../services/api";

type Props = {
  id: string;
  descricao: string;
  tipoPatrimonioId: string;
  patrimonio: number;
  status: string,
  setorId: string
};

export async function AtualizarPatrimonio({ id, descricao, tipoPatrimonioId, patrimonio, status, setorId }: Props) {
  try {
    const response = await api.post("/atualizarPatrimonioDemanda", { id, descricao, tipoPatrimonioId, patrimonio, status, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar patrimônio!", error);
    throw error;
  }
}