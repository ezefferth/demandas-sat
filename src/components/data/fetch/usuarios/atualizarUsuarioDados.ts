

import axios from "axios";

type Props = {
  id: string;
  nome: string;
  nomeUsuario: string;
};

export async function AtualizarUsuarioDados({ id, nome, nomeUsuario}: Props) {
  try {
    const response = await axios.post("/api/atualizarUsuarioDados", { id, nome, nomeUsuario }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar usuario!", error);
    throw error;
  }
}