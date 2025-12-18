import { createContext, useContext, useEffect, useState } from "react";
import {
  Assunto,
  Categoria,
  Chamado,
  Comentario,
  Documento,
  Patrimonio,
  Prioridade,
  Setor,
  Status,
  Sugestao,
  TipoPatrimonio,
  Usuario,
  Material,
} from "../../types";
import { LerCategorias } from "../fetch/categoria/lerCategoria";
import { LerSetores } from "../fetch/setores/lerSetores";
import { LerAssuntos } from "../fetch/assuntos/lerAssuntos";
import { LerUsuarios } from "../fetch/usuarios/lerUsuarios";
import { LerStatus } from "../fetch/status/lerStatus";
import { LerPrioridades } from "../fetch/prioridade/lerPrioridades";
import { LerChamados } from "../fetch/chamados/lerChamados";
import { AuthContext } from "./authContext";
import { LerComentariosCount } from "../fetch/comentario/lerComentariosCount";
import { toast } from "react-toastify";
import { LerComentariosTodos } from "../fetch/comentario/lerComentariosTodos";
import { LerSugestoes } from "../fetch/sugestoes/lerSugestes";
import { LerPatrimonios } from "../fetch/patrimonio/lerPatrimonio";
import { LerTipoPatrimonios } from "../fetch/tipoPatrimonio/lerTipoPatrimonio";
import { LerChamadosCount } from "../fetch/chamados/lerChamadosCount";
import { LerMateriais } from "../fetch/materiais/lerMateriais";

// import audioMsg from '../../../../public/notification-msg.mp3'

type DataContextType = {
  categorias: Categoria[] | undefined;
  setCategorias: (value: Categoria[]) => void;
  materiais: Material[] | undefined;
  setMateriais: (value: Material[]) => void;
  setores: Setor[] | undefined;
  setSetores: (value: Setor[]) => void;
  assuntos: Assunto[] | undefined;
  setAssuntos: (value: Assunto[]) => void;
  usuarios: Usuario[] | undefined;
  setUsuarios: (value: Usuario[]) => void;
  status: Status[] | undefined;
  setStatus: (value: Status[]) => void;
  prioridades: Status[] | undefined;
  setPrioridades: (value: Prioridade[]) => void;
  chamados: Chamado[] | undefined;
  setChamados: (value: Chamado[]) => void;
  chamadosUser: Chamado[] | undefined;
  setChamadosUser: (value: Chamado[]) => void;
  comentarios: Comentario[] | undefined;
  setComentarios: (value: Comentario[]) => void;
  comentariosTodos: Comentario[] | undefined;
  setComentariosTodos: (value: Comentario[]) => void;
  countChamado: number | undefined;
  setCountChamado: (value: number) => void;
  countChamadoAtual: number | undefined;
  setCountChamadoAtual: (value: number) => void;
  sugestoes: Sugestao[] | undefined;
  setSugestoes: (value: Sugestao[]) => void;
  patrimonios: Patrimonio[] | undefined;
  setPatrimonios: (value: Patrimonio[]) => void;
  tipoPatrimonio: TipoPatrimonio[] | undefined;
  setTipoPatrimonio: (value: TipoPatrimonio[]) => void;
  countComentario: number | undefined;
  documentos: Documento[] | undefined;
  setDocumentos: (value: Documento[]) => void;
};

export const DataContext = createContext({} as DataContextType);

export default function DataProvider({ children }: any) {
  const [categorias, setCategorias] = useState<Categoria[]>();
  const [setores, setSetores] = useState<Setor[]>();
  const [materiais, setMateriais] = useState<Material[]>();
  const [assuntos, setAssuntos] = useState<Assunto[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [prioridades, setPrioridades] = useState<Prioridade[]>();
  const [chamados, setChamados] = useState<Chamado[]>();
  const [chamadosUser, setChamadosUser] = useState<Chamado[]>();
  const [comentarios, setComentarios] = useState<Comentario[]>();
  const [comentariosTodos, setComentariosTodos] = useState<Comentario[]>();
  const [countChamado, setCountChamado] = useState<number>(0);
  const [countChamadoAtual, setCountChamadoAtual] = useState<number>(0);
  const [countComentario, setCountComentario] = useState<number>(0);
  const [countComentarioAtual, setCountComentarioAtual] = useState<number>(0);
  const [sugestoes, setSugestoes] = useState<Sugestao[]>();
  const [patrimonios, setPatrimonios] = useState<Patrimonio[]>();
  const [tipoPatrimonio, setTipoPatrimonio] = useState<TipoPatrimonio[]>();
  const [documentos, setDocumentos] = useState<Documento[]>();

  const { usuario } = useContext(AuthContext);

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    if (!usuario) return;

    const fetchInitialData = async () => {
      try {
        // Buscando os dados iniciais (sugestões, categorias, setores, etc.)
        await Promise.all([
          LerSugestoes({ setSugestoes }),
          LerCategorias({ setCategorias }),
          LerSetores({ setSetores }),
          LerAssuntos({ setAssuntos }),
          LerUsuarios({ setUsuarios }),
          LerStatus({ setStatus }),
          LerMateriais({ setMateriais }),
          LerPrioridades({ setPrioridades }),
          LerChamados({ setChamados }),
          LerComentariosTodos({ id: usuario.id, setComentariosTodos }),
          LerPatrimonios({ setPatrimonios }),
          LerTipoPatrimonios({ setTipoPatrimonio }),
        ]);

        // Inicializando as contagens
        // Inicializando as contagens
        const chamadosCount = await LerChamadosCount({ setCountChamado });
        setCountChamadoAtual(chamadosCount); // Sincroniza o valor inicial corretamente

        const comentariosCount = await LerComentariosCount({
          id: usuario.id,
          setCountComentario,
        });
        setCountComentarioAtual(comentariosCount); // Sincroniza o valor inicial corretamente

        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Erro na carga inicial:", error);
      }
    };

    fetchInitialData();
  }, [usuario]);

  useEffect(() => {
    if (!usuario || !initialLoadComplete) return;

    const updateChamados = async () => {
      try {
        const novosChamadosCount = await LerChamadosCount({ setCountChamado });

        // Só dispara notificação se countChamadoAtual já foi sincronizado anteriormente
        if (countChamadoAtual > 0 && novosChamadosCount > countChamadoAtual) {
          const audio = new Audio(
            "../../../../public/notification-chamado.mp3"
          );
          audio
            .play()
            .catch((error) => console.error("Erro ao tocar som: ", error));

          toast.info("Novo chamado recebido!", {
            autoClose: false,
            closeOnClick: true,
          });
        }
        setCountChamadoAtual(novosChamadosCount); // Atualiza o contador atual
        await LerChamados({ setChamados });
      } catch (error) {
        console.error("Erro ao atualizar chamados:", error);
      }
    };

    const interval = setInterval(updateChamados, 30000); // A cada 30 segundos
    return () => clearInterval(interval);
  }, [usuario, initialLoadComplete, countChamadoAtual]);

  useEffect(() => {
    if (!usuario || !initialLoadComplete) return;

    const updateComentarios = async () => {
      try {
        const novosComentariosCount = await LerComentariosCount({
          id: usuario.id,
          setCountComentario,
        });

        // Só dispara notificação se countComentarioAtual já foi sincronizado anteriormente
        if (
          countComentarioAtual > 0 &&
          novosComentariosCount > countComentarioAtual
        ) {
          const audio = new Audio("../../../../public/notification-msg.mp3");
          audio
            .play()
            .catch((error) => console.error("Erro ao tocar som: ", error));

          toast.info("Novo comentário recebido!", {
            autoClose: false,
            closeOnClick: true,
          });
        }
        setCountComentarioAtual(novosComentariosCount); // Atualiza o contador atual
        await LerComentariosTodos({ id: usuario.id, setComentariosTodos });
      } catch (error) {
        console.error("Erro ao atualizar comentários:", error);
      }
    };

    const interval = setInterval(updateComentarios, 15000); // A cada 15 segundos
    return () => clearInterval(interval);
  }, [usuario, initialLoadComplete, countComentarioAtual]);

  return (
    <DataContext.Provider
      value={{
        materiais,
        setMateriais,
        usuarios,
        setUsuarios,
        categorias,
        setCategorias,
        setores,
        setSetores,
        assuntos,
        setAssuntos,
        status,
        setStatus,
        prioridades,
        setPrioridades,
        chamados,
        setChamados,
        chamadosUser,
        setChamadosUser,
        comentarios,
        setComentarios,
        comentariosTodos,
        setComentariosTodos,
        countChamado,
        setCountChamado,
        countChamadoAtual,
        countComentario,
        setCountChamadoAtual,
        sugestoes,
        setSugestoes,
        tipoPatrimonio,
        setTipoPatrimonio,
        patrimonios,
        setPatrimonios,
        documentos,
        setDocumentos,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
