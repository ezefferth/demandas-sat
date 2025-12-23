
import { Demanda } from "../../components/types";
import { useContext, useState } from "react";
import { DataContext } from "../../components/data/context/dataContext";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { AuthContext } from "../../components/data/context/authContext";
import ModalListaErros from "./modalListaErros";
import { FaPlus } from "react-icons/fa6";
import { LerDemandas } from "../../components/data/fetch/demandas/lerDemandas";
import { toast } from "react-toastify";
import ModalAddDemanda from "./modalAdd";
import { LerSolicitacaoMateriais } from "../../components/data/fetch/demandasSolicitacaoMateriais/lerSolicitacaoMaterial";
import { TabelaSolicitacaoMaterial } from "./tabelaSolicitacaoMaterial";
import { TabelaDemanda } from "./tabelaDemandas/tabelaDemandas.tsx";


type TipoAtendimento = "DEMANDA" | "MATERIAL";

export default function Atendimento() {

  const { usuario } = useContext(AuthContext);

  const [tipoAtendimento, setTipoAtendimento] =
    useState<TipoAtendimento>("DEMANDA");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const {
    setSolicitacaoMaterial,
    demandas,
    assuntos,
    status,
    prioridades,
    setDemandas,
    setores,
    solicitacaoMaterial
  } = useContext(DataContext);

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

        await LerDemandas({ setDemandas });
        toast.success("Demandas atualizado com sucesso!")

      } catch (error) {
        toast.error("Erro ao atualizar demandas!")
      }
      try {
        await LerSolicitacaoMateriais({ setSolicitacaoMaterial });
        toast.success("Demandas materiais com sucesso!")

      } catch (error) {
        toast.error("Erro ao atualizar demandas!")
      }
    }
  };

  const ITEMS_PER_PAGE = 5;

  const [pageAguardando, setPageAguardando] = useState(1);
  const [pageAtendimento, setPageAtendimento] = useState(1);
  const [pageFinalizadas, setPageFinalizadas] = useState(1);

  const solicitacoesAguardando = solicitacaoMaterial?.filter(
    (s) => s.statusDemandaId === null
  );

  const solicitacoesEmAtendimento = solicitacaoMaterial?.filter(
    (s) => s.statusDemandaId !== null && s.finishedAt === null
  );

  const solicitacoesFinalizadas = solicitacaoMaterial?.filter(
    (s) => s.finishedAt !== null
  );

  // const paginate = (data: any[], page: number) => {
  //   const start = (page - 1) * ITEMS_PER_PAGE;
  //   return data.slice(start, start + ITEMS_PER_PAGE);
  // };



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

      <div className="flex mt-6 justify-center gap-3">
        <button
          onClick={() => setTipoAtendimento("DEMANDA")}
          className={`px-4 py-1 rounded transition-all ${tipoAtendimento === "DEMANDA"
            ? "bg-slate-600 text-white"
            : "bg-slate-300 hover:bg-slate-400"
            }`}
        >
          Demandas (Serviço / Patrimônio)
        </button>

        <button
          onClick={() => setTipoAtendimento("MATERIAL")}
          className={`px-4 py-1 rounded transition-all ${tipoAtendimento === "MATERIAL"
            ? "bg-slate-600 text-white"
            : "bg-slate-300 hover:bg-slate-400"
            }`}
        >
          Solicitações de Materiais
        </button>
      </div>

      {
        tipoAtendimento === "DEMANDA" ? (
          <>
            <TabelaDemanda
              titulo="Aguardando Triagem"
              demandas={currentItems}
              setores={setores}
              assuntos={assuntos}
              status={status}
              prioridades={prioridades}
              paginacao={
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handleChangePage}
                  shape="rounded"
                />
              }
              onVisualizar={handleSeletedVisualizar}
            />
            <TabelaDemanda
              titulo="Em Atendimento"
              demandas={currentItemsNotNull}
              setores={setores}
              assuntos={assuntos}
              status={status}
              prioridades={prioridades}
              paginacao={
                <Pagination
                  count={totalPagesNotNull}
                  page={currentPageNotNull}
                  onChange={handleChangePageNotNull}
                  shape="rounded"
                />
              }
              onVisualizar={handleSeletedVisualizar}
            />
            <TabelaDemanda
              titulo="Finalizados"
              demandas={currentItemsFinalizados}
              setores={setores}
              assuntos={assuntos}
              status={status}
              prioridades={prioridades}
              paginacao={
                <Pagination
                  count={totalPagesFinalizados}
                  page={currentPageFinalizados}
                  onChange={handleChangePageFinalizados}
                  shape="rounded"
                />
              }
              onVisualizar={handleSeletedVisualizar}
            />

            <div className="text-center mt-16">
              <button
                onClick={handleOpen}
                className="border rounded-md px-4 py-1 bg-slate-300 border-slate-500 hover:bg-slate-400 transition-all"
              >
                Listar demandas aberto por erro
              </button>
            </div>
          </>
        ) : (
          <>
            {tipoAtendimento === "MATERIAL" && (
              <>
                <div>
                  <TabelaSolicitacaoMaterial
                    titulo="Aguardando Triagem"
                    dados={solicitacoesAguardando}
                    mostrarPrioridade={false}

                  />
                  <div className="flex justify-center items-center mt-4">
                    <Pagination
                      count={Math.ceil((solicitacoesAguardando?.length ?? 0) / ITEMS_PER_PAGE)}
                      page={pageAguardando}
                      onChange={(_, value) => setPageAguardando(value)}
                      color="standard"
                      shape="rounded"
                    />
                  </div>
                </div>
                <div>
                  <TabelaSolicitacaoMaterial
                    titulo="Em Atendimento"
                    dados={solicitacoesEmAtendimento}
                    mostrarPrioridade={true}
                  />
                  <div className="flex justify-center items-center mt-4">
                    <Pagination
                      count={Math.ceil((solicitacoesEmAtendimento?.length ?? 0) / ITEMS_PER_PAGE)}
                      page={pageAtendimento}
                      onChange={(_, value) => setPageAtendimento(value)}
                      color="standard"
                      shape="rounded"
                    />
                  </div>
                </div>
                <div>
                  <TabelaSolicitacaoMaterial
                    titulo="Finalizados"
                    dados={solicitacoesFinalizadas}
                    mostrarPrioridade={true}
                  />
                  <div className="flex justify-center items-center mt-4">
                    <Pagination
                      count={Math.ceil((solicitacoesFinalizadas?.length ?? 0) / ITEMS_PER_PAGE)}
                      page={pageFinalizadas}
                      onChange={(_, value) => setPageFinalizadas(value)}
                      color="standard"
                      shape="rounded"
                    />
                  </div>
                </div>
              </>
            )}
          </>

        )
      }


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
