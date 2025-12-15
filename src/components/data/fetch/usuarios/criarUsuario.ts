

import { api } from "../../../../services/api";

type Props = {
  nome: string;
  nomeUsuario: string;
  senha: string;
  admin: boolean;
};

export async function CriarUsuario({ nome, nomeUsuario, senha, admin }: Props) {
  try {
    const response = await api.post("/criarUsuario", { nome, nomeUsuario, admin, senha }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar usuario!", error);
    throw error;
  }
}