import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Usuario } from "../../components/types";

interface AvatarUsuarioProps {
  usuarioId: string;
  usuarios: Usuario[] | undefined;
}

const AvatarUsuario: React.FC<AvatarUsuarioProps> = ({ usuarioId, usuarios }) => {
  const usuarioSelecionado = usuarios?.find((usuario) => usuario.id === usuarioId);
  const [imagemCarregada, setImagemCarregada] = useState(true);

  return (
    <div  onClick={() => console.log(usuarioSelecionado)}>
      {usuarioSelecionado && usuarioSelecionado.avatar && imagemCarregada ? (
        <img
          src={usuarioSelecionado.avatar}
          alt={usuarioSelecionado.nome}
          className="w-16 h-16 rounded-full cursor-pointer"
          onError={() => setImagemCarregada(false)} // Se der erro, exibe o ícone
         
        />
      ) : (
        <FaCircleUser className="w-16 h-16 text-slate-600" />
      )}
    </div>
  );
};

export default AvatarUsuario;
