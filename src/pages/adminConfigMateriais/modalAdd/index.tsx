import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { LerMateriais } from "../../../components/data/fetch/materiais/lerMateriais";
import { CriarMaterial } from "../../../components/data/fetch/materiais/criarMaterial";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 2,
  width: 420,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void;
};

export default function ModalAddMaterial({ openAdd, setOpenAdd }: Props) {
  const { setMateriais } = useContext(DataContext);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"LIMPEZA" | "EXPEDIENTE">("EXPEDIENTE");
  const [unidade, setUnidade] = useState("");
  const [qtd, setQtd] = useState<number>(0);
  const [qtdBetha, setQtdBetha] = useState<number | "">("");
  const [ativo, setAtivo] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleOnAdd = async () => {
    await LerMateriais({ setMateriais });
  };

  const handleChangeTipo = (event: SelectChangeEvent<string>) => {
    setTipo(event.target.value as "LIMPEZA" | "EXPEDIENTE");
  };

  const handleChangeAtivo = (event: SelectChangeEvent<string>) => {
    setAtivo(event.target.value === "true");
  };

  const UNIDADES = [
    { value: "un", label: "Unidade (un)" },
    { value: "cx", label: "Caixa (cx)" },
    { value: "pct", label: "Pacote (pct)" },
    { value: "kg", label: "Quilograma (kg)" },
    { value: "g", label: "Grama (g)" },
    { value: "lt", label: "Litro (lt)" },
    { value: "ml", label: "Mililitro (ml)" },
    { value: "m", label: "Metro (m)" },
    { value: "resma", label: "Resma" },
  ];

  const handleAdd = async () => {
    if (loading) return;
    setLoading(true);

    if (nome.trim().length < 3) {
      toast.error("Digite o nome do material (mínimo 3 caracteres).");
      setLoading(false);
      return;
    }
    if (unidade.trim().length < 1) {
      toast.error("Informe a unidade (ex: un, cx, lt, pct).");
      setLoading(false);
      return;
    }
    if (Number.isNaN(qtd) || qtd < 0) {
      toast.error("Quantidade inválida.");
      setLoading(false);
      return;
    }

    const payload = {
      nome: nome.trim(),
      descricao: descricao.trim() ? descricao.trim() : null,
      tipo,
      unidade: unidade.trim(),
      qtd: Number(qtd),
      qtdBetha: qtdBetha === "" ? null : Number(qtdBetha),
      ativo,
    };

    const promise: Promise<AxiosResponse> = CriarMaterial(payload);

    toast.promise(promise, {
      pending: "Cadastrando material...",
      success: "Material cadastrado com sucesso!",
      error: "Erro ao cadastrar material!",
    });

    try {
      await promise;
      setOpenAdd(false);
      await handleOnAdd();

      setNome("");
      setDescricao("");
      setTipo("EXPEDIENTE");
      setUnidade("");
      setQtd(0);
      setQtdBetha("");
      setAtivo(true);
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenAdd(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
      <Box sx={style}>
        <h2 className="text-center">Cadastrar Material</h2>

        <div className="mt-4">
          <TextField
            label="Nome do Material"
            variant="standard"
            sx={{ width: "100%" }}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <TextField
            label="Descrição (opcional)"
            variant="standard"
            sx={{ width: "100%" }}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <FormControl variant="standard" sx={{ width: "50%" }}>
            <InputLabel>Tipo</InputLabel>
            <Select value={tipo} onChange={handleChangeTipo}>
              <MenuItem value="EXPEDIENTE">EXPEDIENTE</MenuItem>
              <MenuItem value="LIMPEZA">LIMPEZA</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: "50%" }}>
            <InputLabel>Unidade</InputLabel>
            <Select
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
            >
              {UNIDADES.map((u) => (
                <MenuItem key={u.value} value={u.value}>
                  {u.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="mt-4 flex gap-3">
          <TextField
            type="number"
            label="Qtd (estoque)"
            variant="standard"
            sx={{ width: "50%" }}
            value={qtd}
            onChange={(e) => setQtd(Number(e.target.value))}
          />

          <TextField
            type="number"
            label="Qtd Betha (opcional)"
            variant="standard"
            sx={{ width: "50%" }}
            value={qtdBetha}
            onChange={(e) => setQtdBetha(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <div className="mt-4">
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel>Ativo</InputLabel>
            <Select value={String(ativo)} onChange={handleChangeAtivo}>
              <MenuItem value="true">Sim</MenuItem>
              <MenuItem value="false">Não</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="flex justify-center gap-4 mt-6">
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
  );
}