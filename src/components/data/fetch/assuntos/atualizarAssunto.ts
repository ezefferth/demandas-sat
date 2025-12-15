// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  tempoLimite: number;
  categoriaId: string;
  setorId: string;
};

export async function AtualizarAssunto({
  id,
  nome,
  categoriaId,
  tempoLimite,
  setorId,
}: Props) {
  try {
    const response = await api.post(
      "/atualizarAssuntoDemanda",
      { id, nome, categoriaId, tempoLimite, setorId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("Sucesso em atualizar assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar assunto!", error);
    throw error;
  }
}
