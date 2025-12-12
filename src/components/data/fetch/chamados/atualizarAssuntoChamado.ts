



import axios from "axios";

type Props = {
  id: string
  assuntoId: string
};

export async function AtualizarAssuntoChamado({ id, assuntoId }: Props) {
  try {
    const response = await axios.post("/atualizarAssuntoNaDemanda", { id, assuntoId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar assunto Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar assunto Demanda!", error);
    throw error;
  }
}