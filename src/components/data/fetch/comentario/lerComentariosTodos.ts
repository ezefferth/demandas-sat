

import axios from "axios";

import { Comentario } from "../../../types";

type Props = {
  id: string;
  setComentariosTodos: (value: Array<Comentario>) => void;
};

export async function LerComentariosTodos({ setComentariosTodos, id }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/lerComentariosTodos", {
      id, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler comentarios admin!");
    setComentariosTodos(response.data);
  } catch (error) {
    console.log("Erro em ler comentarios admin!", error);
  }
}