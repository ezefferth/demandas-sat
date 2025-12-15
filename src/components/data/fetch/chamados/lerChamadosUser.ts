

import { Chamado } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setChamadosUser: (value: Array<Chamado>) => void;
  id: string
};

export async function LerChamadosUser({ setChamadosUser, id }: Props) {
  try {
    const response = await api.post("/lerDemandasUser", { id }, {

      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em ler Demanda do usuário!");
    setChamadosUser(response.data);
  } catch (error) {
    console.log("Erro em ler Demanda do usuário!", error);
  }
}