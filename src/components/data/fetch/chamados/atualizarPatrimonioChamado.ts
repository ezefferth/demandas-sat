



import axios from "axios";

type Props = {
  id: string
  patrimonioId: string
};

export async function AtualizarPatrimonioChamado({ id, patrimonioId }: Props) {
  try {
    const response = await axios.post("/atualizarPatrimonioChamado", { id, patrimonioId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar patrimonio chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar patrimonio chamado!", error);
    throw error;
  }
}