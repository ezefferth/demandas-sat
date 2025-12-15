



import { api } from "../../../../services/api";
import {Status } from "../../../types";

type Props = {
  setStatus: (value: Array<Status>) => void;
};

export async function LerStatus({ setStatus }: Props) {
  try {
    const response = await api.get("/lerStatusDemanda", {
      headers: { "Content-Type": "application/json" },
    });
    setStatus(response.data);
  } catch (error) {
    console.log("Erro em ler status!", error);
  }
}