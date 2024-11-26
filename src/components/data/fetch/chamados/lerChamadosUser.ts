

import axios from "axios";

import { Chamado } from "../../../types";

type Props = {
  setChamadosUser: (value: Array<Chamado>) => void;
  id: string
};

export async function LerChamadosUser({ setChamadosUser, id }: Props) {
  try {
    const response = await axios.post("http://10.21.39.75:4001/lerChamadosUser", { id }, {

      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler chamados do usuário!");
    setChamadosUser(response.data);
  } catch (error) {
    console.log("Erro em ler chamados do usuário!", error);
  }
}