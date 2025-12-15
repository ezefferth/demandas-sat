

import { api } from "../../../../services/api";

type Props = {
  nome: string;
  cor: string;
};

export async function CriarStatus({ nome, cor }: Props) {
  try {
    const response = await api.post("/criarStatusDemanda", { nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar status!", error);
    throw error;
  }
}