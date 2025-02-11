

import axios from "axios";

type Props = {
  assuntoId: string;
  usuarioId: string
  setorId: string;
  descricao: string;
};

export async function CriarChamado({ assuntoId, usuarioId, descricao, setorId }: Props) {
  try {
    const response = await axios.post("/criarChamado", { assuntoId, usuarioId, descricao, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar chamado!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar chamado!", error);
    throw error;
  }
}