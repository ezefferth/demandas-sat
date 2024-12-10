

import axios from "axios";

type Props = {
  nome: string;
  cor: string;
};

export async function CriarStatus({ nome, cor }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75/criarStatus", { nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar status!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar status!", error);
    throw error;
  }
}