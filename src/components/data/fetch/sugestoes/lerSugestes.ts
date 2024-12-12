

import axios from "axios";

import { Sugestao } from "../../../types";

type Props = {
  setSugestoes: (value: Array<Sugestao>) => void;
};

export async function LerSugestoes({ setSugestoes }: Props) {
  try {
    const response = await axios.get("http://10.21.39.75:4001/lerSugestoes", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler sugestoes!");
    setSugestoes(response.data);
  } catch (error) {
    console.log("Erro em ler sugestoes!", error);
  }
}