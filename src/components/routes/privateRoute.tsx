import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../data/context/authContext"; // ajuste o caminho conforme necessário
import Carregando from "../../pages/carregando";

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { usuario, loading } = useContext(AuthContext);

  if (loading) {
    // Exibe um spinner ou tela de carregamento enquanto verifica a autenticação
    return <Carregando />;
  }

  if (!usuario) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" />;
  }

  // Renderiza o componente filho se o usuário estiver autenticado
  return children;
}

export default PrivateRoute;