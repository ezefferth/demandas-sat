

import axios from "axios";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarTipoPatrimonio({ id, nome }: Props) {
  try {
    const response = await axios.post("/atualizarTipoPatrimonioDemanda", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar tipo patrimonio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar tipo patrimonio!", error);
    throw error;
  }
}