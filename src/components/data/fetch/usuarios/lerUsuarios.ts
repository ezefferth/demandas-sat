

import { Usuario } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setUsuarios: (value: Array<Usuario>) => void;
};

export async function LerUsuarios({ setUsuarios }: Props) {
  try {
    const response = await api.get("/lerUsuarios", {
      headers: { "Content-Type": "application/json" },
    });
    setUsuarios(response.data);
  } catch (error) {
    console.log("Erro em ler usuarios!", error);
  }
}