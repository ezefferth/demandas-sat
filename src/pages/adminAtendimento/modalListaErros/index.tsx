import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useContext } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import Pagination from "@mui/material/Pagination";
import { Demanda } from "../../../components/types";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
};

export default function ModalListaErros({ open, handleClose }: Props) {
  const { demandas, assuntos } = useContext(DataContext);

  // Paginação
  const [currentPageErros, setCurrentPageErros] = useState(1);
  const itemsPerPageErros = 5;
  const indexOfLastItemErros = currentPageErros * itemsPerPageErros;
  const indexOfFirstItemErros = indexOfLastItemErros - itemsPerPageErros;

  const chamadosErros = demandas?.filter(
    (demanda) => demanda.statusId === "f022126a-d338-4aab-af19-0d6e7b31a567"
  );

  const currentItemsErros = chamadosErros?.slice(
    indexOfFirstItemErros,
    indexOfLastItemErros
  );
  const totalPagesErros = Math.ceil(
    (chamadosErros?.length || 0) / itemsPerPageErros
  );

  const handleChangePageErros = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPageErros(value);
    console.log(event)
  };

  const navigate = useNavigate()

  const handleSeletedVisualizar = (e: React.MouseEvent<HTMLButtonElement>, demanda: Demanda): void => {
    e.preventDefault();

    navigate(`/verChamadoAdmin/`, { state: demanda });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chamados com Erro
        </Typography>

        {/* Tabela de Chamados com Erro */}
        <div className="overflow-x-auto mt-4">
          <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
            <thead>
              <tr className="text-slate-900 font-semibold bg-gray-400">
                <th className="px-2 py-1 border border-slate-300">ID</th>
                <th className="px-2 py-1 border border-slate-300">
                  Descrição
                </th>
                <th className="px-2 py-1 border border-slate-300">Assunto</th>
                <th className="px-2 py-1 border border-slate-300">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItemsErros?.map((chamado, index) => (
                <tr
                  key={chamado.id}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                    } hover:bg-gray-100 transition-all`}
                >
                  <td className="px-2 py-1 border border-slate-300">
                    {chamado.id}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {chamado.descricao}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {
                      assuntos?.find((assunto) => assunto.id === chamado.assuntoId)
                        ?.nome
                    }
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
        </div>

        {/* Paginação */}
        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={totalPagesErros}
            page={currentPageErros}
            onChange={handleChangePageErros}
            color="standard"
            shape="rounded"
          />
        </div>
      </Box>
    </Modal>
  );
}
