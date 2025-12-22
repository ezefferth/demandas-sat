import { useLocation, useNavigate } from "react-router-dom";
import { SolicitacaoMaterial } from "../../components/types";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/data/context/dataContext";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { AuthContext } from "../../components/data/context/authContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import AvatarUsuario from "./avatarUser";
import { LerComentariosSolicitacaoMaterial } from "../../components/data/fetch/comentarioSolicitacao/lerComentarios";
import ModalAddComentarioSolicitacaoMaterial from "./modalAdd";
import ModalStatusSolicitacao from "./modalStatus";
import ModalPrioridadeSolicitacaoMaterial from "./modalPrioridade";
import ModalAtualizaSetorSolicitacaoMaterial from "./modalSetor";
import ModalAprovarItemSolicitacaoMaterial from "./modalAprovaItem";

export default function VerSolicitacaoMaterialAdmin() {
  const { usuario } = useContext(AuthContext);

  const {
    solicitacaoMaterial,
    countSolicitacaoMaterial,
    countSolicitacaoMaterialAtual,
    setores,
    comentariosSolicitacaoMaterial,
    setComentariosSolicitacaoMaterial,
    usuarios,
    status,
    prioridades,
  } = useContext(DataContext);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openAtualizaSetor, setOpenAtualizaSetor] = useState<boolean>(false);
  const handleOpenAtualizaSetor = () => setOpenAtualizaSetor(true);
  const handleCloseAtualizaSetor = () => setOpenAtualizaSetor(false);

  const [openAddStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => setOpenStatus(true);
  const handleCloseStatus = () => setOpenStatus(false);

  const [openAddPrioridade, setOpenPrioridade] = useState(false);
  const handleOpenPrioridade = () => setOpenPrioridade(true);
  const handleClosePrioridade = () => setOpenPrioridade(false);

  const [openFinalizar, setOpenFinalizar] = useState(false);
  const handleOpenFinalizar = () => setOpenFinalizar(true);
  const handleCloseFinalizar = () => setOpenFinalizar(false);

  const location = useLocation();
  const solicitacao = location.state as SolicitacaoMaterial;

  const [localSolicitacaoMaterial, setLocalSolicitacaoMaterial] = useState<SolicitacaoMaterial>(solicitacao);

  const [duration, setDuration] = useState("");
  // const [comentarioId, setComentarioId] = useState<string | undefined>(
  //   undefined
  // );

  useEffect(() => {
    if (!localSolicitacaoMaterial?.createdAt) return;

    // Função para calcular a duração
    const calculateDuration = () => {
      const startTime = new Date(localSolicitacaoMaterial.createdAt).getTime();
      const endTime = localSolicitacaoMaterial.finishedAt
        ? new Date(localSolicitacaoMaterial.finishedAt).getTime()
        : Date.now(); // Usa o momento atual se o chamado estiver em andamento

      const diffInSeconds = Math.floor((endTime - startTime) / 1000);

      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      setDuration(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    if (!localSolicitacaoMaterial.finishedAt) {
      // Atualiza a cada segundo se o chamado estiver em andamento
      const intervalId = setInterval(calculateDuration, 1000);
      return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
    } else {
      // Calcula uma única vez se o chamado estiver finalizado
      calculateDuration();
    }
  }, [localSolicitacaoMaterial?.createdAt, localSolicitacaoMaterial?.finishedAt]);



  const navigate = useNavigate();

  const handleFinalizar = () => {
    if (localSolicitacaoMaterial.finishedAt) {
      window.alert(
        "Não é possível finalizar o chamado pois já se econtra finalizado!"
      );
      return;
    } else {
      handleOpenFinalizar();
    }
  };


  useEffect(() => {
    if (solicitacaoMaterial && solicitacao) {
      // Encontra o chamado correspondente
      const demandaCorrespondente = solicitacaoMaterial.find((ch) => ch.id === solicitacao.id);

      // Atualiza o estado localSolicitacaoMaterial se o chamado correspondente for encontrado
      if (demandaCorrespondente) {
        setLocalSolicitacaoMaterial(demandaCorrespondente);
      }
    }
  }, [solicitacaoMaterial, solicitacao]);

  const [openAprovar, setOpenAprovar] = useState(false);
  const [itemSelecionado, setItemSelecionado] =
    useState<any>(null);

  useEffect(() => {
    if (!usuario) {
      // setComentariosTodos([])
      return;
    } // Aguarda o usuário estar logado

    const fetchComentariosAdmin = async () => {
      try {
        if ((countSolicitacaoMaterialAtual) && (countSolicitacaoMaterial) && countSolicitacaoMaterialAtual < countSolicitacaoMaterial) {
          try {
            await LerComentariosSolicitacaoMaterial({
              solicitacaoId: Number(localSolicitacaoMaterial.id),
              setComentariosSolicitacaoMaterial,
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
  }, [localSolicitacaoMaterial, countSolicitacaoMaterial, countSolicitacaoMaterialAtual]);

  if (localSolicitacaoMaterial) {
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
                {
                  localSolicitacaoMaterial.itens.length > 1 ? (
                    `Solicitação de Materiais N.º${localSolicitacaoMaterial.id}`
                  ) : (
                    `Solicitação de Material N.º${localSolicitacaoMaterial.id}`
                  )
                }
              </p>
            </div>
            <div>
              <AvatarUsuario
                usuarioId={localSolicitacaoMaterial.usuarioId}
                usuarios={usuarios}
              />
            </div>
          </div>
          {!localSolicitacaoMaterial.finishedAt ? (
            <div className="flex justify-end mt-4">
              <button
                className=" bg-gray-500 text-slate-950 rounded-md px-2"
                type="button"
                onClick={handleFinalizar}
              >
                Encerrar demanda
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
              {localSolicitacaoMaterial.statusDemandaId ? (
                status?.map((st) => {
                  if (st.id === localSolicitacaoMaterial.statusDemandaId) {
                    return (
                      <button
                        key={st.id}
                        className="cursor-pointer rounded-lg px-2 text-slate-950"
                        style={{ backgroundColor: st.cor }}
                        onClick={() => {
                          if (!localSolicitacaoMaterial.finishedAt) {
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
              {localSolicitacaoMaterial.prioridadeDemandaId ? (
                prioridades?.map((st) => {
                  if (st.id === localSolicitacaoMaterial.prioridadeDemandaId) {
                    return (
                      <button
                        key={st.id}
                        className="cursor-pointer rounded-lg px-2 text-slate-950"
                        style={{ backgroundColor: st.cor }}
                        onClick={() => {
                          if (!localSolicitacaoMaterial.finishedAt) {
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
              <p>Solicitante:</p>
            </div>
            <div>
              {usuarios?.map(
                (user) =>
                  user.id === localSolicitacaoMaterial.usuarioId && (
                    <span key={user.id}>{user.nome}</span>
                  )
              )}
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
                  setor.id === localSolicitacaoMaterial.setorId && (
                    <span key={setor.id}>{setor.nome}</span>
                  )
              )}
              {
                !localSolicitacaoMaterial.finishedAt && (
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
          {
            localSolicitacaoMaterial.descricao && (
              <>
                <div className="border-b border-slate-300 my-1 w-full" />
                <div className="flex mt-1 mb-1 justify-between">
                  <div className="w-36">
                    <p>Descrição:</p>
                  </div>
                  <div>
                    <p className="pl-2 ">{localSolicitacaoMaterial.descricao}</p>
                  </div>
                </div>
              </>
            )
          }
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="mt-1 space-y-3">
            <div className="w-36">
              <p>Materiais:</p>
            </div>
            {localSolicitacaoMaterial.itens.map((item) => (
              <div
                key={item.id}
                className="border border-slate-300 rounded-md p-3 bg-gray-50"
              >
                <div className="flex justify-between mb-1">
                  <span>Material:</span>
                  <span>{item.material?.nome}</span>
                </div>

                <div className="flex justify-between mb-1">
                  <span>Qtd. solicitada:</span>
                  <span>
                    {item.qtdSolicitada} {item.material?.unidade}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Qtd. aprovada:</span>

                  <span>
                    {
                      item.qtdAprovada === 0 && ("Não aprovado")
                    }
                    {
                      item.qtdAprovada > 0 && `${item.qtdAprovada} ${item.material?.unidade}`
                    }
                    {
                      item.qtdAprovada === null && "Aguardando aprovação"
                    }
                  </span>
                </div>

                {
                  !localSolicitacaoMaterial.finishedAt &&
                    item.qtdAprovada !== null ? (
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => {
                          setItemSelecionado(item);
                          setOpenAprovar(true);
                        }}
                        className="flex items-center text-sm bg-slate-600 text-white px-2 py-0.5 rounded hover:bg-slate-500 transition-all"
                      >
                        Editar avaliação
                      </button>
                    </div>

                  ) : (
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => {
                          setItemSelecionado(item);
                          setOpenAprovar(true);
                        }}
                        className="flex items-center text-sm bg-slate-600 text-white px-2 py-0.5 rounded hover:bg-slate-500 transition-all"
                      >
                        Avaliar
                      </button>
                    </div>
                  )
                }



              </div>
            ))}
          </div>
          <div className="border-b border-slate-300 my-1 w-full" />
          <div className="flex mt-1 mb-1 justify-between">
            <div className="w-36">
              <p>Data de abertura:</p>
            </div>
            <div>
              <p>
                {localSolicitacaoMaterial?.createdAt
                  ? new Date(localSolicitacaoMaterial.createdAt).toLocaleString()
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
                {localSolicitacaoMaterial?.updatedAt
                  ? new Date(localSolicitacaoMaterial.updatedAt).toLocaleString()
                  : ""}
              </p>
            </div>
          </div>
          {localSolicitacaoMaterial?.finishedAt && (
            <>
              <div className="border-b border-slate-300 my-1 w-full" />
              <div className="flex mt-1 mb-1 justify-between">
                <div className="w-36">
                  <p>Finalizado:</p>
                </div>
                <div>
                  <p>{new Date(localSolicitacaoMaterial.finishedAt).toLocaleString()}</p>
                </div>
              </div>
            </>
          )}
          {localSolicitacaoMaterial?.finalizadoPor && (
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
                        user.id === localSolicitacaoMaterial.finalizadoPor && (
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
          {/* <div className="flex mt-1 mb-3 justify-between">
            <div className="w-36">
              <p>Anexos:</p>
            </div>
            <div>
              {!localSolicitacaoMaterial.finishedAt && (
                <button
                  onClick={handleOpenDoc}
                  className="px-2 flex justify-center items-center gap-2 bg-slate-600 hover:bg-slate-800 transition-all text-slate-50 rounded-md active:bg-slate-900"
                >
                  <FaPlus className="" /> Anexo
                </button>
              )}
            </div>
          </div> */}

          <div className="mt-10 p-2">
            <div className="flex justify-between">
              <div />
              <p className="text-lg font-bold text-slate-700">Comentários</p>
              {!localSolicitacaoMaterial.finishedAt ? (
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
                {comentariosSolicitacaoMaterial?.map((comentario) => (
                  <div
                    key={comentario.id}
                    className="p-4 border border-gray-300 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-all"
                  >
                    <p className="text-sm text-gray-700 break-words">
                      {comentario.comentario}
                    </p>
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
        <ModalAddComentarioSolicitacaoMaterial
          solicitacaoId={solicitacao.id}
          openAdd={openAdd}
          handleClose={handleClose}
          usuarioId={usuario!.id}
          setOpenAdd={setOpenAdd}
        />
        <ModalStatusSolicitacao
          solicitacao={localSolicitacaoMaterial}
          open={openAddStatus}
          setOpen={setOpenStatus}
          handleClose={handleCloseStatus}
        />
        <ModalPrioridadeSolicitacaoMaterial
          solicitacao={localSolicitacaoMaterial}
          open={openAddPrioridade}
          setOpen={setOpenPrioridade}
          handleClose={handleClosePrioridade}
        />
        {/*<ModalAddFinalizar
          open={openFinalizar}
          setOpen={setOpenFinalizar}
          handleClose={handleCloseFinalizar}
          demanda={localSolicitacaoMaterial}
        />
        <ModalAddAnexo
          demandaId={Number(localSolicitacaoMaterial.id)}
          openAdd={openAddDoc}
          setOpenAdd={setOpenAddDoc}
          handleClose={handleCloseDoc}
        //comentarioId={comentarioId} // handleClose={handleClosePatrimonios}
        />
        <ModalAtualizaAssunto
          openAdd={openAtualizaAssunto}
          setOpenAdd={setOpenAtualizaAssunto}
          handleClose={handleCloseAtualizaAssunto}
          demandaId={localSolicitacaoMaterial.id}
        /> */}
        {itemSelecionado && (
          <ModalAprovarItemSolicitacaoMaterial
            open={openAprovar}
            setOpen={setOpenAprovar}
            item={itemSelecionado}
          />
        )}
        <ModalAtualizaSetorSolicitacaoMaterial
          openAdd={openAtualizaSetor}
          setOpenAdd={setOpenAtualizaSetor}
          handleClose={handleCloseAtualizaSetor}
          solicitacaoId={localSolicitacaoMaterial.id}
        />
      </div>
    );
  }

  return null;
}
