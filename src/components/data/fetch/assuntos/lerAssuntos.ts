

// import axios from "axios";

import { Assunto } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setAssuntos: (value: Array<Assunto>) => void;
};

export async function LerAssuntos({ setAssuntos }: Props) {
  try {
    const response = await api.get("/lerAssuntosDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler assunto!");
    setAssuntos(response.data);
  } catch (error) {
    console.log("Erro em ler assunto!", error);
  }
}