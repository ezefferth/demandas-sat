import { useLocation, useNavigate } from 'react-router-dom';
import { Chamado } from '../../components/types';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../components/data/context/dataContext';
import { FaPlusSquare } from 'react-icons/fa';
import ModalAddComentario from './modalAdd';
import { AuthContext } from '../../components/data/context/authContext';
import { FaArrowLeftLong, FaPlus } from 'react-icons/fa6';
import ModalStatus from './modalStatus';
import ModalPrioridade from './modalPrioridade';
import ModalPatrimonio from './modalPatrimonio';
import ModalAddFinalizar from './modalFinalizar';
import { LerComentarios } from '../../components/data/fetch/comentario/lerComentarios';
import AvatarUsuario from './avatarUser';



export default function VerChamadoAdmin() {



  const { usuario } = useContext(AuthContext)

  const { chamados, countChamado, countChamadoAtual, assuntos, setores, comentarios, setComentarios, usuarios, status, prioridades } = useContext(DataContext)

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openAddStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);

  const [openAddPatrimonios, setOpenPatrimonios] = useState(false);
  const handleOpenPatrimonios = () => setOpenPatrimonios(true);
  // const handleClosePatrimonios = () => setOpenPatrimonios(false);

  const [openAddPrioridade, setOpenPrioridade] = useState(false);
  const handleOpenPrioridade = () => setOpenPrioridade(true);
  const handleClosePrioridade = () => setOpenPrioridade(false);

  const [openFinalizar, setOpenFinalizar] = useState(false);
  const handleOpenFinalizar = () => setOpenFinalizar(true);
  const handleCloseFinalizar = () => setOpenFinalizar(false);


  const location = useLocation();
  const chamado = location.state as Chamado;

  const [localChamado, setLocalChamado] = useState<Chamado>(chamado);

  const [duration, setDuration] = useState('');



  useEffect(() => {
    if (!localChamado?.createdAt) return;

    // Função para calcular a duração
    const calculateDuration = () => {
      const startTime = new Date(localChamado.createdAt).getTime();
      const endTime = localChamado.finishedAt
        ? new Date(localChamado.finishedAt).getTime()
        : Date.now(); // Usa o momento atual se o chamado estiver em andamento

      const diffInSeconds = Math.floor((endTime - startTime) / 1000);

      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setDuration(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    if (!localChamado.finishedAt) {
      // Atualiza a cada segundo se o chamado estiver em andamento
      const intervalId = setInterval(calculateDuration, 1000);
      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    } else {
      // Calcula uma única vez se o chamado estiver finalizado
      calculateDuration();
    }
  }, [localChamado?.createdAt, localChamado?.finishedAt]);


  const navigate = useNavigate()

  const handleFinalizar = () => {
    if (localChamado.finishedAt) {
      window.alert("Não é possível finalizar o chamado pois já se econtra finalizado!")
      return;
    }
    else {
      handleOpenFinalizar()
    }
  }

  useEffect(() => {
    if (chamados && chamado) {
      // Encontra o chamado correspondente
      const chamadoCorrespondente = chamados.find(ch => ch.id === chamado.id);

      // Atualiza o estado localChamado se o chamado correspondente for encontrado
      if (chamadoCorrespondente) {
        setLocalChamado(chamadoCorrespondente);
      }
    }
  }, [chamados, chamado]);

  useEffect(() => {
    if (!usuario) {
      // setComentariosTodos([])
      return
    }; // Aguarda o usuário estar logado

    const fetchComentariosAdmin = async () => {
      try {
        if (countChamadoAtual < countChamado) {
          try {
            await LerComentarios({ chamadoId: localChamado.id, setComentarios });
          } catch (error) {
            console.error("Erro ao buscar comentários:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar comentários (admin):", error);
      }
    };

    fetchComentariosAdmin();
  }, [localChamado, countChamado, countChamadoAtual])


  if (localChamado) {
    return (
      <div className="p-12">
        <button className='bg-slate-600 p-1 rounded-md hover:bg-slate-700 transition-all active:bg-slate-800' onClick={() => navigate('/atendimento')}>
          <FaArrowLeftLong className='text-white' />
        </button>

        <div className="mt-4 p-8 text-slate-600 w-[32rem] mx-auto border-2 border-gray-300 rounded-lg shadow-lg bg-[#EEEEEE] font-thin">
          <div className='flex justify-evenly items-center'>
            {/* <div className='w-10' /> */}
            <div>
              <p className='text-xl font-semibold text-slate-800'>Chamado N.º{chamado.id}</p>
            </div>
            <div>
              <AvatarUsuario usuarioId={localChamado.usuarioId} usuarios={usuarios || undefined} />
            </div>
          </div>
          {
            !localChamado.finishedAt ? (
              <div className='flex justify-end mt-4'>
                <button
                  className=" bg-gray-500 text-slate-950 rounded-md px-2"

                  type="button"
                  onClick={handleFinalizar}
                >
                  Encerrar chamado
                </button>
              </div>
            ) : (
              <div className="w-10" />
              /* pensar em reabrir chamado? */
            )
          }
          <div className="flex mb-1 mt-4 justify-between">
            <div className="w-24">
              <p>Status:</p>
            </div>
            <div >
              {
                localChamado.statusId ? (
                  status?.map((st) => {
                    if (st.id === localChamado.statusId) {
                      return (
                        <button
                          key={st.id}
                          className="cursor-pointer rounded-lg px-2 text-slate-950"
                          style={{ backgroundColor: st.cor }}
                          onClick={() => {
                            if (!localChamado.finishedAt) {
                              handleOpenStatus();
                            }
                          }}
                        >
                          {st.nome}
                        </button>
                      );
                    }
                    return null; // Retorna null caso a condição não seja atendida
                  })
                ) : (
                  <button
                    className="cursor-pointer bg-gray-300 rounded-lg px-2"
                    onClick={handleOpenStatus}
                  >
                    Aguardando triagem
                  </button>
                )
              }
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Prioridade:</p>
            </div>
            <div >
              {
                localChamado.prioridadeId ? (
                  prioridades?.map((st) => {
                    if (st.id === localChamado.prioridadeId) {
                      return (
                        <button
                          key={st.id}
                          className="cursor-pointer rounded-lg px-2 text-slate-950"
                          style={{ backgroundColor: st.cor }}
                          onClick={() => {
                            if (!localChamado.finishedAt) {
                              handleOpenPrioridade();
                            }
                          }}
                        >
                          {st.nome}
                        </button>
                      );
                    }
                    return null; // Retorna null caso a condição não seja atendida
                  })
                ) : (
                  <button
                    className="cursor-pointer bg-gray-300 rounded-lg px-2"
                    onClick={handleOpenPrioridade}
                  >
                    Vazio
                  </button>
                )
              }
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Patrimônios:</p>
            </div>
            <div className='flex items-center gap-2'>
              {localChamado.patrimonios && localChamado.patrimonios.length > 0 ? (
                localChamado.patrimonios.map((st, index) => (
                  <p key={index}>{st.patrimonio}</p>
                ))
              ) : (
                <p>Nenhum patrimônio vinculado</p>
              )}

              <button
                className="cursor-pointer bg-slate-700 hover:bg-slate-800 transition-all rounded-lg p-1"
                onClick={handleOpenPatrimonios}
              >
                <FaPlus size={15} className='text-slate-100'/>
              </button>
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Solicitante:</p>
            </div>
            <div>
              {usuarios?.map(
                (user) =>
                  user.id === localChamado.usuarioId && <span key={user.id}>{user.nome}</span>
              )}
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
                  assunto.id === localChamado.assuntoId && <span key={assunto.id}>{assunto.nome}</span>
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
                  setor.id === localChamado.setorId && <span key={setor.id}>{setor.nome}</span>
              )}
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Descrição:</p>
            </div>
            <div>
              <p className='pl-2 '>{localChamado.descricao}</p>
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Data de abertura:</p>
            </div>
            <div>
              <p>
                {localChamado?.createdAt
                  ? new Date(localChamado.createdAt).toLocaleString()
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
                {localChamado?.updatedAt
                  ? new Date(localChamado.updatedAt).toLocaleString()
                  : ''}
              </p>
            </div>
          </div>
          {
            localChamado?.finishedAt && (
              <>
                <div className="border-b border-slate-300 my-1 w-full" />
                <div className="flex mt-1 mb-1 justify-between">
                  <div className="w-36">
                    <p>Finalizado:</p>
                  </div>
                  <div>
                    <p>
                      {new Date(localChamado.finishedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </>
            )
          }
          {
            localChamado?.finalizadoPor && (
              <>
                <div className="border-b border-slate-300 my-1 w-full" />
                <div className="flex mt-1 mb-1 justify-between">
                  <div className="w-36">
                    <p>Finalizado por:</p>
                  </div>
                  <div>
                    <p>
                      {usuarios?.map(
                        (user) =>
                          user.id === localChamado.finalizadoPor && <span key={user.id}>{user.nome}</span>
                      )}
                    </p>
                  </div>
                </div>
              </>
            )
          }

          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Duração:</p>
            </div>
            <div>
              <p>
                {duration}
              </p>
            </div>
          </div>

          <div className='mt-10 p-2'>
            <div className='flex justify-between'>
              <div />
              <p className='text-lg font-bold text-slate-700'>Comentários</p>
              {
                !localChamado.finishedAt ? (
                  <div>
                    <button onClick={handleOpen}>
                      <FaPlusSquare className="text-slate-600 text hover:text-slate-800 transition-all h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <div />
                  /* pensar em reabrir chamado? */
                )
              }

            </div>



            <div className='mt-4'>
              <div className="space-y-4">
                {comentarios?.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="p-4 border border-gray-300 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-all"
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
        <ModalStatus
          chamado={localChamado}
          open={openAddStatus}
          setOpen={setOpenStatus}
          handleClose={handleCloseStatus}
        />
        <ModalPrioridade chamado={localChamado}
          open={openAddPrioridade}
          setOpen={setOpenPrioridade}
          handleClose={handleClosePrioridade}
        />
        <ModalAddFinalizar open={openFinalizar}
          setOpen={setOpenFinalizar}
          handleClose={handleCloseFinalizar}
          chamado={localChamado}
        />

        <ModalPatrimonio
          chamado={localChamado}
          open={openAddPatrimonios}
          setOpen={setOpenPatrimonios}
          // handleClose={handleClosePatrimonios}
        />
      </div >
    );
  }

  return null;
}
