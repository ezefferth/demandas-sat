

import { api } from "../../../../services/api";

type Props = {
  nome: string;
};

export async function CriarTipoPatrimonio({ nome }: Props) {
  try {
    const response = await api.post("/criarTipoPatrimonioDemanda", { nome }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar tipo patrimonio!", error);
    throw error;
  }
}