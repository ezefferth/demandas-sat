

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverComentario({ id }: Props) {
  try {
    const response = await axios.post("/removerComentario", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover comentario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover comentario!", error);
    throw error;
  }
}