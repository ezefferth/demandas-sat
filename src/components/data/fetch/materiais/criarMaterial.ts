// import axios from "axios";
import { api } from "../../../../services/api";
import { TipoMaterial } from "../../../types";

type Props = {
  nome: string;
  descricao: string | null;
  tipo: TipoMaterial;
  unidade: string;
  qtd: number;
  qtdBetha: number | null;
  ativo: boolean
};

export async function CriarMaterial({
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
      "/criarMaterial",
      {
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
    // console.log("Sucesso em criar assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar assunto!", error);
    throw error;
  }
}

