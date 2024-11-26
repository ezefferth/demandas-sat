import { createContext, useContext, useEffect, useState } from "react";
import { Assunto, Categoria, Chamado, Comentario, Prioridade, Setor, Status, Usuario } from "../../types";
import { LerCategorias } from "../fetch/categoria/lerCategoria";
import { LerSetores } from "../fetch/setores/lerSetores";
import { LerAssuntos } from "../fetch/assuntos/lerAssuntos";
import { LerUsuarios } from "../fetch/usuarios/lerUsuarios";
import { LerStatus } from "../fetch/status/lerStatus";
import { LerPrioridades } from "../fetch/prioridade/lerPrioridades";
import { LerChamados } from "../fetch/chamados/lerChamados";
import { AuthContext } from "./authContext";
import { LerChamadosUser } from "../fetch/chamados/lerChamadosUser";

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

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (!usuario) return; // Aguarda o usuário estar logado

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

    fetchCategorias();
    fetchSetores();
    fetchAssuntos();
    fetchUsuarios();
    fetchStatus();
    fetchPrioridades();
    fetchChamados();
  }, [usuario]);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
