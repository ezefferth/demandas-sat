


import { ComentarioSolicitacaoMaterial } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  solicitacaoId: number
  setComentariosSolicitacaoMaterial: (value: Array<ComentarioSolicitacaoMaterial>) => void;
};

export async function LerComentariosSolicitacaoMaterial({ setComentariosSolicitacaoMaterial, solicitacaoId }: Props) {
  try {
    const response = await api.post("/lerComentariosSolicitacaoMaterial", {
      solicitacaoId, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    setComentariosSolicitacaoMaterial(response.data);
  } catch (error) {
    console.log("Erro em ler comentarioSolicitacaoMaterial!", error);
  }
}