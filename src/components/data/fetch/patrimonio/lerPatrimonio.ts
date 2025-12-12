

import axios from "axios";

import { Patrimonio } from "../../../types";

type Props = {
  setPatrimonios: (value: Array<Patrimonio>) => void;
};

export async function LerPatrimonios({ setPatrimonios }: Props) {
  try {
    const response = await axios.get("/lerPatrimoniosDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler patrimonios!");
    setPatrimonios(response.data);
  } catch (error) {
    console.log("Erro em ler patrimonios!", error);
  }
}