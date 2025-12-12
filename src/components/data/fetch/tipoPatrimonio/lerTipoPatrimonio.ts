

import axios from "axios";

import { TipoPatrimonio } from "../../../types";

type Props = {
  setTipoPatrimonio: (value: Array<TipoPatrimonio>) => void;
};

export async function LerTipoPatrimonios({ setTipoPatrimonio }: Props) {
  try {
    const response = await axios.get("/lerTipoPatrimoniosDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em tipo patrimonio!");
    setTipoPatrimonio(response.data);
  } catch (error) {
    console.log("Erro em tipo patrimonio!", error);
  }
}