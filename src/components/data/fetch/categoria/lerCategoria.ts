

import axios from "axios";

import { Categoria } from "../../../types";

type Props = {
  setCategorias: (value: Array<Categoria>) => void;
};

export async function LerCategorias({ setCategorias }: Props) {
  try {
    const response = await axios.get("/lerCategorias", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler categorias!");
    setCategorias(response.data);
  } catch (error) {
    console.log("Erro em ler categorias!", error);
  }
}