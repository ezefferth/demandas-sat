


// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  itemId: string
  qtdAprovada: number;
  aprovado: boolean;
};

export async function AtualizarMateriaisAprovaItem({ itemId, qtdAprovada, aprovado }: Props) {
  try {
    const response = await api.post("/atualizarMateriaisAprovaItem",
      {
        itemId,
        qtdAprovada,
        aprovado
      },
      {
        headers: { "Content-Type": "application/json" }
      });
    // console.log("Sucesso em finalizar demanda!", response);
    return response;
  } catch (error) {
    console.log("Erro ao finalizar SolicitacaoMaterial!", error);
    throw error;
  }
}