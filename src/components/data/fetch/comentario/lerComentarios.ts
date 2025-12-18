


import { Comentario } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  demandaId: number
  setComentarios: (value: Array<Comentario>) => void;
};

export async function LerComentarios({ setComentarios, demandaId }: Props) {
  try {
    const response = await api.post("/lerComentariosDemanda", {
      demandaId, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    setComentarios(response.data);
  } catch (error) {
    console.log("Erro em ler comentarioDemanda!", error);
  }
}