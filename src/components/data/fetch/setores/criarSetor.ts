


import { api } from "../../../../services/api";

type Props = {
  nome: string;
  recebeAssunto: boolean;
};

export async function CriarSetor({ nome, recebeAssunto }: Props) {
  try {
    const response = await api.post("/criarSetor", { nome, recebeAssunto }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar setor!", error);
    throw error;
  }
}