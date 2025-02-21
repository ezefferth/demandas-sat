



import axios from "axios";

type Props = {
  id: string
  patrimonioId: string
};

export async function AtualizarRemoverPatrimonioChamado({ id, patrimonioId }: Props) {
  try {
    const response = await axios.post("/atualizarRemoverPatrimonioChamado", { id, patrimonioId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar patrimonio chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar patrimonio chamado!", error);
    throw error;
  }
}