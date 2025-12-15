

import { api } from "../../../../services/api";

type Props = {
  id: string;
  senha: string;
};

export async function AtualizarUsuarioSenha({ id, senha}: Props) {
  try {
    const response = await api.post("/atualizarUsuarioSenha", { id, senha }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar  senha do usuario!", error);
    throw error;
  }
}