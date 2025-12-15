


import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  nomeUsuario: string;
};

export async function AtualizarUsuarioDados({ id, nome, nomeUsuario}: Props) {
  try {
    const response = await api.post("/atualizarUsuarioDados", { id, nome, nomeUsuario }, {//arrumar aki
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao atualizar usuario!", error);
    throw error;
  }
}