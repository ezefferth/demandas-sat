
import { api } from "../../../../services/api";

type Props = {
  id: string;
};

export async function RemoverDocumento({ id }: Props) {
  try {
    const response = await api.post(
      "/removerDocumentoDemanda",
      { id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.log("Erro ao remover documento!", error);
    throw error;
  }
}
