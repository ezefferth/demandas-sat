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
import StatusPage from "../../pages/adminConfigStatus";
import Prioridades from "../../pages/adminConfigPrioridades";
import VerChamadoAdmin from "../../pages/adminAtendimentoVerChamado";
import Sugestoes from "../../pages/adminConfigSugestoes";
import Patrimonios from "../../pages/adminConfigPatrimonio";
import PageNotFoundAdminTI from "../../pages/pageNotFoundAdminTI";
// import { useContext } from "react";
// import { AuthContext } from "../data/context/authContext";
import MateriaisPage from "../../pages/adminConfigMateriais";

export default function Router() {

  // const { usuario } = useContext(AuthContext)

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
        {/* <Route
          path="/atendimento"
          element={
            <AdminRoute>
              {
                usuario && usuario.id === "45fecf0b-5568-44ca-9f73-3b6d32eb0e70" ? <PageNotFoundAdminTI /> : <Atendimento />
              }

            </AdminRoute>
          }
        /> */}
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
          path="/config/materiais"
          element={
            <AdminRoute>
              <MateriaisPage />
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
          path="/config/patrimonios"
          element={
            <AdminRoute>
              <Patrimonios />
            </AdminRoute>
          }
        />
        <Route
          path="/config/sugestoes"
          element={
            <AdminRoute>
              <Sugestoes />
            </AdminRoute>
          }
        />
        <Route
          path="/pageNotFoundAdminTI"
          element={
            <AdminRoute>
              <PageNotFoundAdminTI />
            </AdminRoute>
          }
        />
        <Route
          path="/pageNotFound"
          element={<PageNotFound />}
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