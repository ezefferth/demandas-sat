



import { Comentario } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  id: string;
  setComentariosTodos: (value: Array<Comentario>) => void;
};

export async function LerComentariosTodos({ setComentariosTodos, id }: Props) {
  try {
    const response = await api.post("/lerComentariosTodosDemanda", {
      id, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    setComentariosTodos(response.data);
  } catch (error) {
    console.log("Erro em ler comentariosDemanda admin!", error);
  }
}