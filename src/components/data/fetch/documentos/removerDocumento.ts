import axios from "axios";

type Props = {
  id: string;
};

export async function RemoverDocumento({ id }: Props) {
  try {
    const response = await axios.post(
      "/removerDocumentoDemanda",
      { id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em remover documento!", response);
    return response;
  } catch (error) {
    console.log("Erro ao remover documento!", error);
    throw error;
  }
}
