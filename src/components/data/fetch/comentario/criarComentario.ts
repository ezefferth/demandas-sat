

import { api } from "../../../../services/api";

type Props = {
  demandaId: string;
  usuarioId: string
  comentario: string;
};

export async function CriarComentario({ demandaId, usuarioId, comentario }: Props) {
  try {
    const response = await api.post("/criarComentarioDemanda", { demandaId, usuarioId, comentario }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar comentarioDemanda!", error);
    throw error;
  }
}