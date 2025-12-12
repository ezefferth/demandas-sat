



import axios from "axios";

type Props = {
  id: string
  patrimonioId: string
};

export async function AtualizarPatrimonioChamado({ id, patrimonioId }: Props) {
  try {
    const response = await axios.post("/atualizarPatrimonioNaDemanda", { id, patrimonioId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar patrimonio Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar patrimonio Demanda!", error);
    throw error;
  }
}