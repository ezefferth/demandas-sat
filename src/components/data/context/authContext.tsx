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

  // Configuração global do axios
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://10.21.39.75:4001";
  
  // axios.defaults.baseURL = "http://localhost:4123";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: "http://10.21.39.75:4001",
    // baseURL: "http://localhost:4123",
    withCredentials: true,
  });

  useEffect(() => {
    // axiosInstance.interceptors.request.use((config) => {
    //   const token = localStorage.getItem("authToken");
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // });
    const verificarLogin = async () => {
      try {
        const response = await axiosInstance.get("/verificarUsuario");
        setUsuario(response.data.usuario);
      } catch (error) {
        console.error("Usuário não autenticado:", error);
        setUsuario(undefined);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    const inicializarUsuario = async () => {
      try {
        const response = await axiosInstance.get("/verificarUsuario");
        setUsuario(response.data.usuario);
      } catch {
        setUsuario(undefined);
      }
    };

    // console.log(token)
    inicializarUsuario();
    verificarLogin();
  }, []);

  // Função de logout
  const logout = async () => {
    try {
      // Faz uma requisição ao backend para limpar o cookie
      await axios.post("/logout", {}, { withCredentials: true });

      setUsuario(undefined);

      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Função de login
  const login = async (nomeUsuario: string, senha: string) => {
    const response = await axios.post("/loginUsuario", { nomeUsuario, senha });
    setUsuario(response.data.usuario);
    navigate("/");
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
