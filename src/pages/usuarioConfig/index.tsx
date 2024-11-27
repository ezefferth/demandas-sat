import { useContext, useState } from "react"
import { AuthContext } from "../../components/data/context/authContext"
// import ModalEditarDadosUsuario from "./modalEditDados";
import ModalEditarSenhaUsuario from "./modalEditSenha";
import ModalEditarFotoUsuario from "./modalEditFoto";




export default function UsuarioConfiguracoes() {

  // const [openDados, setOpenDados] = useState(false);
  // const handleOpenDados = () => setOpenDados(true);
  // const handleCloseDados = () => setOpenDados(false);

  const [openSenha, setOpenSenha] = useState(false);
  const handleOpenSenha = () => setOpenSenha(true);
  const handleCloseSenha = () => setOpenSenha(false);

  const [openFoto, setOpenFoto] = useState(false);
  const handleOpenFoto = () => setOpenFoto(true);
  const handleCloseFoto = () => setOpenFoto(false);

  const { usuario } = useContext(AuthContext)

  return (
    <div className="p-12">
      <div>
        <h2 className="">Configurações do Usuário</h2>
      </div>
      <div className="mt-4 p-8 text-slate-600 w-[32rem] mx-auto border-2 rounded-lg shadow-lg bg-gray-100 font-thin">
        {/*   <div>
          <p className='text-center text-xl font-semibold text-slate-800'>Chamado N.º</p>
        </div> */}

        <div className="flex mb-1 mt-4 justify-between">
          <div className="w-24">
            <p>Nome:</p>
          </div>
          <div >
            <p>{usuario?.nome}</p>
          </div>
        </div>
        <div className="border-b border-slate-300 my-1 w-full" />
        <div className="flex mb-1 mt-1 justify-between">
          <div className="w-24">
            <p>Login:</p>
          </div>
          <div >
            <p>{usuario?.nomeUsuario}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-200 transition-all" onClick={handleOpenFoto}>{/* border-gray-400 */}
            Alterar Foto
          </button>
          <button className="px-3 py-1 bg-green-200 rounded-md hover:bg-green-100 transition-all" onClick={handleOpenSenha}>
            Alterar Senha
          </button>
          {/* <button className="px-3 py-1 bg-blue-200 rounded-md hover:bg-blue-100 transition-all" onClick={handleOpenDados}>
            Alterar Dados
          </button> */}
        </div>


      </div>
      {/* <ModalEditarDadosUsuario open={openDados} setOpen={setOpenDados} handleClose={handleCloseDados}/> */}

      <ModalEditarSenhaUsuario open={openSenha} setOpen={setOpenSenha} handleClose={handleCloseSenha} />
      <ModalEditarFotoUsuario open={openFoto} setOpen={setOpenFoto} handleClose={handleCloseFoto} />



    </div>
  )
}
