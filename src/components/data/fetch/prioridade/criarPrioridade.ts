

import axios from "axios";

type Props = {
  nome: string;
  cor: string;
};

export async function CriarPrioridade({ nome, cor }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/criarPrioridade", { nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar prioridade!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar prioridade!", error);
    throw error;
  }
}