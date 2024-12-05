

import axios from "axios";

type Props = {
  id: string;
  senha: string;
};

export async function AtualizarUsuarioSenha({ id, senha}: Props) {
  try {
    const response = await axios.post("https://10.21.39.75:4001/atualizarUsuarioSenha", { id, senha }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar senha do usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar  senha do usuario!", error);
    throw error;
  }
}