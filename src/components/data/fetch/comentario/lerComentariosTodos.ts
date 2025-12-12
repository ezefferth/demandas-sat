

import axios from "axios";

import { Comentario } from "../../../types";

type Props = {
  id: string;
  setComentariosTodos: (value: Array<Comentario>) => void;
};

export async function LerComentariosTodos({ setComentariosTodos, id }: Props) {
  try {
    const response = await axios.post("/lerComentariosTodosDemanda", {
      id, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler comentariosDemanda admin!");
    setComentariosTodos(response.data);
  } catch (error) {
    console.log("Erro em ler comentariosDemanda admin!", error);
  }
}