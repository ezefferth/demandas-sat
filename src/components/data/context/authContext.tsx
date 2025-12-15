import { createContext, useState, useEffect } from "react";
import { Usuario } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type AuthContextType = {
  usuario?: Usuario;
  token?: string;
  setUsuario: (value: Usuario | undefined) => void;
  setToken: (value: string | undefined) => void;
  login: (nomeUsuario: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: any) {
  const [usuario, setUsuario] = useState<Usuario | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔥 definição correta do ambiente

  const API_BASE =
    window.location.hostname.includes("10.21.39.75")
      ? "http://10.21.39.75:4001"
      : "/api";

  // 🔥 axios único e padronizado
  const axiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });


  useEffect(() => {
    const tokenLocal = localStorage.getItem("authToken");

    if (tokenLocal) {
      setToken(tokenLocal);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenLocal}`;
    }

    const verificarLogin = async () => {
      try {
        const response = await axiosInstance.get("/verificarUsuario");
        setUsuario(response.data.usuario);
      } catch {
        setUsuario(undefined);
        localStorage.removeItem("authToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verificarLogin();
  }, []);

  // 🔐 login
  const login = async (nomeUsuario: string, senha: string) => {
    const response = await axiosInstance.post("/loginUsuario", {
      nomeUsuario,
      senha,
    });

    setUsuario(response.data.usuario);
    setToken(response.data.token);
    localStorage.setItem("authToken", response.data.token);

    navigate("/");
  };

  // 🔓 logout
  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } finally {
      setUsuario(undefined);
      setToken(undefined);
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        setUsuario,
        setToken,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
