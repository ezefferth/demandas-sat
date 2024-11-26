import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/data/context/authContext";

import { FaAngleDown, FaAngleUp, FaChartLine, FaCircleUser, FaUsersGear } from 'react-icons/fa6'
import { MdLabelImportantOutline, MdLowPriority } from "react-icons/md";

import { FaSquarePollHorizontal } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { SiAwsorganizations } from "react-icons/si";
import { RiOrganizationChart } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {

  const { usuario, logout } = useContext(AuthContext)

  const [loc, setLoc] = useState<string>('')

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setLoc(location.pathname)
  }, [location])

  const [configExpanded, setConfigExpanded] = useState<boolean>(false);

  const toggleConfig = () => {
    setConfigExpanded(!configExpanded);
  };
  return (
    <div className="flex bg-slate-100 h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-600 shadow-lg p-5 flex flex-col h-screen">
        {/* Imagem e Título do Usuário */}
        <div className="space-x-3 mb-6">
          <div className="text-slate-50 text-center">
            <h1 className="font-semibold ">Chama-TI</h1>
            <h2 className="font-semibold pt-2">Help Desk</h2>
            <div className="flex justify-center pt-5">

              {usuario && usuario.avatar ? (
                <img
                  src={`data:image/png;base64,${Buffer.from(usuario.avatar).toString('base64')}`}
                  alt={usuario.nome}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <FaCircleUser className="w-10 h-10 text-slate-100" />
              )}
            </div>
            <div className="pt-4">

              <p className="text-sm text-slate-100">{usuario?.nome}</p>
              {
                usuario?.admin && <p className="text-slate-100">Administrador</p>
              }

            </div>
          </div>
        </div>

        {
          usuario?.admin ? (
            <div className="text-slate-100 mt-4">
              <div className={`flex pb-2 items-center gap-2 hover:pl-2 transition-all ${loc == '/dashboard' && 'pl-2 font-bold'}`}>
                <FaChartLine className="w-6 h-6 mr-2" />{/* io5 IoBarChart */}
                <p className="cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</p>
              </div>
              <div className={`flex pb-2 items-center gap-2 hover:pl-2 transition-all ${loc == '/atendimento' && 'pl-2 font-bold'}`}>
                <TfiHeadphoneAlt className="w-6 h-6 mr-2" />
                <p className="cursor-pointer" onClick={() => navigate('/atendimento')}>Atendimento</p>
              </div>
              <div className="pb-2">
                <div
                  className={`flex items-center transition-all cursor-pointer ${configExpanded ? "pl-2 font-semibold" : "hover:pl-2 hover:font-bold"
                    }`}
                  onClick={toggleConfig}
                >
                  <IoSettingsOutline className="w-6 h-6 mr-2" />
                  <p className="ml-2">Configurações</p>
                  <span className="ml-auto">
                    {configExpanded ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </div>

                {/* Opções do Menu Configurações */}
                {configExpanded && (
                  <div className="pl-12 mt-2 space-y-2">
                    <div className={`flex items-center gap-2 hover:pl-2 transition-all ${loc == '/config/assuntos' && 'pl-2 font-bold'}`}>
                      <MdLabelImportantOutline className="h-5 w-5" />
                      <p className="cursor-pointer" onClick={() => navigate('/config/assuntos')}>Assuntos</p>
                    </div>
                    <div className={`flex items-center gap-2 hover:pl-2 transition-all ${loc == '/config/categorias' && 'pl-2 font-bold'}`}>
                      <SiAwsorganizations className="h-5 w-5" />
                      <p className="cursor-pointer" onClick={() => navigate('/config/categorias')}>Categorias</p>
                    </div>
                    <div className={`flex items-center gap-2 hover:pl-2 transition-all ${loc == '/config/setores' && 'pl-2 font-bold'}`}>
                      <RiOrganizationChart className="h-5 w-5" />
                      <p className="cursor-pointer" onClick={() => navigate('/config/setores')}>Setores</p>
                    </div>
                    <div className={`flex items-center gap-2 hover:pl-2 transition-all ${loc == '/config/status' && 'pl-2 font-bold'}`}>
                      <FaExclamationTriangle className="h-5 w-5" />
                      <p className="cursor-pointer" onClick={() => navigate('/config/status')}>Status</p>
                    </div>
                    <div className={`flex items-center gap-2 hover:pl-2 transition-all ${loc == '/config/prioridades' && 'pl-2 font-bold'}`}>
                      <MdLowPriority  className="h-5 w-5" />
                      <p className="cursor-pointer" onClick={() => navigate('/config/prioridades')}>Pioridades</p>
                    </div>
                    <div className={`flex items-center gap-2 hover:pl-2 transition-all ${loc == '/config/usuarios' && 'pl-2 font-bold'}`}>
                      <FaUsersGear className="h-5 w-5" />
                      <p className="cursor-pointer" onClick={() => navigate('/config/usuarios')}>Usuários</p>
                    </div>
                  </div>
                )}
              </div>
            </div> 
          ) : (
            <div className="text-slate-100 mt-12">
              <div className="flex pb-2 hover:pl-2 transition-all hover:font-bold">
                <FaChartLine className="w-6 h-6 mr-2" />
                <p className="cursor-pointer" onClick={() => navigate('/chamados')}>Dashboard</p>
              </div>
              <div className="flex pb-2 hover:pl-2 transition-all hover:font-bold">
                <FaSquarePollHorizontal className="w-6 h-6 mr-2 " />
                <p className="cursor-pointer" onClick={() => navigate('/chamados')}>Chamados</p>
              </div>
              <div className="flex pb-2 hover:pl-2 transition-all hover:font-bold">
                <IoSettingsOutline className="w-6 h-6 mr-2" />
                <p className="cursor-pointer" >Configurações</p>
              </div>
            </div>
          )
        }
        <div className="flex justify-center mt-auto w-full">
          <button
            onClick={logout}
            className="text-slate-100 hover:text-white px-3 rounded-lg transition-all hover:outline hover:outline-1 hover:transition-all"
          >
            Sair
          </button>
        </div>


      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-grow h-full overflow-hidden">
        <div className="h-full overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>

    </div>
  )
}
