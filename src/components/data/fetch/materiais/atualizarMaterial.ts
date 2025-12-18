// import axios from "axios";
import { api } from "../../../../services/api";
import { TipoMaterial } from "../../../types";

type Props = {
  id: string;
  nome: string;
  descricao: string | null;
  tipo: TipoMaterial;
  unidade: string;
  qtd: number;
  qtdBetha: number | null;
  ativo: boolean
};

export async function AtualizarMaterial({
  id,
  nome,
  descricao,
  tipo,
  unidade,
  qtd,
  qtdBetha,
  ativo
}: Props) {
  try {
    const response = await api.post(
      "/atualizarMaterial",
      {
        id,
        nome,
        descricao,
        tipo,
        unidade,
        qtd,
        qtdBetha,
        ativo
      },
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
