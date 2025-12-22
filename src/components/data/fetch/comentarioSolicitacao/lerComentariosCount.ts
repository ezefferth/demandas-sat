


import { api } from "../../../../services/api";


type Props = {
  id: string
  setCountSolicitacaoMaterial: (value: number) => void;
};

export async function LerComentariosSolicitacaoMaterialCount({ setCountSolicitacaoMaterial, id }: Props) {
  try {
    const response = await api.post("/lerComentariosCountDemanda", { id }, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em count comentarios!");
    setCountSolicitacaoMaterial(response.data);
    return response.data
  } catch (error) {
    console.log("Erro em count comentariosDemanda!", error);
  }
}