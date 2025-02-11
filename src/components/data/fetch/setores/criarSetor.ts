

import axios from "axios";

type Props = {
  nome: string;
};

export async function CriarSetor({ nome }: Props) {
  try {
    const response = await axios.post("/criarSetor", { nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em criar setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao criar setor!", error);
    throw error;
  }
}