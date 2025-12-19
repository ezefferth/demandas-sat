import { FaExclamationCircle, FaSearch } from "react-icons/fa";
import { Demanda } from "../../components/types";
import { useContext, useState } from "react";
import { DataContext } from "../../components/data/context/dataContext";
import { Pagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { AuthContext } from "../../components/data/context/authContext";
import ModalListaErros from "./modalListaErros";
import { FaPlus } from "react-icons/fa6";
import { LerDemandas } from "../../components/data/fetch/chamados/lerChamados";
import { toast } from "react-toastify";
import ModalAddDemanda from "./modalAdd";

export default function Atendimento() {

  const { usuario } = useContext(AuthContext);

  

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const { demandas, assuntos, status, prioridades, setDemandas, setores, usuarios } =
    useContext(DataContext);

  const navigate = useNavigate();

  /* ============= PAGINACAO AGUARDANDO TRIAGEM ============= */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular o índice inicial e final da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrar os demandas para exibir apenas os da página atual

  const filtereddemandas = demandas?.filter(
    (demanda: Demanda) => demanda.statusId === null
  );

  const currentItems = filtereddemandas
    ? filtereddemandas.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // Total de páginas
  const totalPages = Math.ceil(currentItems!.length / itemsPerPage);

  /* ============= PAGINACAO AGUARDANDO TRIAGEM ============= */
  /* ============= PAGINACAO EM ATENDIMENTO ============= */
  const [currentPageNotNull, setCurrentPageNotNull] = useState(1);
  const indexOfLastItemNotNull = currentPageNotNull * itemsPerPage;
  const indexOfFirstItemNotNull = indexOfLastItemNotNull - itemsPerPage;

  // Filtrar os demandas com `statusId !== null`
  const filtereddemandasNotNull = demandas?.filter(
    (demanda: Demanda) =>
      demanda.statusId !== null &&
      demanda.finishedAt === null &&
      demanda.statusId !== "f022126a-d338-4aab-af19-0d6e7b31a567"
  ); //f022126a-d338-4aab-af19-0d6e7b31a567

  const currentItemsNotNull = filtereddemandasNotNull
    ? filtereddemandasNotNull.slice(indexOfFirstItemNotNull, indexOfLastItemNotNull)
    : [];
  const totalPagesNotNull = Math.ceil(
    (filtereddemandasNotNull?.length || 0) / itemsPerPage
  );
  /* ============= PAGINACAO EM ATENDIMENTO ============= */
  /* ============= PAGINACAO FINALIZADOS ============= */
  const [currentPageFinalizados, setCurrentPageFinalizados] = useState(1);
  const indexOfLastItemFinalizados = currentPageFinalizados * itemsPerPage;
  const indexOfFirstItemFinalizados = indexOfLastItemFinalizados - itemsPerPage;

  // Filtrar os demandas com `statusId !== null`
  const filtereddemandasFinalizados = demandas?.filter(
    (demanda: Demanda) =>
      demanda.finishedAt !== null &&
      demanda.statusId !== "f022126a-d338-4aab-af19-0d6e7b31a567"
  );

  const currentItemsFinalizados = filtereddemandasFinalizados
    ? filtereddemandasFinalizados.slice(indexOfFirstItemFinalizados, indexOfLastItemFinalizados)
    : [];
  const totalPagesFinalizados = Math.ceil(
    (filtereddemandasFinalizados?.length || 0) / itemsPerPage
  );
  /* ============= PAGINACAO FINALIZADOS ============= */

  function CalculaDuracaoEAtraso(demanda: Demanda) {
    if (!demanda?.createdAt) return { duration: "", atraso: 0 };

    const startTime = new Date(demanda.createdAt).getTime();
    const endTime = demanda.finishedAt
      ? new Date(demanda.finishedAt).getTime()
      : Date.now(); // Usa o momento atual se o demanda estiver em andamento

    const diffInSeconds = Math.floor((endTime - startTime) / 1000);

    // Calcular duração formatada
    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const duration = `${days}d ${hours}h ${minutes}m`;

    // Calcular atraso em minutos
    const atraso = Math.floor(diffInSeconds / 60); // Total em minutos

    return { duration, atraso };
  }

  const handleChangePage = (_: any, page: number) => {
    setCurrentPage(page);
  };
  const handleChangePageNotNull = (_: any, page: number) => {
    setCurrentPageNotNull(page);
  };

  const handleChangePageFinalizados = (_: any, page: number) => {
    setCurrentPageFinalizados(page);
  };

  const handleSeletedVisualizar = (
    e: React.MouseEvent<HTMLButtonElement>,
    demanda: Demanda
  ): void => {
    e.preventDefault();

    navigate(`/verDemandaAdmin/`, { state: demanda });
  };

  const handleUpdatedemandas = async () => {
    if (usuario) {
      try {
        if (usuario.admin) {
          await LerDemandas({ setDemandas });
        } else {
          // const id = usuario.id;
          await LerDemandas({ setDemandas });
        }
        toast.success("Atualizado com sucesso!")

      } catch (error) {
        toast.error("Erro ao atualizar demandas!")
      }
    }
  };

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Atendimento</p>
        </div>
        <div className="gap-2 flex justify-between">
          <button onClick={handleOpenAdd} className="bg-slate-600 bg:text-slate-800 transition-all text-slate-50 px-3 py-1 rounded-lg flex gap-1 items-center">
            {/* <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" /> */}
            <FaPlus />Novo demanda
          </button>
          <button
            className="bg-slate-700 p-1 rounded-md hover:bg-slate-600 active:bg-slate-500"
            onClick={handleUpdatedemandas}
          >
            <RxUpdate
              size={20}
              color="#fff"
              className="hover:animate-spin"
            />
          </button>
        </div>
      </div>

      <div className="mt-8 text-slate-900 mx-auto">
        <div className="mb-2">
          <span className="border-b-2 px-4 border-gray-400">
            Aguardando Triagem
          </span>
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Setor</th>
              <th className="px-2 py-1 border border-slate-300">
                Setor Destino
              </th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((demanda: Demanda, index: number) => (
              <tr
                key={demanda.id}
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300">
                  {demanda.id}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {/* <Tooltip title={demanda.descricao} placement="bottom-start">
                    <p>
                      <span>{demanda.descricao}</span>
                      <br /><span>{usuarios?.find((user) => user.id === demanda.usuarioId)?.nome}</span>
                    </p>
                  </Tooltip> */}
                  <Tooltip title={`${demanda.descricao} / ${usuarios?.find((user) => user.id === demanda.usuarioId)?.nome}`} placement="bottom-start">
                    <span>{demanda.descricao}</span>
                  </Tooltip>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {setores?.find((setor) => setor.id === demanda.setorId)?.nome}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {setores?.find(
                    (setor) =>
                      setor.id ===
                      assuntos?.find(
                        (assunto) => assunto.id === demanda.assuntoId
                      )?.setorId
                  )?.nome ?? "Setor não encontrado"}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {
                    assuntos?.find(
                      (assunto) => assunto.id === demanda.assuntoId
                    )?.nome
                  }
                </td>
                <td className="px-2 py-1 border border-slate-300">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => handleSeletedVisualizar(e, demanda)}
                    >
                      <FaSearch
                        size={20}
                        className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="standard"
            shape="rounded"
          />
        </div>
      </div>

      <div className="mt-2 text-slate-900 mx-auto">
        <div className="mb-2 mt-4 flex justify-between">
          <span className="border-b-2 px-4 border-gray-400">
            Em Atendimento
          </span>
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Data</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Setor</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300">Status</th>
              <th className="px-2 py-1 border border-slate-300">Prioridade</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItemsNotNull?.map((demanda: Demanda, index: number) => {
              const { atraso, duration } = CalculaDuracaoEAtraso(demanda);

              return (
                <tr
                  key={demanda.id}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-gray-100 transition-all`}
                >
                  <td className="px-2 py-1 border border-slate-300">
                    {demanda.id}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    <p>
                      {demanda.createdAt
                        ? new Date(demanda.createdAt).toLocaleDateString()
                        : ""}
                    </p>
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    <Tooltip title={`${demanda.descricao} / ${usuarios?.find((user) => user.id === demanda.usuarioId)?.nome}`} placement="bottom-start">
                      <span>{demanda.descricao}</span>
                    </Tooltip>
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    <Tooltip
                      title={`Setor de Destino: ${setores?.find(
                        (setor) =>
                          setor.id ===
                          assuntos?.find(
                            (assunto) => assunto.id === demanda.assuntoId
                          )?.setorId
                      )?.nome ?? "Setor não encontrado"
                        }`}
                    >
                      <span>
                        {
                          setores?.find((setor) => setor.id === demanda.setorId)
                            ?.nome
                        }
                      </span>
                    </Tooltip>
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {
                      assuntos?.find(
                        (assunto) => assunto.id === demanda.assuntoId
                      )?.nome
                    }
                  </td>
                  <td className="px-2 py-1 border border-slate-300 w-[12rem] ">
                    <p
                      className="rounded-md flex items-center gap-1 justify-center w-full max-w-[12rem] px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        backgroundColor:
                          status?.find(
                            (status) => status.id === demanda.statusId
                          )?.cor || "transparent",
                      }}
                    >
                      {assuntos?.find(
                        (assunto) => assunto.id === demanda.assuntoId
                      )?.tempoLimite &&
                        atraso > 0 &&
                        assuntos.find(
                          (assunto) => assunto.id === demanda.assuntoId
                        )?.tempoLimite! < atraso && (
                          <Tooltip title={`Atrasado em ${duration}`}>
                            <span>
                              <FaExclamationCircle
                                className="text-slate-800"
                                size={16}
                                style={{
                                  display: "inline-block",
                                  verticalAlign: "middle",
                                }}
                              />
                            </span>
                          </Tooltip>
                        )}
                      {
                        status?.find((status) => status.id === demanda.statusId)
                          ?.nome
                      }
                    </p>
                  </td>
                  <td className="px-2 py-1 border border-slate-300 w-[10rem]">
                    <p
                      className="text-center w-full rounded-md px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        backgroundColor:
                          prioridades?.find(
                            (prioridade) =>
                              prioridade.id === demanda.prioridadeId
                          )?.cor || "transparent",
                      }}
                    >
                      {
                        prioridades?.find(
                          (prioridades) =>
                            prioridades.id === demanda.prioridadeId
                        )?.nome
                      }
                    </p>
                  </td>
                  <td className="px-2 py-1 border border-slate-300">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => handleSeletedVisualizar(e, demanda)}
                      >
                        <FaSearch
                          size={20}
                          className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={totalPagesNotNull}
            page={currentPageNotNull}
            onChange={handleChangePageNotNull}
            color="standard"
            shape="rounded"
          />
        </div>
      </div>

      <div className="mt-2 text-slate-900 mx-auto">
        <div className="mb-2 mt-4">
          <span className="border-b-2 px-4 border-gray-400">Finalizados</span>
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Data</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Setor</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300">Status</th>
              <th className="px-2 py-1 border border-slate-300">Prioridade</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItemsFinalizados?.map((demanda: Demanda, index: number) => (
              <tr
                key={demanda.id}
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300">
                  {demanda.id}
                </td>
                <td className="px-2 py-1 border border-slate-300 w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  <p>
                    {demanda.createdAt
                      ? new Date(demanda.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  <Tooltip title={`${demanda.descricao} / ${usuarios?.find((user) => user.id === demanda.usuarioId)?.nome}`} placement="bottom-start">
                    <span>{demanda.descricao}</span>
                  </Tooltip>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  <Tooltip
                    title={`Setor de Destino: ${setores?.find(
                      (setor) =>
                        setor.id ===
                        assuntos?.find(
                          (assunto) => assunto.id === demanda.assuntoId
                        )?.setorId
                    )?.nome ?? "Setor não encontrado"
                      }`}
                  >
                    <span>
                      {
                        setores?.find((setor) => setor.id === demanda.setorId)
                          ?.nome
                      }
                    </span>
                  </Tooltip>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {
                    assuntos?.find(
                      (assunto) => assunto.id === demanda.assuntoId
                    )?.nome
                  }
                </td>
                <td className="px-2 py-1 border border-slate-300 w-[12rem]">
                  <p
                    className="text-center px-1 rounded-md"
                    style={{
                      backgroundColor:
                        status?.find((status) => status.id === demanda.statusId)
                          ?.cor || "transparent",
                    }}
                  >
                    {
                      status?.find((status) => status.id === demanda.statusId)
                        ?.nome
                    }
                  </p>
                </td>
                <td className="px-2 py-1 border border-slate-300 w-[10rem]">
                  <p
                    className="text-center w-full rounded-md px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{
                      backgroundColor:
                        prioridades?.find(
                          (prioridade) => prioridade.id === demanda.prioridadeId
                        )?.cor || "transparent",
                    }}
                  >
                    {
                      prioridades?.find(
                        (prioridades) => prioridades.id === demanda.prioridadeId
                      )?.nome
                    }
                  </p>
                </td>
                <td className="px-2 py-1 border border-slate-300">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => handleSeletedVisualizar(e, demanda)}
                    >
                      <FaSearch
                        size={20}
                        className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={totalPagesFinalizados}
            page={currentPageFinalizados}
            onChange={handleChangePageFinalizados}
            color="standard"
            shape="rounded"
          />
        </div>
      </div>

      <div className="text-center mt-16">
        <button
          onClick={handleOpen}
          className="border rounded-md px-4 py-1 bg-slate-300 border-slate-500 hover:bg-slate-400 transition-all"
        >
          Listar demandas aberto por erro
        </button>
      </div>
      <ModalAddDemanda
        openAdd={openAdd}
        handleClose={handleCloseAdd}
        setOpenAdd={setOpenAdd}
      />

      <ModalListaErros
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
