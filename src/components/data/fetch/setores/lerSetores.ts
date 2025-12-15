


import { Setor } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setSetores: (value: Array<Setor>) => void;
};

export async function LerSetores({ setSetores }: Props) {
  try {
    const response = await api.get("/lerSetores", {
      headers: { "Content-Type": "application/json" },
    });
    setSetores(response.data);
  } catch (error) {
    console.log("Erro em ler setor!", error);
  }
}