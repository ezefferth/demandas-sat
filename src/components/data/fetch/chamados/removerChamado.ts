

import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverChamado({ id }: Props) {
  try {
    const response = await axios.post("/removerDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em remover Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover Demanda!", error);
    throw error;
  }
}