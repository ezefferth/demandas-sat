



import { Patrimonio } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setPatrimonios: (value: Array<Patrimonio>) => void;
};

export async function LerPatrimonios({ setPatrimonios }: Props) {
  try {
    const response = await api.get("/lerPatrimoniosDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    setPatrimonios(response.data);
  } catch (error) {
    console.log("Erro em ler patrimonios!", error);
  }
}