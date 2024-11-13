import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../data/context/authContext"; // ajuste o caminho conforme necessário

interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { usuario } = useContext(AuthContext);

  // Verifica se o usuário está autenticado
  if (!usuario) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, renderiza o componente filho
  return children;
}

export default PrivateRoute;