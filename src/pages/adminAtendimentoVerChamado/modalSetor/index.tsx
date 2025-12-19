import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AuthContext } from "../../../components/data/context/authContext";
// import { LerChamadosUser } from "../../../components/data/fetch/chamados/lerChamadosUser";

import { LerDemandas } from "../../../components/data/fetch/chamados/lerChamados";

import { toast } from 'react-toastify';
import { AxiosResponse } from "axios";
import { AtualizarSetorDemanda } from "../../../components/data/fetch/chamados/atualizarSetorChamado";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 15,
  width: "40%",
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void;
  handleClose: (value: boolean) => void;
  demandaId: string;
};

export default function ModalAtualizaSetor({
  openAdd,
  handleClose,
  setOpenAdd,
  demandaId
}: Props) {

  const [setorId, setSetorId] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSetorId(event.target.value);
  };


  const { usuario } = useContext(AuthContext);
  const { setDemandas, setores } =
    useContext(DataContext);


  const handleOnAdd = async () => {
    await LerDemandas({ setDemandas });
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handle = async () => {
    if (loading) return; // impede múltiplos cliques

    setLoading(true);
    const usuarioId = usuario!.id;

    if (
      setorId.length <= 3 &&
      usuarioId.length <= 3
    ) {
      toast.error("Preencha todos os campos obrigatórios!");
      setLoading(false);
      return;
    }

    const promise: Promise<AxiosResponse> = AtualizarSetorDemanda({ id: demandaId, setorId: setorId })

    toast.promise(promise, {
      pending: "Atualizando setor...",
      success: "Setor atualizado com sucesso!",
      error: "Erro ao atualizar setor!",
    });

    try {
      await promise;
      setOpenAdd(false);
      setSetorId("");
      handleOnAdd();
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setSetorId("");
      setOpenAdd(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-center">Atualiza Setor</h2>

          <div className="mt-5">
            <FormControl
              variant="standard"
              sx={{ width: "100%" }}
            >
              <InputLabel sx={{ pl: 1.5 }}>Assunto</InputLabel>
              <Select
                value={setorId}
                onChange={handleChange}
                sx={{ pl: 1.5 }}
              >
                {setores?.map((setor) => (
                  <MenuItem
                    key={setor.id}
                    value={setor.id}
                  >
                    {setor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              className="border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all"
              onClick={() => setOpenAdd(false)}
            >
              Cancelar
            </button>
            <button
              className="border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all"
              onClick={handle}
            >
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
      {/* <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </div>
  );
}
