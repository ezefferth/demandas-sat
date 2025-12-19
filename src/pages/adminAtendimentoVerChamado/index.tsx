import { useLocation, useNavigate } from "react-router-dom";
import { Demanda } from "../../components/types";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/data/context/dataContext";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import ModalAddComentario from "./modalAdd";
import { AuthContext } from "../../components/data/context/authContext";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import ModalStatus from "./modalStatus";
import ModalPrioridade from "./modalPrioridade";
import ModalPatrimonio from "./modalPatrimonio";
import ModalAddFinalizar from "./modalFinalizar";
import { LerComentarios } from "../../components/data/fetch/comentario/lerComentarios";
import AvatarUsuario from "./avatarUser";
import ModalAddAnexo from "./modalAddAnexo";
import { ListaDocumentos, ListaDocumentosComentarios } from "./doc";
import { LerDocumento } from "../../components/data/fetch/documentos/lerDocumentos";
import ModalAtualizaAssunto from "./modalAssunto";
import ModalAtualizaSetor from "./modalSetor";

export default function VerChamadoAdmin() {
  const { usuario } = useContext(AuthContext);

  const {
    demandas,
    countDemanda,
    countDemandaAtual,
    assuntos,
    setores,
    comentarios,
    setComentarios,
    usuarios,
    status,
    prioridades,
    documentos,
    setDocumentos,
  } = useContext(DataContext);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openAtualizaAssunto, setOpenAtualizaAssunto] = useState<boolean>(false);
  const handleOpenAtualizaAssunto = () => setOpenAtualizaAssunto(true);
  const handleCloseAtualizaAssunto = () => setOpenAtualizaAssunto(false);

  const [openAtualizaSetor, setOpenAtualizaSetor] = useState<boolean>(false);
  const handleOpenAtualizaSetor = () => setOpenAtualizaSetor(true);
  const handleCloseAtualizaSetor = () => setOpenAtualizaSetor(false);

  const [openAddDoc, setOpenAddDoc] = useState(false);
  const handleOpenDoc = () => setOpenAddDoc(true);
  const handleCloseDoc = () => setOpenAddDoc(false);

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
  const demanda = location.state as Demanda;

  const [localDemanda, setLocalDemanda] = useState<Demanda>(demanda);

  const [duration, setDuration] = useState("");
  // const [comentarioId, setComentarioId] = useState<string | undefined>(
  //   undefined
  // );

  useEffect(() => {
    if (!localDemanda?.createdAt) return;

    // Função para calcular a duração
    const calculateDuration = () => {
      const startTime = new Date(localDemanda.createdAt).getTime();
      const endTime = localDemanda.finishedAt
        ? new Date(localDemanda.finishedAt).getTime()
        : Date.now(); // Usa o momento atual se o chamado estiver em andamento

      const diffInSeconds = Math.floor((endTime - startTime) / 1000);

      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setDuration(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    if (!localDemanda.finishedAt) {
      // Atualiza a cada segundo se o chamado estiver em andamento
      const intervalId = setInterval(calculateDuration, 1000);
      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    } else {
      // Calcula uma única vez se o chamado estiver finalizado
      calculateDuration();
    }
  }, [localDemanda?.createdAt, localDemanda?.finishedAt]);

  const [setorDestino, setSetorDestino] = useState<string>("");

  const handleDoc = async () => {
    await LerDocumento({ setDocumentos, demandaId: Number(localDemanda.id) });
  };

  useEffect(() => {
    const assunto = assuntos?.find(
      (assunto) => assunto.id === localDemanda.assuntoId
    );

    const setorDestinoId = assunto?.setorId;

    const nome = setores?.find((setor) => setor.id === setorDestinoId)?.nome;

    if (nome) setSetorDestino(nome);

    handleDoc();
  }, [localDemanda]);

  const navigate = useNavigate();

  const handleFinalizar = () => {
    if (localDemanda.finishedAt) {
      window.alert(
        "Não é possível finalizar o chamado pois já se econtra finalizado!"
      );
      return;
    } else {
      handleOpenFinalizar();
    }
  };

  useEffect(() => {
    if (demandas && demanda) {
      // Encontra o chamado correspondente
      const demandaCorrespondente = demandas.find((ch) => ch.id === demanda.id);

      // Atualiza o estado localDemanda se o chamado correspondente for encontrado
      if (demandaCorrespondente) {
        setLocalDemanda(demandaCorrespondente);
      }
    }
  }, [demandas, demanda]);

  useEffect(() => {
    if (!usuario) {
      // setComentariosTodos([])
      return;
    } // Aguarda o usuário estar logado

    const fetchComentariosAdmin = async () => {
      try {
        if ((countDemandaAtual) && (countDemanda) && countDemandaAtual < countDemanda) {
          try {
            await LerComentarios({
              demandaId: Number(localDemanda.id),
              setComentarios,
            });
          } catch (error) {
            console.error("Erro ao buscar comentários:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar comentários (admin):", error);
      }
    };

    fetchComentariosAdmin();
  }, [localDemanda, countDemanda, countDemandaAtual]);

  if (localDemanda) {
    return (
      <div className="p-12">
        <button
          className="bg-slate-600 p-1 rounded-md hover:bg-slate-700 transition-all active:bg-slate-800"
          onClick={() => navigate("/atendimento")}
        >
          <FaArrowLeftLong className="text-white" />
        </button>

        <div className="mt-4 p-8 text-slate-600 w-[32rem] mx-auto border-2 border-gray-300 rounded-lg shadow-lg bg-[#EEEEEE] font-thin">
          <div className="flex justify-evenly items-center">
            {/* <div className='w-10' /> */}
            <div>
              <p className="text-xl font-semibold text-slate-800">
                Demanda N.º{demanda.id}
              </p>
            </div>
            <div>
              <AvatarUsuario
                usuarioId={localDemanda.usuarioId}
                usuarios={usuarios}
              />
            </div>
          </div>
          {!localDemanda.finishedAt ? (
            <div className="flex justify-end mt-4">
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
          )}
          <div className="flex mb-1 mt-4 justify-between">
            <div className="w-24">
              <p>Status:</p>
            </div>
            <div>
              {localDemanda.statusId ? (
                status?.map((st) => {
                  if (st.id === localDemanda.statusId) {
                    return (
                      <button
                        key={st.id}
                        className="cursor-pointer rounded-lg px-2 text-slate-950"
                        style={{ backgroundColor: st.cor }}
                        onClick={() => {
                          if (!localDemanda.finishedAt) {
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
              )}
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Prioridade:</p>
            </div>
            <div>
              {localDemanda.prioridadeId ? (
                prioridades?.map((st) => {
                  if (st.id === localDemanda.prioridadeId) {
                    return (
                      <button
                        key={st.id}
                        className="cursor-pointer rounded-lg px-2 text-slate-950"
                        style={{ backgroundColor: st.cor }}
                        onClick={() => {
                          if (!localDemanda.finishedAt) {
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
              )}
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Patrimônios:</p>
            </div>
            <div className="flex items-center gap-2">
              {localDemanda.patrimonios &&
                localDemanda.patrimonios.length > 0 ? (
                localDemanda.patrimonios.map((st, index) => (
                  <p key={index}>{st.patrimonio}</p>
                ))
              ) : (
                <p>Nenhum patrimônio vinculado</p>
              )}

              <button
                className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all rounded-lg p-1"
                onClick={handleOpenPatrimonios}
              >
                <FaPlus
                  size={15}
                  className="text-slate-100"
                />
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
                  user.id === localDemanda.usuarioId && (
                    <span key={user.id}>{user.nome}</span>
                  )
              )}
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mb-1 mt-1 justify-between">
            <div className="w-24">
              <p>Assunto:</p>
            </div>
            <div className="flex gap-2 items-center">
              <span>
                {assuntos?.map(
                  (assunto) =>
                    assunto.id === localDemanda.assuntoId && (
                      <span key={assunto.id}>{assunto.nome}</span>
                    )
                )}
              </span>
              {
                !localDemanda.finishedAt && (
                  <button
                    onClick={handleOpenAtualizaAssunto}
                  >
                    <FaEdit
                      size={20}
                      className="cursor-pointer transition-all text-slate-600 hover:text-slate-800"
                    />
                  </button>
                )
              }

            </div>
          </div>

          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Setor:</p>
            </div>
            <div className="flex items-center gap-2">

              {setores?.map(
                (setor) =>
                  setor.id === localDemanda.setorId && (
                    <span key={setor.id}>{setor.nome}</span>
                  )
              )}
              {
                !localDemanda.finishedAt && (
                  <button
                    onClick={handleOpenAtualizaSetor}
                  >
                    <FaEdit
                      size={20}
                      className="cursor-pointer transition-all text-slate-600 hover:text-slate-800"
                    />
                  </button>
                )
              }


            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Setor Destino:</p>
            </div>
            <div>
              <span>{setorDestino}</span>
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Descrição:</p>
            </div>
            <div>
              <p className="pl-2 ">{localDemanda.descricao}</p>
            </div>
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Data de abertura:</p>
            </div>
            <div>
              <p>
                {localDemanda?.createdAt
                  ? new Date(localDemanda.createdAt).toLocaleString()
                  : ""}
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
                {localDemanda?.updatedAt
                  ? new Date(localDemanda.updatedAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>
          {localDemanda?.finishedAt && (
            <>
              <div className="border-b border-slate-300 my-1 w-full" />
              <div className="flex mt-1 mb-1 justify-between">
                <div className="w-36">
                  <p>Finalizado:</p>
                </div>
                <div>
                  <p>{new Date(localDemanda.finishedAt).toLocaleString()}</p>
                </div>
              </div>
            </>
          )}
          {localDemanda?.finalizadoPor && (
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
                        user.id === localDemanda.finalizadoPor && (
                          <span key={user.id}>{user.nome}</span>
                        )
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Duração:</p>
            </div>
            <div>
              <p>{duration}</p>
            </div>
          </div>

          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-3 justify-between">
            <div className="w-36">
              <p>Anexos:</p>
            </div>
            <div>
              {!localDemanda.finishedAt && (
                <button
                  onClick={handleOpenDoc}
                  className="px-2 flex justify-center items-center gap-2 bg-slate-600 hover:bg-slate-800 transition-all text-slate-50 rounded-md active:bg-slate-900"
                >
                  <FaPlus className="" /> Anexo
                </button>
              )}
            </div>
          </div>
          {documentos && documentos?.length > 0 && (
            <ListaDocumentos documentos={documentos} localDemanda={localDemanda} />
          )}

          <div className="mt-10 p-2">
            <div className="flex justify-between">
              <div />
              <p className="text-lg font-bold text-slate-700">Comentários</p>
              {!localDemanda.finishedAt ? (
                <div>
                  <button onClick={handleOpen}>
                    <FaPlusSquare className="text-slate-600 text hover:text-slate-800 transition-all h-6 w-6" />
                  </button>
                </div>
              ) : (
                <div />
                /* pensar em reabrir chamado? */
              )}
            </div>

            <div className="mt-4">
              <div className="space-y-4">
                {comentarios?.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="p-4 border border-gray-300 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-all"
                  >
                    <p className="text-sm text-gray-700 break-words">
                      {comentario.comentario}
                    </p>
                    {documentos && (
                      <ListaDocumentosComentarios
                        documentos={documentos}
                        id={comentario.id}
                      />
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      <span>
                        {usuarios
                          ?.map((usuario) =>
                            usuario.id === comentario.usuarioId
                              ? usuario.nome
                              : null
                          )
                          .filter((nome) => nome !== null)}
                      </span>{" "}
                      |{" "}
                      <span>
                        {new Date(comentario.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ModalAddComentario
          demandaId={demanda.id}
          openAdd={openAdd}
          handleClose={handleClose}
          usuarioId={usuario!.id}
          setOpenAdd={setOpenAdd}
        />
        <ModalStatus
          demanda={localDemanda}
          open={openAddStatus}
          setOpen={setOpenStatus}
          handleClose={handleCloseStatus}
        />
        <ModalPrioridade
          demanda={localDemanda}
          open={openAddPrioridade}
          setOpen={setOpenPrioridade}
          handleClose={handleClosePrioridade}
        />
        <ModalAddFinalizar
          open={openFinalizar}
          setOpen={setOpenFinalizar}
          handleClose={handleCloseFinalizar}
          demanda={localDemanda}
        />

        <ModalPatrimonio
          demanda={localDemanda}
          open={openAddPatrimonios}
          setOpen={setOpenPatrimonios}
        // handleClose={handleClosePatrimonios}
        />
        <ModalAddAnexo
          demandaId={Number(localDemanda.id)}
          openAdd={openAddDoc}
          setOpenAdd={setOpenAddDoc}
          handleClose={handleCloseDoc}
        //comentarioId={comentarioId} // handleClose={handleClosePatrimonios}
        />
        <ModalAtualizaAssunto
          openAdd={openAtualizaAssunto}
          setOpenAdd={setOpenAtualizaAssunto}
          handleClose={handleCloseAtualizaAssunto}
          demandaId={localDemanda.id}
        />
        <ModalAtualizaSetor
          openAdd={openAtualizaSetor}
          setOpenAdd={setOpenAtualizaSetor}
          handleClose={handleCloseAtualizaSetor}
          demandaId={localDemanda.id}
        />
      </div>
    );
  }

  return null;
}
