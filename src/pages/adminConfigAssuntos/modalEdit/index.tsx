import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { Assunto } from "../../../components/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AtualizarAssunto } from "../../../components/data/fetch/assuntos/atualizarAssunto";
import { LerAssuntos } from "../../../components/data/fetch/assuntos/lerAssuntos";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 2,
};

type Props = {
  assunto: Assunto | null;
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void;
  handleCloseEdit: (value: boolean) => void;
};

export default function ModalEditarAssunto({
  assunto,
  openEdit,
  handleCloseEdit,
  setOpenEdit,
}: Props) {
  const { setAssuntos, categorias, setores } = useContext(DataContext);

  const [categoriaId, setCategoriaId] = useState<string>("");
  const [setorId, setSetorId] = useState<string>("");

  const [nome, setNome] = useState<string>(assunto?.nome || "");
  const [tempoLimite, setTempoLimite] = useState<number>(
    assunto?.tempoLimite || 0
  );

  const handleOnEdit = async () => {
    await LerAssuntos({ setAssuntos });
  };

  useEffect(() => {
    if (assunto) {
      setNome(assunto.nome || "");
      setCategoriaId(assunto.categoriaId || "");
      setSetorId(assunto.setorId || "");
      setTempoLimite(assunto.tempoLimite || 0);
    }
  }, [assunto]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCategoriaId(event.target.value);
  };

  const handleChangeSetor = (event: SelectChangeEvent<string>) => {
    setSetorId(event.target.value);
  };

  const handleEdit = async () => {
    if (!assunto) return null;

    const id = assunto.id;
    try {
      await AtualizarAssunto({ id, nome, categoriaId, tempoLimite, setorId });
      setOpenEdit(false);
      handleOnEdit();
      setNome("");
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setNome("");
    }
  };

  return (
    <div>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 className="text-center">Editando Assunto</h2>
          <p className="text-center">{assunto?.nome}</p>

          <div className="w-full mt-2 flex flex-col gap-4">
            <TextField
              id="nome"
              label="Nome"
              variant="filled"
              onChange={(e) => setNome(e.target.value)}
              defaultValue={assunto?.nome}
              fullWidth
            />
            <TextField
              id="tempo-limite"
              label="Tempo limite"
              placeholder="tempo limite em minutos"
              type="number"
              variant="filled"
              onChange={(e) => setTempoLimite(parseInt(e.target.value))}
              defaultValue={assunto?.tempoLimite}
              fullWidth
            />

            <FormControl
              variant="standard"
              fullWidth
            >
              <InputLabel id="label-categoria">Categoria</InputLabel>
              <Select
                labelId="label-categoria"
                id="select-categoria"
                value={categoriaId}
                onChange={handleChange}
                defaultValue={assunto?.categoriaId}
                fullWidth
              >
                {categorias?.map((categoria) => (
                  <MenuItem
                    key={categoria.id}
                    value={categoria.id}
                  >
                    {categoria.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              fullWidth
            >
              <InputLabel id="label-setor">Setor</InputLabel>
              <Select
                labelId="label-setor"
                id="select-setor"
                value={setorId}
                onChange={handleChangeSetor}
                defaultValue={assunto?.setorId}
                fullWidth
              >
                {setores?.map((setor) => {
                  if (
                    setor.id == "fdc0248f-ade9-4325-917f-ace517196efb" ||
                    setor.id == "fb203925-c3d9-472c-93e6-3d5c5b110001" ||
                    setor.id == "66a38650-99d9-4dff-bebd-2281dc29f142"
                  )
                    return (
                      <MenuItem
                        key={setor.id}
                        value={setor.id}
                      >
                        {setor.nome}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="text-slate-600 font-thin text-xs mt-4">
            <div className="flex justify-between gap-4">
              <p>Criado em:</p>
              <p>
                {assunto?.createdAt
                  ? new Date(assunto.createdAt).toLocaleString()
                  : "Data não disponível"}
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Atualizado em:</p>
              <p>
                {assunto?.updatedAt
                  ? new Date(assunto.updatedAt).toLocaleString()
                  : "Data não disponível"}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              className="border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all"
              onClick={() => setOpenEdit(false)}
            >
              Cancelar
            </button>
            <button
              className="border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all"
              onClick={handleEdit}
            >
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
