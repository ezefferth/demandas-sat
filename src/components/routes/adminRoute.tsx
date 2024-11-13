import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../data/context/authContext";

type AdminRouteProps = {
  children: JSX.Element;
};

export default function AdminRoute({ children }: AdminRouteProps) {
  const { usuario } = useContext(AuthContext);

  // Verifica se o usuário está autenticado e é um administrador
  if (!usuario) {
    // Se não for autenticado ou não for admin, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  if (!usuario.admin) {
    // Se não for admin, redireciona para a página de não autorizado
    return <Navigate to="/pageNotFound" />;
  }
  
  // Se for admin, renderiza o componente filho
  return children;
  
}