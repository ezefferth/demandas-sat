



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: number
  setorId: string
};

export async function AtualizarSetorSolicitacaoMaterial({ id, setorId }: Props) {
  try {
    const response = await api.post("/atualizarSetorSolicitacaoMaterial", { id, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar setor Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor SolicitacaoMaterial!", error);
    throw error;
  }
}