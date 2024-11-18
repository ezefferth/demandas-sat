

import axios from "axios";

type Props = {
  nome: string;
};

export async function CriarCategoria({ nome }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/criarCategoria", { nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar categoria!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar categoria!", error);
    throw error;
  }
}