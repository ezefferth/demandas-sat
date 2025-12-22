

import { SolicitacaoMaterial } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setSolicitacaoMaterialUser: (value: Array<SolicitacaoMaterial>) => void;
  id: string
};

export async function LerSolicitacaoMaterialUser({ setSolicitacaoMaterialUser, id }: Props) {
  try {
    const response = await api.post("/lerDemandasMaterialUser", { id }, {

      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler Demanda do usuário!");
    setSolicitacaoMaterialUser(response.data);
  } catch (error) {
    console.log("Erro em ler SolicitacaoMaterial do usuário!", error);
  }
}