

import axios from "axios";

type Props = {
  nome: string;
  nomeUsuario: string;
  senha: string;
  admin: boolean;
};

export async function CriarUsuario({ nome, nomeUsuario, senha, admin }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/criarUsuario", { nome, nomeUsuario, admin, senha }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar usuario!", error);
    throw error;
  }
}