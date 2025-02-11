

import axios from "axios";

import {Status } from "../../../types";

type Props = {
  setStatus: (value: Array<Status>) => void;
};

export async function LerStatus({ setStatus }: Props) {
  try {
    const response = await axios.get("/lerStatus", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em ler status!");
    setStatus(response.data);
  } catch (error) {
    console.log("Erro em ler status!", error);
  }
}