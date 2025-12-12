import axios from "axios";

import { Documento } from "../../../types";

type Props = {
  setDocumentos: (value: Array<Documento>) => void;
  chamadoId: Number;
};

export async function LerDocumento({ setDocumentos, chamadoId }: Props) {
  try {
    const response = await axios.post(
      "/lerDocumentosDemanda",
      { chamadoId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Sucesso em ler documento!");
    setDocumentos(response.data);
  } catch (error) {
    console.log("Erro em ler documento!", error);
  }
}
