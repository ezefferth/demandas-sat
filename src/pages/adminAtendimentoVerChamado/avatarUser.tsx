import { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Usuario } from "../../components/types";

interface AvatarUsuarioProps {
  usuarioId: string;
  usuarios: Usuario[] | undefined;
}

const AvatarUsuario: React.FC<AvatarUsuarioProps> = ({
  usuarioId,
  usuarios,
}) => {
  const usuarioSelecionado = usuarios?.find(
    (usuario) => usuario.id === usuarioId
  );

  const [imagemUrl, setImagemUrl] = useState<string | null>(null);
  const [imagemCarregada, setImagemCarregada] = useState(true);

  useEffect(() => {
    if (
      usuarioSelecionado?.avatar &&
      //@ts-ignore
      usuarioSelecionado.avatar.data &&
      //@ts-ignore
      Array.isArray(usuarioSelecionado.avatar.data)
    ) {
      //@ts-ignore
      const byteArray = new Uint8Array(usuarioSelecionado.avatar.data);
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Ajuste o MIME type se não for JPEG
      const url = URL.createObjectURL(blob);
      setImagemUrl(url);

      // Cleanup do URL ao desmontar
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImagemUrl(null);
    }
  }, [usuarioSelecionado]);

  return (
    <div>
      {imagemUrl && imagemCarregada ? (
        <img
          src={imagemUrl}
          alt={usuarioSelecionado?.nome}
          className="w-16 h-16 rounded-full cursor-pointer"
          onError={() => setImagemCarregada(false)}
        />
      ) : (
        <FaCircleUser className="w-16 h-16 text-slate-600" />
      )}
    </div>
  );
};

export default AvatarUsuario;
