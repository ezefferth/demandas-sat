

import axios from "axios";

import { Usuario } from "../../../types";

type Props = {
  setUsuarios: (value: Array<Usuario>) => void;
};

export async function LerUsuarios({ setUsuarios }: Props) {
  try {
    const response = await axios.get("http://10.21.39.75:4001/lerUsuarios", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler usuarios!");
    setUsuarios(response.data);
  } catch (error) {
    console.log("Erro em ler usuarios!", error);
  }
}