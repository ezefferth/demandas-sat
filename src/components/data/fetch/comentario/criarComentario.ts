

import axios from "axios";

type Props = {
  chamadoId: string;
  usuarioId: string
  comentario: string;
};

export async function CriarComentario({ chamadoId, usuarioId, comentario }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/criarComentario", { chamadoId, usuarioId, comentario }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar comentario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar comentario!", error);
    throw error;
  }
}