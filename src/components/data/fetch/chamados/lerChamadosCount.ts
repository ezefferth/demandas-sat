

import axios from "axios";


type Props = {
  setCountChamado: (value: number) => void;
};

export async function LerChamadosCount({ setCountChamado }: Props) {
  try {
    const response = await axios.post("/lerComentariosCount", {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em count comentarios!");
    setCountChamado(response.data);
  } catch (error) {
    console.log("Erro em count chamados!", error);
  }
}