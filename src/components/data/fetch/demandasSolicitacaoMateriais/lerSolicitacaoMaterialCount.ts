

// import axios from "axios";
import { api } from "../../../../services/api";


type Props = {
  setCountSolicitacaoMaterial: (value: number) => void;
};

export async function LerSolicitacaoMaterialCount({ setCountSolicitacaoMaterial }: Props) {
  try {
    const response = await api.post("/lerSolicitacaoMaterialCount", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em count comentarios!");
    setCountSolicitacaoMaterial(response.data);
    return response.data
  } catch (error) {
    console.log("Erro em count SolicitacaoMaterial!", error);
  }
}