



import { TipoPatrimonio } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setTipoPatrimonio: (value: Array<TipoPatrimonio>) => void;
};

export async function LerTipoPatrimonios({ setTipoPatrimonio }: Props) {
  try {
    const response = await api.get("/lerTipoPatrimoniosDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    setTipoPatrimonio(response.data);
  } catch (error) {
    console.log("Erro em tipo patrimonio!", error);
  }
}