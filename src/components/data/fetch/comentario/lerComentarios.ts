

import axios from "axios";

import { Comentario } from "../../../types";

type Props = {
  chamadoId: string
  setComentarios: (value: Array<Comentario>) => void;
};

export async function LerComentarios({ setComentarios, chamadoId }: Props) {
  try {
    const response = await axios.post("https://10.21.39.75/lerComentarios", {
      chamadoId, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler comentario!");
    setComentarios(response.data);
  } catch (error) {
    console.log("Erro em ler comentario!", error);
  }
}