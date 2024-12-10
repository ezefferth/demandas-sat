

import axios from "axios";

import { Setor } from "../../../types";

type Props = {
  setSetores: (value: Array<Setor>) => void;
};

export async function LerSetores({ setSetores }: Props) {
  try {
    const response = await axios.get("https://10.21.39.75/lerSetores", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler setor!");
    setSetores(response.data);
  } catch (error) {
    console.log("Erro em ler setor!", error);
  }
}