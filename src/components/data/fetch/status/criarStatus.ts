

import axios from "axios";

type Props = {
  nome: string;
  cor: string;
};

export async function CriarStatus({ nome, cor }: Props) {
  try {
    const response = await axios.post("/criarStatusDemanda", { nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar status!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar status!", error);
    throw error;
  }
}