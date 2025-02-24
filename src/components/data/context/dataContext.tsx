import { createContext, useContext, useEffect, useState } from "react";
import { Assunto, Categoria, Chamado, Comentario, Patrimonio, Prioridade, Setor, Status, Sugestao, TipoPatrimonio, Usuario } from "../../types";
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

// import audioMsg from '../../../../public/notification-msg.mp3'


type DataContextType = {
  categorias: Categoria[] | undefined;
  setCategorias: (value: Categoria[] | undefined) => void;
  setores: Setor[] | undefined;
  setSetores: (value: Setor[] | undefined) => void;
  assuntos: Assunto[] | undefined;
  setAssuntos: (value: Assunto[] | undefined) => void;
  usuarios: Usuario[] | undefined;
  setUsuarios: (value: Usuario[] | undefined) => void;
  status: Status[] | undefined;
  setStatus: (value: Status[] | undefined) => void;
  prioridades: Status[] | undefined;
  setPrioridades: (value: Prioridade[] | undefined) => void;
  chamados: Chamado[] | undefined;
  setChamados: (value: Chamado[] | undefined) => void;
  chamadosUser: Chamado[] | undefined;
  setChamadosUser: (value: Chamado[] | undefined) => void;
  comentarios: Comentario[] | undefined;
  setComentarios: (value: Comentario[] | undefined) => void;
  comentariosTodos: Comentario[] | undefined;
  setComentariosTodos: (value: Comentario[] | undefined) => void;
  countChamado: number;
  setCountChamado: (value: number) => void;
  countChamadoAtual: number;
  setCountChamadoAtual: (value: number) => void;
  sugestoes: Sugestao[] | undefined;
  setSugestoes: (value: Sugestao[] | undefined) => void
  patrimonios: Patrimonio[] | undefined;
  setPatrimonios: (value: Patrimonio[] | undefined) => void;
  tipoPatrimonio: TipoPatrimonio[] | undefined;
  setTipoPatrimonio: (value: TipoPatrimonio[] | undefined) => void;
};

export const DataContext = createContext({} as DataContextType);

export default function DataProvider({ children }: any) {
  const [categorias, setCategorias] = useState<Categoria[] | undefined>();
  const [setores, setSetores] = useState<Setor[] | undefined>();
  const [assuntos, setAssuntos] = useState<Assunto[] | undefined>([]);
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>([]);
  const [status, setStatus] = useState<Status[] | undefined>([]);
  const [prioridades, setPrioridades] = useState<Prioridade[] | undefined>();
  const [chamados, setChamados] = useState<Chamado[] | undefined>();
  const [chamadosUser, setChamadosUser] = useState<Chamado[] | undefined>();
  const [comentarios, setComentarios] = useState<Comentario[] | undefined>();
  const [comentariosTodos, setComentariosTodos] = useState<Comentario[] | []>();
  const [countChamado, setCountChamado] = useState<number>(0);
  const [countChamadoAtual, setCountChamadoAtual] = useState<number>(0);
  const [countComentario, setCountComentario] = useState<number>(0);
  const [countComentarioAtual, setCountComentarioAtual] = useState<number>(0);
  const [sugestoes, setSugestoes] = useState<Sugestao[] | []>();
  const [patrimonios, setPatrimonios] = useState<Patrimonio[] | []>();
  const [tipoPatrimonio, setTipoPatrimonio] = useState<TipoPatrimonio[] | []>();

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
          LerPrioridades({ setPrioridades }),
          LerChamados({ setChamados }),
          LerComentariosTodos({ id: usuario.id, setComentariosTodos }),
          LerPatrimonios({ setPatrimonios }),
          LerTipoPatrimonios({ setTipoPatrimonio })
        ]);

        // Inicializando as contagens
        await LerChamadosCount({ setCountChamado });
        setCountChamadoAtual(countChamado); // Supondo que countChamado foi atualizado

        await LerComentariosCount({ id: usuario.id, setCountComentario });
        setCountComentarioAtual(countComentario); // Similar para comentários

        // Marca que a carga inicial foi concluída
        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Erro na carga inicial:", error);
      }
    };

    fetchInitialData();
  }, [usuario]);



  // Efeito para atualizar chamados periodicamente
  useEffect(() => {
    if (!usuario || !initialLoadComplete) return;

    const updateChamados = async () => {
      try {
        // Atualiza a contagem de chamados
        await LerChamadosCount({ setCountChamado });

        // Só dispara notificação se houve aumento real (após a carga inicial)
        if (countChamado > countChamadoAtual) {
          const audio = new Audio('../../../../public/notification-chamado.mp3');
          audio.play().catch(error => console.error("Erro ao tocar som: ", error));

          toast.info("Novo chamado recebido!", {
            autoClose: false,
            closeOnClick: true,
          });
        }
        // Atualiza o contador atual
        setCountChamadoAtual(countChamado);
        // Atualiza a lista de chamados
        await LerChamados({ setChamados });
      } catch (error) {
        console.error("Erro ao atualizar chamados:", error);
      }
    };

    const interval = setInterval(updateChamados, 30000); // A cada 30 segundos
    return () => clearInterval(interval);
  }, [usuario, initialLoadComplete, countChamado, countChamadoAtual]);

  // Efeito para atualizar comentários periodicamente
  useEffect(() => {
    if (!usuario || !initialLoadComplete) return;

    const updateComentarios = async () => {
      try {
        await LerComentariosCount({ id: usuario.id, setCountComentario });

        if (countComentario > countComentarioAtual) {
          const audio = new Audio('../../../../public/notification-msg.mp3');
          audio.play().catch(error => console.error("Erro ao tocar som: ", error));

          toast.info("Novo comentário recebido!", {
            autoClose: false,
            closeOnClick: true,
          });
        }
        setCountComentarioAtual(countComentario);
        await LerComentariosTodos({ id: usuario.id, setComentariosTodos });
      } catch (error) {
        console.error("Erro ao atualizar comentários:", error);
      }
    };

    const interval = setInterval(updateComentarios, 15000); // A cada 15 segundos
    return () => clearInterval(interval);
  }, [usuario, initialLoadComplete, countComentario, countComentarioAtual]);

  return (
    <DataContext.Provider
      value={{
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
        setCountChamadoAtual,
        sugestoes,
        setSugestoes,
        tipoPatrimonio,
        setTipoPatrimonio,
        patrimonios,
        setPatrimonios,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
