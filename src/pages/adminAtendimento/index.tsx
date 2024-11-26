import { FaSearch } from "react-icons/fa";
import { Chamado } from "../../components/types";
import { useContext, useState } from "react";
import { DataContext } from "../../components/data/context/dataContext";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Atendimento() {


  const { chamados, assuntos } = useContext(DataContext)

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
  const totalPages = Math.ceil(chamados!.length / itemsPerPage);

  /* ============= PAGINACAO AGUARDANDO TRIAGEM ============= */
  /* ============= PAGINACAO EM ATENDIMENTO ============= */
  const [currentPageNotNull, setCurrentPageNotNull] = useState(1);
  const indexOfLastItemNotNull = currentPageNotNull * itemsPerPage;
  const indexOfFirstItemNotNull = indexOfLastItemNotNull - itemsPerPage;

  // Filtrar os chamados com `statusId !== null`
  const filteredChamadosNotNull = chamados?.filter(
    (chamado: Chamado) => (chamado.statusId !== null || chamado.prioridadeId !== null) && chamado.finishedAt === null
  );

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
    (chamado: Chamado) => chamado.finishedAt !== null
  );

  const currentItemsFinalizados = filteredChamadosFinalizados?.slice(
    indexOfFirstItemFinalizados,
    indexOfLastItemFinalizados
  );
  const totalPagesFinalizados = Math.ceil(
    (filteredChamadosFinalizados?.length || 0) / itemsPerPage
  );
  /* ============= PAGINACAO FINALIZADOS ============= */


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

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Atendimento</p>
        </div>
      </div>


      <div className="mt-8 px-8 text-slate-900 w-[60rem] mx-auto">
        <div className="mb-2">
          Aguardando Triagem
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
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
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem]">
                  <p className="truncate ">{chamado.descricao}</p>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                  <p className="truncate">
                    {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
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
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="standard"
            shape="rounded"
          />
        </div>
      </div>

      <div className="mt-2 px-8 text-slate-900 w-[60rem] mx-auto">
        <div className="mb-2">
          Em Atendimento
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItemsNotNull?.map((chamado: Chamado, index: number) => (
              <tr
                key={chamado.id}
                className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300">{chamado.id}</td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem]">
                  <p className="truncate ">{chamado.descricao}</p>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                  <p className="truncate">
                    {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
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
            count={totalPagesNotNull}
            page={currentPageNotNull}
            onChange={handleChangePageNotNull}
            color="standard"
            shape="rounded"
          />
        </div>
      </div>

      <div className="mt-2 px-8 text-slate-900 w-[60rem] mx-auto">
        <div className="mb-2">
          Finalizados
        </div>
        <table className="table-auto w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
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
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem]">
                  <p className="truncate ">{chamado.descricao}</p>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                  <p className="truncate">
                    {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
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

    </div >
  )
}
