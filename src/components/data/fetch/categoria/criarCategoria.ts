

// import axios from "axios";
import { api } from "../../../../services/api";

type Props = {
  nome: string;
};

export async function CriarCategoria({ nome }: Props) {
  try {
    const response = await api.post("/criarCategoriaDemanda", { nome }, {
      headers: { "Content-Type": "application/json" }
    });
    // console.log("Sucesso em criar categoria!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar categoria!", error);
    throw error;
  }
}