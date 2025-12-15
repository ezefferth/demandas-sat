


import { api } from "../../../../services/api";

type Props = {
  nome: string;
  cor: string;
};

export async function CriarPrioridade({ nome, cor }: Props) {
  try {
    const response = await api.post("/criarPrioridadeDemanda", { nome, cor }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar prioridade!", error);
    throw error;
  }
}