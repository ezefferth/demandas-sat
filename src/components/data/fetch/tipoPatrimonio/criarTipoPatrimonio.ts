

import axios from "axios";

type Props = {
  nome: string;
};

export async function CriarTipoPatrimonio({ nome }: Props) {
  try {
    const response = await axios.post("/criarTipoPatrimonioDemanda", { nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar tipo patrimonio!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar tipo patrimonio!", error);
    throw error;
  }
}