

import { Sugestao } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setSugestoes: (value: Array<Sugestao>) => void;
};

export async function LerSugestoes({ setSugestoes }: Props) {
  try {
    const response = await api.get("/lerSugestoes", {
      headers: { "Content-Type": "application/json" },
    });
    setSugestoes(response.data);
  } catch (error) {
    console.log("Erro em ler sugestoes!", error);
  }
}