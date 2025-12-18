
import { api } from "../../../../services/api";

type Props = {
  id: string;
  nome: string;
  mimeType: string;
  conteudo: Uint8Array;
  demandaId: string; // SetorId é opcional, pois pode não ser necessário em todos os casos
  comentarioId?: string;
};

export async function AtualizarDocumento({
  id,
  nome,
  mimeType,
  conteudo,
  demandaId,
  comentarioId,
}: Props) {
  try {
    const response = await api.post(
      "/atualizarDocumentoDemanda",
      { id, nome, mimeType, conteudo, demandaId, comentarioId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.log("Erro ao atualizar documento!", error);
    throw error;
  }
}
