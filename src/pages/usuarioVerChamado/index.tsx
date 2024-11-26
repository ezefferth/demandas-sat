import { useLocation, useNavigate } from 'react-router-dom';
import { Chamado } from '../../components/types';
import { useContext, useState } from 'react';
import { DataContext } from '../../components/data/context/dataContext';
import { FaPlusSquare } from 'react-icons/fa';
import ModalAddComentario from './modalAdd';
import { AuthContext } from '../../components/data/context/authContext';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function VerChamado() {

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);


  const location = useLocation();
  const chamado = location.state as Chamado;

  const { usuario } = useContext(AuthContext)
  const { assuntos, setores, comentarios, usuarios, status } = useContext(DataContext);

  const navigate = useNavigate()


  if (chamado) {
    return (
      <div className="p-12">
        <button className='bg-slate-600 p-1 rounded-sm hover:bg-slate-700 transition-all active:bg-slate-800' onClick={() => navigate(-1)}>
          <FaArrowLeftLong className='text-white' />
        </button>

        <div className="mt-4 p-8 text-slate-600 w-[32rem] mx-auto border-2 rounded-lg shadow-lg bg-gray-100 font-thin">
          <div>
            <p className='text-center text-xl font-semibold text-slate-800'>Chamado N.º{chamado.id}</p>
          </div>

          <div className="flex mb-1 mt-4 justify-between">
            <div className="w-24">
              <p>Status:</p>
            </div>
            <div >
              {
                chamado.statusId ? (
                  status?.map(st => {
                    if (st.id === chamado.statusId) {
                      return <span key={st.id}>{st.nome}</span>;
                    }
                  })
                ) : (
                  <p>Aguardando triagem</p>
                )
              }
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Assunto:</p>
            </div>
            <div>
              {assuntos?.map(
                (assunto) =>
                  assunto.id === chamado.assuntoId && <span key={assunto.id}>{assunto.nome}</span>
              )}
            </div>
          </div>


          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Setor:</p>
            </div>
            <div>
              {setores?.map(
                (setor) =>
                  setor.id === chamado.setorId && <span key={setor.id}>{setor.nome}</span>
              )}
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Descrição:</p>
            </div>
            <div>
              <p className='pl-2 text-justify'>{chamado.descricao}</p>
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Data de abertura:</p>
            </div>
            <div>
              <p>
                {chamado?.createdAt
                  ? new Date(chamado.createdAt).toLocaleString()
                  : ''}
              </p>
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Última atualização:</p>
            </div>
            <div>
              <p>
                {chamado?.updatedAt
                  ? new Date(chamado.updatedAt).toLocaleString()
                  : ''}
              </p>
            </div>
          </div>
          {
            chamado?.finishedAt && (
              <>
                <div className="border-b border-slate-300 my-1 w-full" />
                <div className="flex mt-1 mb-1 justify-between">
                  <div className="w-36">
                    <p>Encerramento:</p>
                  </div>
                  <div>
                    <p>
                      {new Date(chamado.finishedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </>
            )
          }




          <div className='mt-10 p-2'>
            <div className='flex justify-between'>
              <div />
              <p className='text-lg font-bold text-slate-700'>Comentários</p>
              <button onClick={handleOpen}>
                <FaPlusSquare className="text-slate-600 text hover:text-slate-800 transition-all h-6 w-6" />
              </button>
            </div>

            <div className='mt-4'>
              <div className="space-y-4">
                {comentarios?.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="p-4 border rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-all"
                  >
                    <p className="text-sm text-gray-700">{comentario.comentario}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      <span>{usuarios?.map((usuario) =>
                        usuario.id === comentario.usuarioId ? usuario.nome : null
                      ).filter((nome) => nome !== null)}</span> | <span>{new Date(comentario.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        <ModalAddComentario chamadoId={chamado.id} openAdd={openAdd} handleClose={handleClose} usuarioId={usuario!.id} setOpenAdd={setOpenAdd} />
      </div>
    );
  }

  return null;
}
