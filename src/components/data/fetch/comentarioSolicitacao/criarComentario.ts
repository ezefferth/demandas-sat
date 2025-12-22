

import { api } from "../../../../services/api";

type Props = {
  solicitacaoId: number;
  usuarioId: string
  comentario: string;
};

export async function CriarComentarioSolicitacaoMaterial({ solicitacaoId, usuarioId, comentario }: Props) {
  try {
    const response = await api.post("/criarComentarioSolicitacaoMaterial", { solicitacaoId, usuarioId, comentario }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar comentarioDemanda!", error);
    throw error;
  }
}