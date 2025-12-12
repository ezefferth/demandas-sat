

import axios from "axios";


type Props = {
  id: string
  setCountComentario: (value: number) => void;
};

export async function LerComentariosCount({ setCountComentario, id }: Props) {
  try {
    const response = await axios.post("/lerComentariosCountDemanda", { id }, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em count comentarios!");
    setCountComentario(response.data);
    return response.data
  } catch (error) {
    console.log("Erro em count comentariosDemanda!", error);
  }
}