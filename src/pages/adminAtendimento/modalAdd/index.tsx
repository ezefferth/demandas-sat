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
  TextField,
} from "@mui/material";
import { AuthContext } from "../../../components/data/context/authContext";
import { CriarDemanda } from "../../../components/data/fetch/demandas/criarDemanda";
import { LerDemandasUser } from "../../../components/data/fetch/demandas/lerDemandaUser";
import { CriarDocumento } from "../../../components/data/fetch/documentos/criarDocumento";
import { LerDocumento } from "../../../components/data/fetch/documentos/lerDocumentos";
import { toast } from 'react-toastify';
import { AxiosResponse } from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 15,
  width: "50%",
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void;
  handleClose: (value: boolean) => void;
};

export default function ModalAddDemanda({
  openAdd,
  handleClose,
  setOpenAdd,
}: Props) {
  const [descricao, setDescricao] = useState<string>("");

  const [assuntoId, setAssuntoId] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setAssuntoId(event.target.value);
  };

  const [setorId, setSetorId] = useState<string>("");
  const handleChangeSetor = (event: SelectChangeEvent<string>) => {
    setSetorId(event.target.value);
  };

  const { usuario } = useContext(AuthContext);
  const { setDemandasUser, assuntos, setores, setDocumentos } =
    useContext(DataContext);

  const [fileSelecionado, setFileSelecionado] = useState<{
    nome: string;
    mimeType: string;
    conteudoBase64: string;
  } | null>(null);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileSelecionado(null);
      return;
    }

    const base64 = await toBase64(file);
    setFileSelecionado({
      nome: file.name,
      mimeType: file.type,
      conteudoBase64: base64,
    });
  };


  const handleOnAdd = async () => {
    const id = usuario!.id;
    await LerDemandasUser({ setDemandasUser, id });
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleAdd = async () => {

    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    const usuarioId = usuario!.id;
    if (descricao.length < 10) {
      toast.error("Preencha a descrição corretamente. Mínimo 10 caracteres.");
      return;
    }
    if (
      setorId.length <= 3 &&
      assuntoId.length <= 3 &&
      usuarioId.length <= 3
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      setLoading(false)
      return;
    }

    const promise: Promise<AxiosResponse> = CriarDemanda({
      usuarioId,
      descricao,
      setorId,
      assuntoId,
    });

    toast.promise(promise, {
      pending: "Enviando demanda...",
      success: "Demanda criado com sucesso!",
      error: "Erro ao criar demanda!",
    });

    try {
      // 1) Cria o chamado e recebe o ID
      const response = await promise

      const demandaId = response.data.id;

      // 2) Se tiver anexo
      if (fileSelecionado) {
        await CriarDocumento({
          nome: fileSelecionado.nome,
          mimeType: fileSelecionado.mimeType,
          conteudo: fileSelecionado.conteudoBase64,
          demandaId,
        });
        // Opcional: recarregar lista de anexos
        await LerDocumento({ demandaId, setDocumentos });
      }
      setOpenAdd(false);
      setDescricao("");
      setAssuntoId("");
      setSetorId("");
      setFileSelecionado(null);
      handleOnAdd();

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setDescricao("");
      setAssuntoId("");
      setSetorId("");
      setOpenAdd(false);
    } finally {
      setLoading(false);
    }
  };

  // const [btnInfo, setBtnInfo] = useState<boolean>(true);
  // const [btnAsse, setBtnAsse] = useState<boolean>(false);
  // const [btnDev, setBtnDev] = useState<boolean>(false);

  // const handleBtnAsse = () => {
  //   setBtnInfo(false);
  //   setBtnAsse(true);
  //   setBtnDev(false);
  // };
  // const handleBtnInfo = () => {
  //   setBtnInfo(true);
  //   setBtnAsse(false);
  //   setBtnDev(false);
  // };
  // const handleBtnDev = () => {
  //   setBtnInfo(false);
  //   setBtnAsse(false);
  //   setBtnDev(true);
  // };

  // const assuntosFiltrados = useMemo(() => {
  //   if (btnAsse) {
  //     return assuntos?.filter(
  //       (assunto) => assunto.setorId === "fdc0248f-ade9-4325-917f-ace517196efb"
  //     );
  //   } else if (btnInfo) {
  //     return assuntos?.filter(
  //       (assunto) => assunto.setorId === "66a38650-99d9-4dff-bebd-2281dc29f142"
  //     );
  //   } else if (btnDev) {
  //     return assuntos?.filter(
  //       (assunto) => assunto.setorId === "fb203925-c3d9-472c-93e6-3d5c5b110001"
  //     );
  //   }
  // }, [assuntos, btnInfo, btnAsse, btnDev]);

  return (
    <div>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-center">Abrir nova Demanda</h2>
          {/* <div className="mt-5 justify-center flex gap-5">
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
          </div> */}

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
                {assuntos?.map((assunto) => (
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

          <div className="mt-2">
            <FormControl
              variant="standard"
              sx={{ width: "100%" }}
            >
              <InputLabel sx={{ pl: 1.5 }}>Setor para atendimento</InputLabel>
              <Select
                value={setorId}
                onChange={handleChangeSetor}
                sx={{ pl: 1.5 }}
              >
                {setores
                  ?.filter((setor) => setor.status === true)
                  .map((setor) => (
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

          <div className="mt-2 mb-4">
            <TextField
              multiline
              rows={3}
              placeholder="Descreva o problema aqui..."
              label="Descrição do Problema"
              variant="filled"
              onChange={(e) => setDescricao(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>

          <div className="mt-6 mb-4 text-center">
            <label className="block text-sm text-gray-600 mb-1">
              Anexar documento (opcional)
            </label>
            <input
              type="file"
              accept="
                image/*,
                application/pdf,
                application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                application/vnd.oasis.opendocument.text,
                application/vnd.ms-excel,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                application/vnd.oasis.opendocument.spreadsheet,
                .doc,
                .docx,
                .odt,
                .xls,
                .xlsx,
                .ods,
                .csv
              "
              onChange={handleFileChange}
            />
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
              onClick={handleAdd}
            >
              Cadastrar
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
