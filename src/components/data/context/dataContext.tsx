import { createContext, useEffect, useState } from "react";
import { Assunto, Categoria, Chamado, Prioridade, Setor, Status, Usuario } from "../../types";
import { LerCategorias } from "../fetch/categoria/lerCategoria";
import { LerSetores } from "../fetch/setores/lerSetores";
import { LerAssuntos } from "../fetch/assuntos/lerAssuntos";
import { LerUsuarios } from "../fetch/usuarios/lerUsuarios";
import { LerStatus } from "../fetch/status/lerStatus";
import { LerPrioridades } from "../fetch/prioridade/lerPrioridades";
import { LerChamados } from "../fetch/chamados/lerChamados";

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


  /* CATEGORIAS */
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        LerCategorias({ setCategorias });

      } catch (error) {
        console.log("Erro no useEffect Categorias", error);
        return;
      }
    };
    fetchCategorias();
  }, []);
  /* SETORES */
  useEffect(() => {
    const fetchSetores = async () => {
      try {
        LerSetores({ setSetores });

      } catch (error) {
        console.log("Erro no useEffect setores", error);
        return;
      }
    };
    fetchSetores();
  }, []);
  /* ASSUNTOS */
  useEffect(() => {
    const fetchAssunto = async () => {
      try {
        LerAssuntos({ setAssuntos });

      } catch (error) {
        console.log("Erro no useEffect assuntos", error);
        return;
      }
    };
    fetchAssunto();
  }, []);
  /* USUARIOS */
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        LerUsuarios({ setUsuarios });

      } catch (error) {
        console.log("Erro no useEffect assuntos", error);
        return;
      }
    };
    fetchUsuario();
  }, []);
  /* STATUS */
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        LerStatus({ setStatus });

      } catch (error) {
        console.log("Erro no useEffect status", error);
        return;
      }
    };
    fetchStatus();
  }, []);
  /* PRIORIDADE */
  useEffect(() => {
    const fetchPrioridade = async () => {
      try {
        LerPrioridades({ setPrioridades });

      } catch (error) {
        console.log("Erro no useEffect prioridade", error);
        return;
      }
    };
    fetchPrioridade();
  }, []);
  /* CHAMADOS */
  useEffect(() => {
    const fetch = async () => {
      try {
        LerChamados({ setChamados });

      } catch (error) {
        console.log("Erro no useEffect prioridade", error);
        return;
      }
    };
    fetch();
  }, []);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}