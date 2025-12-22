



import { ComentarioSolicitacaoMaterial } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  id: string;
  setComentariosTodosSolicitacaoMaterial: (value: Array<ComentarioSolicitacaoMaterial>) => void;
};

export async function LerComentariosTodosSolicitacaoMaterial({ setComentariosTodosSolicitacaoMaterial, id }: Props) {
  try {
    const response = await api.post("/lerComentariosTodosSolicitacaoMaterial", {
      id, // Envia o ID no corpo da requisição
    }, {
      headers: { "Content-Type": "application/json" },
    });
    setComentariosTodosSolicitacaoMaterial(response.data);
  } catch (error) {
    console.log("Erro em ler SolicitacaoMaterial admin!", error);
  }
}