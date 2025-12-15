

import { api } from "../../../../services/api";

type Props = {
  chamadoId: string;
  usuarioId: string
  comentario: string;
};

export async function CriarComentario({ chamadoId, usuarioId, comentario }: Props) {
  try {
    const response = await api.post("/criarComentarioDemanda", { chamadoId, usuarioId, comentario }, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log("Erro ao criar comentarioDemanda!", error);
    throw error;
  }
}