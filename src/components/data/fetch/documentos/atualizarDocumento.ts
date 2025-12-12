import axios from "axios";

type Props = {
  id: string;
  nome: string;
  mimeType: string;
  conteudo: Uint8Array;
  chamadoId: string; // SetorId é opcional, pois pode não ser necessário em todos os casos
  comentarioId?: string;
};

export async function AtualizarDocumento({
  id,
  nome,
  mimeType,
  conteudo,
  chamadoId,
  comentarioId,
}: Props) {
  try {
    const response = await axios.post(
      "/atualizarDocumentoDemanda",
      { id, nome, mimeType, conteudo, chamadoId, comentarioId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em atualizar documento!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar documento!", error);
    throw error;
  }
}
