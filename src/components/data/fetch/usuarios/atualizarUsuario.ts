

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  nomeUsuario: string;
  senha: string;
  admin: boolean;
};

export async function AtualizarUsuario({ id, nome, nomeUsuario, senha, admin }: Props) {
  try {
    const response = await axios.post("/atualizarUsuario", { id, nome, nomeUsuario, senha, admin }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar usuario!", error);
    throw error;
  }
}