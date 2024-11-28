import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/data/context/authContext";
import { FaAngleDown, FaAngleUp, FaChartLine, FaCircleUser, FaUsersGear } from 'react-icons/fa6'
import { MdLabelImportantOutline, MdLowPriority } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { SiAwsorganizations } from "react-icons/si";
import { RiOrganizationChart } from "react-icons/ri";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../../components/data/context/dataContext";
import { Button, List, ListItem, Popover } from "@mui/material";
import { Comentario } from "../../components/types";
export default function Home() {

  const { usuario, logout } = useContext(AuthContext)

  const { comentariosTodos, usuarios, chamados } = useContext(DataContext)

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<number>(5);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 5, comentariosTodos?.length || 0)); // Incrementa visibilidade
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  const handleSeletedVisualizar = (e: React.MouseEvent<HTMLDivElement>, comentario: Comentario): void => {
    e.preventDefault();

    if (!chamados || chamados.length === 0) {
      console.error("Lista de chamados está vazia ou indisponível.");
      return;
    }

    // Procura o chamado pelo ID relacionado ao comentário
    const chamado = chamados.find((chamado) => chamado.id === comentario.chamadoId);

    if (chamado) {
      // Navega para a página correta com os dados do chamado como estado
      if (usuario?.admin) {
        navigate(`/verChamadoAdmin`, { state: chamado });
      } else {
        navigate(`/verChamado`, { state: chamado });
      }
      handleClose();
    } else {
      console.error("Chamado não encontrado para o comentário:", comentario);
    }
  };




  return (
    <div className="flex bg-slate-100 h-screen w-screen">
      <ToastContainer />

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
                  src={usuario.avatar}
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
                <FaChartLine className="w-6 h-6 mr-2" />
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
                      <MdLowPriority className="h-5 w-5" />
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
              {/* <div className="flex pb-2 hover:pl-2 transition-all hover:font-bold">
                <FaChartLine className="w-6 h-6 mr-2" />
                <p className="cursor-pointer" onClick={() => navigate('/chamados')}>Dashboard</p>
              </div> */}
              <div className={`pb-2 flex items-center gap-2 hover:pl-2 transition-all ${loc == '/chamados' && 'pl-2 font-bold'}`}>
                <FaSquarePollHorizontal className="w-6 h-6 mr-2 " />
                <p className="cursor-pointer" onClick={() => navigate('/chamados')}>Chamados</p>
              </div>
              <div className={`pb-2 flex items-center gap-2 hover:pl-2 transition-all ${loc == '/configuracoes' && 'pl-2 font-bold'}`}>
                <IoSettingsOutline className="w-6 h-6 mr-2" />
                <p className="cursor-pointer" onClick={() => navigate('/configuracoes')}>Configurações</p>
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
        <div className="fixed top-4 right-5 z-50">
          <button
            className={`text-slate-700 hover:text-slate-600 transition-all ${!open && 'text-slate-500'}`}
            aria-describedby={id}
            onClick={handleClick}
          >
            <FaBell size={25} />
          </button>
        </div>

        <div className="h-full overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <p className="text-center mt-2">Últimos comentários</p>
        {/* Lista de notificações */}
        <List style={{ maxWidth: 450, maxHeight: 300, overflow: "auto" }}>
          {comentariosTodos?.slice(0, visibleItems).map((comentario, index) => (
            <ListItem key={index}>
              <div className="text-xs cursor-pointer text-slate-700 w-[10rem]" onClick={(e) => handleSeletedVisualizar(e, comentario)}>
                <div className="flex gap-2">
                  <p>N.º:</p>
                  <p className="font-semibold">
                    {comentario.chamadoId || "ID não disponível"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p>{usuarios?.find((usuario) => usuario.id === comentario.usuarioId)?.nome || "Usuário não identificado"}</p>
                </div>
                <div className="flex justify-end">
                  <p className="text-[0.65rem]">{new Date(comentario.updatedAt).toLocaleString()}</p>
                </div>
                <div className="border-b border-slate-300 my-1 w-full" />
              </div>
            </ListItem>
          ))}
        </List>

        {/* Botão Ver Mais */}
        {visibleItems < (comentariosTodos?.length || 0) && (
          <Button onClick={handleLoadMore} style={{ width: "100%" }}>
            Ver mais
          </Button>
        )}
      </Popover>
    </div>
  )
}
