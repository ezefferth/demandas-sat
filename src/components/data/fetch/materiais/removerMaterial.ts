

// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverMaterial({ id }: Props) {
  try {
    const response = await api.post("/removerMaterial", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em remover assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover assunto!", error);
    throw error;
  }
}