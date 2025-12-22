

import { api } from "../../../../services/api";


export type ItemSolicitacaoPayload = {
  materialId: string;
  qtdSolicitada: number;
};

type Props = {
  setorId: string;
  usuarioId: string
  descricao: string;
  // statusDemandaId: string;
  itens: ItemSolicitacaoPayload[]
};

export async function CriarDemandaMaterial({ itens, /* statusDemandaId, */ usuarioId, descricao, setorId }: Props) {
  try {
    const response = await api.post("/criarDemandaMaterial", {
      itens,
      // statusDemandaId,
      usuarioId,
      descricao,
      setorId
    }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar demanda!", error);
    throw error;
  }
}