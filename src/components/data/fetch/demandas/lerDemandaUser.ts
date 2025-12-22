

import { Demanda } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setDemandasUser: (value: Array<Demanda>) => void;
  id: string
};

export async function LerDemandasUser({ setDemandasUser, id }: Props) {
  try {
    const response = await api.post("/lerDemandasUser", { id }, {

      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler Demanda do usuário!");
    setDemandasUser(response.data);
  } catch (error) {
    console.log("Erro em ler Demanda do usuário!", error);
  }
}