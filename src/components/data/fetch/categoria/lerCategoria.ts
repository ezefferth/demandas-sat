

// import axios from "axios";

import { Categoria } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setCategorias: (value: Array<Categoria>) => void;
};

export async function LerCategorias({ setCategorias }: Props) {
  try {
    const response = await api.get("/lerCategoriasDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler categorias!");
    setCategorias(response.data);
  } catch (error) {
    console.log("Erro em ler categorias!", error);
  }
}