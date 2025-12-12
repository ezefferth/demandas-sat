

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverComentario({ id }: Props) {
  try {
    const response = await axios.post("/removerComentarioDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover comentarioDemanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover comentarioDemanda!", error);
    throw error;
  }
}