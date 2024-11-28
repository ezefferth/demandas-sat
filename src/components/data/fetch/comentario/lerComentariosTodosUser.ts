

import axios from "axios";

import { Comentario } from "../../../types";

type Props = {
  id: string;
  setComentariosTodos: (value: Array<Comentario>) => void;
};

export async function LerComentariosTodosUser({ setComentariosTodos, id }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/lerComentariosTodosUser", {
      id, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler comentarios do usuario!");
    setComentariosTodos(response.data);
  } catch (error) {
    console.log("Erro em ler comentario do usuario!", error);
  }
}