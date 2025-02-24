import { FaExclamationCircle, FaSearch } from "react-icons/fa";
import { Chamado } from "../../components/types";
import { useContext, useState } from "react";
import { DataContext } from "../../components/data/context/dataContext";
import { Pagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { LerChamados } from "../../components/data/fetch/chamados/lerChamados";
import { AuthContext } from "../../components/data/context/authContext";
import ModalListaErros from "./modalListaErros";



export default function Atendimento() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { chamados, assuntos, status, prioridades, setChamados, setores } = useContext(DataContext)

  const { usuario } = useContext(AuthContext)

  const navigate = useNavigate()

  /* ============= PAGINACAO AGUARDANDO TRIAGEM ============= */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calcular o índice inicial e final da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrar os chamados para exibir apenas os da página atual

  const filteredChamados = chamados?.filter(
    (chamado: Chamado) =>
      chamado.statusId === null
      && chamado.prioridadeId === null
  );

  const currentItems = filteredChamados!.slice(indexOfFirstItem, indexOfLastItem);

  // Total de páginas
  const totalPages = Math.ceil(currentItems!.length / itemsPerPage);

  /* ============= PAGINACAO AGUARDANDO TRIAGEM ============= */
  /* ============= PAGINACAO EM ATENDIMENTO ============= */
  const [currentPageNotNull, setCurrentPageNotNull] = useState(1);
  const indexOfLastItemNotNull = currentPageNotNull * itemsPerPage;
  const indexOfFirstItemNotNull = indexOfLastItemNotNull - itemsPerPage;

  // Filtrar os chamados com `statusId !== null`
  const filteredChamadosNotNull = chamados?.filter(
    (chamado: Chamado) => (chamado.statusId !== null || chamado.prioridadeId !== null) && chamado.finishedAt === null
  );//f022126a-d338-4aab-af19-0d6e7b31a567

  const currentItemsNotNull = filteredChamadosNotNull?.slice(
    indexOfFirstItemNotNull,
    indexOfLastItemNotNull
  );
  const totalPagesNotNull = Math.ceil(
    (filteredChamadosNotNull?.length || 0) / itemsPerPage
  );
  /* ============= PAGINACAO EM ATENDIMENTO ============= */
  /* ============= PAGINACAO FINALIZADOS ============= */
  const [currentPageFinalizados, setCurrentPageFinalizados] = useState(1);
  const indexOfLastItemFinalizados = currentPageFinalizados * itemsPerPage;
  const indexOfFirstItemFinalizados = indexOfLastItemFinalizados - itemsPerPage;

  // Filtrar os chamados com `statusId !== null`
  const filteredChamadosFinalizados = chamados?.filter(
    (chamado: Chamado) => chamado.finishedAt !== null && chamado.statusId !== "f022126a-d338-4aab-af19-0d6e7b31a567"
  );


  const currentItemsFinalizados = filteredChamadosFinalizados?.slice(
    indexOfFirstItemFinalizados,
    indexOfLastItemFinalizados
  );
  const totalPagesFinalizados = Math.ceil(
    (filteredChamadosFinalizados?.length || 0) / itemsPerPage
  );
  /* ============= PAGINACAO FINALIZADOS ============= */



  function CalculaDuracaoEAtraso(chamado: Chamado) {
    if (!chamado?.createdAt) return { duration: "", atraso: 0 };

    const startTime = new Date(chamado.createdAt).getTime();
    const endTime = chamado.finishedAt
      ? new Date(chamado.finishedAt).getTime()
      : Date.now(); // Usa o momento atual se o chamado estiver em andamento

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

  const handleSeletedVisualizar = (e: React.MouseEvent<HTMLButtonElement>, chamado: Chamado): void => {
    e.preventDefault();

    navigate(`/verChamadoAdmin/`, { state: chamado });
  };

  const handleUpdateChamados = async () => {
    if (usuario) {
      try {
        if (usuario.admin) {
          await LerChamados({ setChamados });
        } else {
          // const id = usuario.id;
          await LerChamados({ setChamados });
        }
      } catch (error) {
        console.error("Erro ao buscar chamados:", error);
      }
    }
  }

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Atendimento</p>
        </div>
        <button className="bg-slate-700 p-1 rounded-md hover:bg-slate-600 active:bg-slate-500" onClick={handleUpdateChamados}>
          <RxUpdate size={20} color='#fff' className='hover:animate-spin' />
        </button>
      </div>


      <div className="mt-8 px-8 text-slate-900 w-[60rem] mx-auto">
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
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((chamado: Chamado, index: number) => (
              <tr
                key={chamado.id}
                className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300">{chamado.id}</td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {chamado.descricao}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {setores?.find(setor => setor.id === chamado.setorId)?.nome}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
                </td>
                <td className="px-2 py-1 border border-slate-300">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={(e) => handleSeletedVisualizar(e, chamado)}>
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

      <div className="mt-2 px-8 text-slate-900 w-[60rem] mx-auto">
        <div className="mb-2 mt-4 flex justify-between">
          <span className="border-b-2 px-4 border-gray-400">
            Em Atendimento
          </span>

        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Setor</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300">Status</th>
              <th className="px-2 py-1 border border-slate-300">Prioridade</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItemsNotNull?.map((chamado: Chamado, index: number) => {
              const { atraso, duration } = CalculaDuracaoEAtraso(chamado); // Calcula para cada chamado

              return (
                <tr
                  key={chamado.id}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-gray-100 transition-all`}
                >
                  <td className="px-2 py-1 border border-slate-300">{chamado.id}</td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {chamado.descricao}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {setores?.find(setor => setor.id === chamado.setorId)?.nome}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                    <p
                      className="text-center rounded-md flex items-center justify-center gap-2"
                      style={{
                        backgroundColor:
                          status?.find((status) => status.id === chamado.statusId)?.cor ||
                          "transparent",
                      }}
                    >
                      {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.tempoLimite &&
                        atraso > 0 &&
                        assuntos.find((assunto) => assunto.id === chamado.assuntoId)?.tempoLimite! < atraso && (
                          <Tooltip title={`Atrasado em ${duration}`}>
                            <span>
                              <FaExclamationCircle
                                className="text-slate-800"
                                size={16}
                                style={{ display: 'inline-block', verticalAlign: 'middle' }}
                              />
                            </span>
                          </Tooltip>
                        )}

                      {status?.find((status) => status.id === chamado.statusId)?.nome}
                    </p>
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                    <p
                      className="text-center rounded-md"
                      style={{
                        backgroundColor:
                          prioridades?.find(
                            (prioridade) => prioridade.id === chamado.prioridadeId
                          )?.cor || "transparent",
                      }}
                    >
                      {prioridades?.find(
                        (prioridades) => prioridades.id === chamado.prioridadeId
                      )?.nome}
                    </p>
                  </td>
                  <td className="px-2 py-1 border border-slate-300">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={(e) => handleSeletedVisualizar(e, chamado)}>
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

      <div className="mt-2 px-8 text-slate-900 w-[60rem] mx-auto">
        <div className="mb-2 mt-4">
          <span className="border-b-2 px-4 border-gray-400">
            Finalizados
          </span>
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Setor</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300">Status</th>
              <th className="px-2 py-1 border border-slate-300">Prioridade</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItemsFinalizados?.map((chamado: Chamado, index: number) => (
              <tr
                key={chamado.id}
                className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300">{chamado.id}</td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {chamado.descricao}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {setores?.find(setor => setor.id === chamado.setorId)?.nome}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                  <p className="text-center rounded-md" style={{
                    backgroundColor: status?.find(
                      (status) => status.id === chamado.statusId
                    )?.cor || 'transparent',
                  }}>
                    {status?.find((status) => status.id === chamado.statusId)?.nome}
                  </p>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                  <p className="text-center rounded-md" style={{
                    backgroundColor: prioridades?.find(
                      (prioridade) => prioridade.id === chamado.prioridadeId
                    )?.cor || 'transparent',
                  }}>
                    {prioridades?.find((prioridades) => prioridades.id === chamado.prioridadeId)?.nome}
                  </p>
                </td>
                <td className="px-2 py-1 border border-slate-300">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={(e) => handleSeletedVisualizar(e, chamado)}>
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
        <button onClick={handleOpen} className="border rounded-md px-4 py-1 bg-slate-300 border-slate-500 hover:bg-slate-400 transition-all">Listar chamados aberto por erro</button>
      </div>

      <ModalListaErros open={open} handleClose={handleClose} />

    </div >
  )
}
