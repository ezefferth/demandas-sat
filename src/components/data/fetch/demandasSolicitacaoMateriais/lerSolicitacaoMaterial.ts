

// import axios from "axios";

import { api } from "../../../../services/api";
import { SolicitacaoMaterial } from "../../../types";

type Props = {
  setSolicitacaoMaterial: (value: Array<SolicitacaoMaterial>) => void;
};

export async function LerSolicitacaoMateriais({ setSolicitacaoMaterial }: Props) {
  try {
    const response = await api.get("/lerDemandasMaterial", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler Demandas!");
    setSolicitacaoMaterial(response.data);
  } catch (error) {
    console.log("Erro em ler SolicitacaoMaterial!", error);
  }
}