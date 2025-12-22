



// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: string
  patrimonioId: string
};

export async function AtualizarRemoverPatrimonioDemanda({ id, patrimonioId }: Props) {
  try {
    const response = await api.post("/atualizarRemoverPatrimonioDemanda", { id, patrimonioId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em atualizar patrimonio Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar patrimonio Demanda!", error);
    throw error;
  }
}