


import { Usuario } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setUsuario: (value: Usuario) => void;
  id: string
};

export async function LerUsuario({ id, setUsuario }: Props) {
  try {
    const response = await api.post("/lerUsuario", { id }, {
      headers: { "Content-Type": "application/json" },
    });
    setUsuario(response.data.usuario);
  } catch (error) {
    console.log("Erro em ler usuario!", error);
  }
}