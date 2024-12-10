

import axios from "axios";

import {Status } from "../../../types";

type Props = {
  setStatus: (value: Array<Status>) => void;
};

export async function LerStatus({ setStatus }: Props) {
  try {
    const response = await axios.get("https://10.21.39.75/lerStatus", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler status!");
    setStatus(response.data);
  } catch (error) {
    console.log("Erro em ler status!", error);
  }
}