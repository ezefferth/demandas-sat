

// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  assuntoId: string;
  usuarioId: string
  setorId: string;
  descricao: string;
};

export async function CriarDemanda({ assuntoId, usuarioId, descricao, setorId }: Props) {
  try {
    const response = await api.post("/criarDemanda", { assuntoId, usuarioId, descricao, setorId }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em criar Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar Demanda!", error);
    throw error;
  }
}