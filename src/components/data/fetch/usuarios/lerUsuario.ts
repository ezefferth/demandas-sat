

import axios from "axios";

import { Usuario } from "../../../types";

type Props = {
  setUsuario: (value: Usuario) => void;
  id: string
};

export async function LerUsuario({ id, setUsuario }: Props) {
  try {
    const response = await axios.post("/api/lerUsuario", { id }, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler usuario!");
    setUsuario(response.data.usuario);
  } catch (error) {
    console.log("Erro em ler usuario!", error);
  }
}