

import axios from "axios";


type Props = {
  id: string
  setCountChamado: (value: number) => void;
};

export async function LerComentariosCount({ setCountChamado, id }: Props) {
  try {
    const response = await axios.post("/lerComentariosCount", { id }, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Sucesso em count comentarios!");
    setCountChamado(response.data);
  } catch (error) {
    console.log("Erro em count comentarios!", error);
  }
}