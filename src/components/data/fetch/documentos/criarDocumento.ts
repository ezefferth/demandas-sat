import axios from "axios";

type Props = {
  nome: string;
  mimeType: string;
  conteudo: string;
  chamadoId: Number; // SetorId é opcional, pois pode não ser necessário em todos os casos
  comentarioId?: string; // SetorId é opcional, pois pode não ser necessário em todos os casos
};

export async function CriarDocumento({
  nome,
  mimeType,
  conteudo,
  chamadoId,
  comentarioId,
}: //comentarioId,

Props) {
  try {
    const response = await axios.post(
      "/criarDocumentoDemanda",
      { nome, mimeType, conteudo, chamadoId, comentarioId /* comentarioId */ },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Sucesso em criar documento!", response);

    return response;
  } catch (error: any) {
    console.error("Erro ao criar documento!", error);
    console.log("Detalhe do erro vindo do backend:", error.response?.data);
    window.alert(JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}
