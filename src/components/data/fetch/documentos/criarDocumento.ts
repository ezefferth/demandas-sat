
import { api } from "../../../../services/api";

type Props = {
  nome: string;
  mimeType: string;
  conteudo: string;
  demandaId: Number; // SetorId é opcional, pois pode não ser necessário em todos os casos
  comentarioId?: string; // SetorId é opcional, pois pode não ser necessário em todos os casos
};

export async function CriarDocumento({
  nome,
  mimeType,
  conteudo,
  demandaId,
  comentarioId,
}: //comentarioId,

Props) {
  try {
    const response = await api.post(
      "/criarDocumentoDemanda",
      { nome, mimeType, conteudo, demandaId, comentarioId /* comentarioId */ },
      {
        headers: { "Content-Type": "application/json" },
      }
    );


    return response;
  } catch (error: any) {
    console.error("Erro ao criar documento!", error);
    console.log("Detalhe do erro vindo do backend:", error.response?.data);
    window.alert(JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}
