



import axios from "axios";

type Props = {
  id: string
  setorId: string
};

export async function AtualizarSetorChamado({ id, setorId }: Props) {
  try {
    const response = await axios.post("/atualizarSetorChamado", { id, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar setor chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor chamado!", error);
    throw error;
  }
}