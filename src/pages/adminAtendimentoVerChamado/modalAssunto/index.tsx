import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useMemo, useState } from "react";
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
import { AtualizarAssuntoChamado } from "../../../components/data/fetch/chamados/atualizarAssuntoChamado";
import { LerChamados } from "../../../components/data/fetch/chamados/lerChamados";


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
  chamadoId: string;
};

export default function ModalAtualizaAssunto({
  openAdd,
  handleClose,
  setOpenAdd,
  chamadoId
}: Props) {

  const [assuntoId, setAssuntoId] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setAssuntoId(event.target.value);
  };


  const { usuario } = useContext(AuthContext);
  const { setChamados, assuntos } =
    useContext(DataContext);


  const handleOnAdd = async () => {
    await LerChamados({ setChamados });
  };

  const handle = async () => {
    const usuarioId = usuario!.id;
    try {
      if (
        assuntoId.length >= 3 &&
        usuarioId.length >= 3
      ) {
        await AtualizarAssuntoChamado({ id: chamadoId, assuntoId: assuntoId })

        setOpenAdd(false);
        setAssuntoId("");
        handleOnAdd();
      } else {
        window.alert("Preencha todos os campos obrigatórios.");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setAssuntoId("");
      setOpenAdd(false);
    }
  };

  const [btnInfo, setBtnInfo] = useState<boolean>(true);
  const [btnAsse, setBtnAsse] = useState<boolean>(false);
  const [btnDev, setBtnDev] = useState<boolean>(false);

  const handleBtnAsse = () => {
    setBtnInfo(false);
    setBtnAsse(true);
    setBtnDev(false);
  };
  const handleBtnInfo = () => {
    setBtnInfo(true);
    setBtnAsse(false);
    setBtnDev(false);
  };
  const handleBtnDev = () => {
    setBtnInfo(false);
    setBtnAsse(false);
    setBtnDev(true);
  };

  const assuntosFiltrados = useMemo(() => {
    if (btnAsse) {
      return assuntos?.filter(
        (assunto) => assunto.setorId === "fdc0248f-ade9-4325-917f-ace517196efb"
      );
    } else if (btnInfo) {
      return assuntos?.filter(
        (assunto) => assunto.setorId === "66a38650-99d9-4dff-bebd-2281dc29f142"
      );
    } else if (btnDev) {
      return assuntos?.filter(
        (assunto) => assunto.setorId === "fb203925-c3d9-472c-93e6-3d5c5b110001"
      );
    }
  }, [assuntos, btnInfo, btnAsse, btnDev]);

  return (
    <div>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-center">Atualiza Assunto</h2>
          <div className="mt-5 justify-center flex gap-5">
            <button
              className={`border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all ${btnAsse && "bg-slate-400"
                }`}
              onClick={handleBtnAsse}
            >
              Assessoria de TI
            </button>
            <button
              className={`border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all ${btnInfo && "bg-slate-400"
                }`}
              onClick={handleBtnInfo}
            >
              Unidade de Informática
            </button>
            <button
              className={`border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all ${btnDev && "bg-slate-400"
                }`}
              onClick={handleBtnDev}
            >
              Unidade de Desenvolvimento
            </button>
          </div>

          <div className="mt-5">
            <FormControl
              variant="standard"
              sx={{ width: "100%" }}
            >
              <InputLabel sx={{ pl: 1.5 }}>Assunto</InputLabel>
              <Select
                value={assuntoId}
                onChange={handleChange}
                sx={{ pl: 1.5 }}
              >
                {assuntosFiltrados?.map((assunto) => (
                  <MenuItem
                    key={assunto.id}
                    value={assunto.id}
                  >
                    {assunto.nome}
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
    </div>
  );
}
