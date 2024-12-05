

import axios from "axios";

type Props = {
  id: string;
  avatar: Base64URLString
};

export async function AtualizarUsuarioFoto({ id, avatar}: Props) {
  try {
    const response = await axios.post("https://10.21.39.75:4001/atualizarUsuarioFoto", { id, avatar }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar avatar do usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar avatar do usuario!", error);
    throw error;
  }
}