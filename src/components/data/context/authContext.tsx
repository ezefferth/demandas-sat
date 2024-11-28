import { createContext, useState } from "react";
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
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: any) {
  const [usuario, setUsuario] = useState<Usuario | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const navigate = useNavigate();
  

  // Função de logout
  const logout = async () => {
    try {
      // Faz uma requisição ao backend para limpar o cookie
      await axios.post(
        "http://10.21.39.75:4001/logout",
        {},
        { withCredentials: true }
      );

      // Limpa o estado do usuário e redireciona para a página de login
      setUsuario(undefined);
      setToken(undefined);

      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Função de login
  const login = async (nomeUsuario: string, senha: string) => {
    try {
      const response = await axios.post(
        "http://10.21.39.75:4001/loginUsuario",
        {
          nomeUsuario,
          senha,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Erro de login");
      }

      const data = await response.data;
      setUsuario(data.usuario);
      setToken(data.token); // Armazena o token recebido

      // Armazenar o token no localStorage
      localStorage.setItem("token", data.token);

      // Redireciona o usuário para a página inicial
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}