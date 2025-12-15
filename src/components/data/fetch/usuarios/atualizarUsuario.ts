import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  nomeUsuario: string;
  senha: string;
  admin: boolean;
  status?: boolean; // Adicionando status como opcional
};

export async function AtualizarUsuario({
  id,
  nome,
  nomeUsuario,
  senha,
  admin,
  status,
}: Props) {
  try {
    const response = await api.post(
      "/atualizarUsuario",
      { id, nome, nomeUsuario, senha, admin, status },
      {
        //arrumar aki
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.log("Erro ao atualizar usuario!", error);
    throw error;
  }
}
