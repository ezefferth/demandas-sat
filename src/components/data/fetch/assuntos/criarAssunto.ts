import axios from "axios";

type Props = {
  nome: string;
  categoriaId: string;
  tempoLimite: number;
  setorId?: string; // SetorId é opcional, pois pode não ser necessário em todos os casos
};

export async function CriarAssunto({
  nome,
  categoriaId,
  tempoLimite,
  setorId,
}: Props) {
  try {
    const response = await axios.post(
      "/criarAssunto",
      { nome, categoriaId, tempoLimite, setorId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em criar assunto!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar assunto!", error);
    throw error;
  }
}
