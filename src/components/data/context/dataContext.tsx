import { createContext, useEffect, useState } from "react";
import { Assunto, Categoria, Setor, Usuario } from "../../types";
import { LerCategorias } from "../fetch/categoria/lerCategoria";
import { LerSetores } from "../fetch/setores/lerSetores";
import { LerAssuntos } from "../fetch/assuntos/lerAssuntos";
import { LerUsuarios } from "../fetch/usuarios/lerUsuarios";

type DataContextType = {
  categorias: Categoria[] | undefined;
  setCategorias: (value: Categoria[] | undefined) => void;
  setores: Setor[] | undefined;
  setSetores: (value: Setor[] | undefined) => void;
  assuntos: Assunto[] | undefined;
  setAssuntos: (value: Assunto[] | undefined) => void;
  usuarios: Usuario[] | undefined;
  setUsuarios: (value: Usuario[] | undefined) => void;
};

export const DataContext = createContext({} as DataContextType);

export default function DataProvider({ children }: any) {
  const [categorias, setCategorias] = useState<Categoria[] | undefined>();
  const [setores, setSetores] = useState<Setor[] | undefined>();
  const [assuntos, setAssuntos] = useState<Assunto[] | undefined>();
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>();


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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}