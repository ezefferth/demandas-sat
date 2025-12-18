

// import axios from "axios";

import {  Material } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setMateriais: (value: Array<Material>) => void;
};

export async function LerMateriais({ setMateriais }: Props) {
  try {
    const response = await api.get("/lerMateriais", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler materiais!");
    setMateriais(response.data);
  } catch (error) {
    console.log("Erro em ler materiais!", error);
  }
}