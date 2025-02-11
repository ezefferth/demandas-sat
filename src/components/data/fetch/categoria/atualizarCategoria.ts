

import axios from "axios";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarCategoria({ id, nome }: Props) {
  try {
    const response = await axios.post("/atualizarCategoria", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar categoria!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar categoria!", error);
    throw error;
  }
}