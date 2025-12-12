

import axios from "axios";

type Props = {
  assuntoId: string;
  usuarioId: string
  setorId: string;
  descricao: string;
};

export async function CriarChamado({ assuntoId, usuarioId, descricao, setorId }: Props) {
  try {
    const response = await axios.post("/criarDemanda", { assuntoId, usuarioId, descricao, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar Demanda!", error);
    throw error;
  }
}