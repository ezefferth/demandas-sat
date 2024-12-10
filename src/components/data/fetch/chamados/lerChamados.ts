

import axios from "axios";

import { Chamado } from "../../../types";

type Props = {
  setChamados: (value: Array<Chamado>) => void;
};

export async function LerChamados({ setChamados }: Props) {
  try {
    const response = await axios.get("https://10.21.39.75/lerChamados", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler chamados!");
    setChamados(response.data);
  } catch (error) {
    console.log("Erro em ler chamados!", error);
  }
}