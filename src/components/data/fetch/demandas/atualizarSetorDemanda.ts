



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: string
  setorId: string
};

export async function AtualizarSetorDemanda({ id, setorId }: Props) {
  try {
    const response = await api.post("/atualizarSetorDemanda", { id, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar setor Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor Demanda!", error);
    throw error;
  }
}