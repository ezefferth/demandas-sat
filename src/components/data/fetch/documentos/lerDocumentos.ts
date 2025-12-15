

import { Documento } from "../../../types";
import { api } from "../../../../services/api";

type Props = {
  setDocumentos: (value: Array<Documento>) => void;
  chamadoId: Number;
};

export async function LerDocumento({ setDocumentos, chamadoId }: Props) {
  try {
    const response = await api.post(
      "/lerDocumentosDemanda",
      { chamadoId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setDocumentos(response.data);
  } catch (error) {
    console.log("Erro em ler documento!", error);
  }
}
