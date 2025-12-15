

import { api } from "../../../../services/api";

type Props = {
  id: string;
  avatar: string
};

export async function AtualizarUsuarioFoto({ id, avatar}: Props) {
  try {
    const response = await api.post("/atualizarUsuarioFoto", { id, avatar }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar avatar do usuario!", error);
    throw error;
  }
}