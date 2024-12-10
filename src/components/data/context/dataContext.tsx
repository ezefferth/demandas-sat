import { createContext, useContext, useEffect, useState } from "react";
import { Assunto, Categoria, Chamado, Comentario, Prioridade, Setor, Status, Sugestao, Usuario } from "../../types";
import { LerCategorias } from "../fetch/categoria/lerCategoria";
import { LerSetores } from "../fetch/setores/lerSetores";
import { LerAssuntos } from "../fetch/assuntos/lerAssuntos";
import { LerUsuarios } from "../fetch/usuarios/lerUsuarios";
import { LerStatus } from "../fetch/status/lerStatus";
import { LerPrioridades } from "../fetch/prioridade/lerPrioridades";
import { LerChamados } from "../fetch/chamados/lerChamados";
import { AuthContext } from "./authContext";
import { LerChamadosUser } from "../fetch/chamados/lerChamadosUser";
import { LerComentariosCount } from "../fetch/comentario/lerComentariosCount";
import { toast } from "react-toastify";
import { LerComentariosTodos } from "../fetch/comentario/lerComentariosTodos";
import { LerSugestoes } from "../fetch/sugestoes/lerSugestes";


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
};

export const DataContext = createContext({} as DataContextType);

export default function DataProvider({ children }: any) {
  const [categorias, setCategorias] = useState<Categoria[] | undefined>();
  const [setores, setSetores] = useState<Setor[] | undefined>();
  const [assuntos, setAssuntos] = useState<Assunto[] | undefined>();
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>();
  const [status, setStatus] = useState<Status[] | undefined>();
  const [prioridades, setPrioridades] = useState<Prioridade[] | undefined>();
  const [chamados, setChamados] = useState<Chamado[] | undefined>();
  const [chamadosUser, setChamadosUser] = useState<Chamado[] | undefined>();
  const [comentarios, setComentarios] = useState<Comentario[] | undefined>();
  const [comentariosTodos, setComentariosTodos] = useState<Comentario[] | []>();
  const [countChamado, setCountChamado] = useState<number>(0);
  const [countChamadoAtual, setCountChamadoAtual] = useState<number>(0);
  const [sugestoes, setSugestoes] = useState<Sugestao[] | []>();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (!usuario) return; // Aguarda o usuário estar logado

    const fetchSugestoes = async () => {
      try {
        await LerSugestoes({ setSugestoes });
      } catch (error) {
        console.error("Erro ao buscar sugestoes:", error);
      }
    };
    const fetchCategorias = async () => {
      try {
        await LerCategorias({ setCategorias });
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    const fetchSetores = async () => {
      try {
        await LerSetores({ setSetores });
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
      }
    };

    const fetchAssuntos = async () => {
      try {
        await LerAssuntos({ setAssuntos });
      } catch (error) {
        console.error("Erro ao buscar assuntos:", error);
      }
    };

    const fetchUsuarios = async () => {
      try {
        await LerUsuarios({ setUsuarios });
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    const fetchStatus = async () => {
      try {
        await LerStatus({ setStatus });
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    };

    const fetchPrioridades = async () => {
      try {
        await LerPrioridades({ setPrioridades });
      } catch (error) {
        console.error("Erro ao buscar prioridades:", error);
      }
    };

    const fetchChamados = async () => {
      try {
        if (usuario.admin) {
          await LerChamados({ setChamados });
        } else {
          const id = usuario.id;
          await LerChamadosUser({ setChamadosUser, id });
        }
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      }
    };

    const fetchComentarios = async () => {
      try {
        // Lógica específica para usuários normais
        await LerComentariosCount({
          id: usuario.id,
          setCountChamado,
        });

        if (countChamadoAtual < countChamado || countChamadoAtual === 0) {
          if (countChamadoAtual !== 0) {
            toast.info("Novo comentário recebido!", {
              autoClose: false,
              closeOnClick: true,
            })
          }

          setCountChamadoAtual(countChamado);
          try {
            await LerComentariosTodos({
              id: usuario.id,
              setComentariosTodos,
            });
          }
          catch (error) {
            console.error("Erro ao buscar comentários (usuário):", error);
          }
        }
        // console.log(comentariosTodos)
      } catch (error) {
        console.error("Erro ao buscar comentários (usuário):", error);
      }
    };

    fetchSugestoes()
    fetchCategorias();
    fetchSetores();
    fetchAssuntos();
    fetchUsuarios();
    fetchStatus();
    fetchPrioridades();
    fetchChamados();
    fetchComentarios();
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return; // Sai se o usuário não estiver definido

    const fetchChamados = async () => {
      try {
        await LerChamados({ setChamados });
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      }
    };

    // Chamada inicial para carregar os chamados
    fetchChamados();

    // Configura o intervalo para atualizar os chamados periodicamente
    const interval = setInterval(() => {
      fetchChamados();
    }, 300000); // Atualiza a cada 50 segundos

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, [usuario, LerChamados, setChamados]); // Executa a cada 5 minutos

  useEffect(() => {
    if (!usuario) {
      setComentariosTodos([])
      return
    }; // Aguarda o usuário estar logado

    const fetchComentariosAdmin = async () => {
      try {
        // Lógica específica para administradores
        await LerComentariosCount({
          id: usuario.id,
          setCountChamado,
        });

        if (countChamadoAtual < countChamado || countChamadoAtual === 0) {
          if (countChamadoAtual !== 0) {
            toast.info("Novo comentário recebido!", {
              autoClose: false,
              closeOnClick: true,
            })
          }
          setCountChamadoAtual(countChamado);
          await LerComentariosTodos({
            id: usuario.id,
            setComentariosTodos,
          });
        }
        // console.log(comentariosTodos)
      } catch (error) {
        console.error("Erro ao buscar comentários (admin):", error);
      }
    };

    const interval = setInterval(() => {
      fetchComentariosAdmin();

    }, 15000); // Executa a cada 15 segundos


    return () => clearInterval(interval); // Limpa o intervalo ao desmontar
  }, [usuario, countChamadoAtual, countChamado]);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
