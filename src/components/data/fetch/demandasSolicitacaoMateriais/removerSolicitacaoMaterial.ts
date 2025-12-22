


import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverSolicitacaoMaterial({ id }: Props) {
  try {
    const response = await api.post("/removerSolicitacaoMaterial", { id }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em remover Demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover SolicitacaoMaterial!", error);
    throw error;
  }
}