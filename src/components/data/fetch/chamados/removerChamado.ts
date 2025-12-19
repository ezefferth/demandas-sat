


import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverDemanda({ id }: Props) {
  try {
    const response = await api.post("/removerDemanda", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em remover Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover Demanda!", error);
    throw error;
  }
}