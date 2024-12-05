

import axios from "axios";

type Props = {
  nome: string;
  categoriaId: string
  tempoLimite: number;
};

export async function CriarAssunto({ nome, categoriaId, tempoLimite }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75:4001/criarAssunto", { nome, categoriaId, tempoLimite }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar assunto!", error);
    throw error;
  }
}