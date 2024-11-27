// import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import PrivateRoute from "./privateRoute";
// import AdminRoute from "./adminRoute";
// import CadastroUsuario from "../../pages/cadastroUsuario";
import PageNotFound from "../../pages/pageNotFound";
import AdminRoute from "./adminRoute";
import Dashboard from "../../pages/adminDashboard";
import Atendimento from "../../pages/adminAtendimento";
import Assuntos from "../../pages/adminConfigAssuntos";
import Categorias from "../../pages/adminConfigCategoria";
import Setores from "../../pages/adminConfigSetores";
import Usuarios from "../../pages/adminConfigUsuarios";
import Chamados from "../../pages/usuarioChamados";
import StatusPage from "../../pages/adminConfigStatus";
import Prioridades from "../../pages/adminConfigPrioridades";
import VerChamado from "../../pages/usuarioVerChamado";
import VerChamadoAdmin from "../../pages/adminAtendimentoVerChamado";
import UsuarioConfiguracoes from "../../pages/usuarioConfig";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/atendimento"
          element={
            <AdminRoute>
              <Atendimento />
            </AdminRoute>
          }
        />
        <Route
          path="/config/assuntos"
          element={
            <AdminRoute>
              <Assuntos />
            </AdminRoute>
          }
        />
        <Route
          path="/config/categorias"
          element={
            <AdminRoute>
              <Categorias />
            </AdminRoute>
          }
        />
        <Route
          path="/config/setores"
          element={
            <AdminRoute>
              <Setores />
            </AdminRoute>
          }
        />
        <Route
          path="/config/status"
          element={
            <AdminRoute>
              <StatusPage />
            </AdminRoute>
          }
        />
        <Route
          path="/config/prioridades"
          element={
            <AdminRoute>
              <Prioridades />
            </AdminRoute>
          }
        />
        <Route
          path="/config/usuarios"
          element={
            <AdminRoute>
              <Usuarios />
            </AdminRoute>
          }
        />
        <Route
          path="/verChamadoAdmin"
          element={
            <AdminRoute>
              <VerChamadoAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/pageNotFound"
          element={<PageNotFound />}
        />
        <Route
          path="/chamados"
          element={<Chamados />}
        />
        <Route
          path="/configuracoes"
          element={<UsuarioConfiguracoes />}
        />
        <Route
          path="/verChamado"
          element={<VerChamado />}
        />
      </Route>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}