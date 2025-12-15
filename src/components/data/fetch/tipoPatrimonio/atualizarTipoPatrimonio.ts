

import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarTipoPatrimonio({ id, nome }: Props) {
  try {
    const response = await api.post("/atualizarTipoPatrimonioDemanda", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar tipo patrimonio!", error);
    throw error;
  }
}