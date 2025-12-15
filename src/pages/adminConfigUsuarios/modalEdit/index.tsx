import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { Usuario } from "../../../components/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { LerUsuarios } from "../../../components/data/fetch/usuarios/lerUsuarios";
import { AtualizarUsuario } from "../../../components/data/fetch/usuarios/atualizarUsuario";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  bgcolor: "background.paper",
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  usuario: Usuario | null;
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void;
  handleCloseEdit: (value: boolean) => void;
};

export default function ModalEditarUsuario({
  usuario,
  openEdit,
  handleCloseEdit,
  setOpenEdit,
}: Props) {
  const { setUsuarios } = useContext(DataContext);

  const [adminSelected, setAdminSelected] = useState<string>("");
  const [statusSelected, setStatusSelected] = useState<string>("");
  const [nome, setNome] = useState<string>(usuario?.nome || "");
  const [status, setStatus] = useState<boolean>();
  const [nomeUsuario, setNomeUsuario] = useState<string>(
    usuario?.nomeUsuario || ""
  );
  const [senha, setSenha] = useState<string>(usuario?.senha || "");
  const [admin, setAdmin] = useState<boolean>(usuario?.admin || false);

  const handleOnEdit = async () => {
    await LerUsuarios({ setUsuarios });
  };

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setNomeUsuario(usuario.nomeUsuario);
      setSenha(usuario.senha);
      setAdmin(usuario.admin);
      setStatus(usuario.status);
      if (usuario.admin) {
        setAdminSelected("Sim");
      } else {
        setAdminSelected("Não");
      }
      if (usuario.status) {
        setStatusSelected("Ativo");
      } else {
        setStatusSelected("Inativo");
      }
    }
  }, [usuario]);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value == "Sim") {
      setAdmin(true);
      setAdminSelected("Sim");
    } else {
      setAdmin(false);
      setAdminSelected("Não");
    }
  };
  const handleChangeStatus = (event: SelectChangeEvent) => {
    if (event.target.value == "Ativo") {
      setStatus(true);
      setStatusSelected("Ativo");
    } else {
      setStatus(false);
      setStatusSelected("Inativo");
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (loading) return;
    setLoading(true);

    if (!usuario) {
      setLoading(false);
      return null;
    }

    if (nome.length < 4 || nomeUsuario.length < 4) {
      toast.error("Favor preencher corretamente o nome e o nome de usuário.");
      setLoading(false);
      return;
    }

    const id = usuario.id;

    const promise: Promise<AxiosResponse> = AtualizarUsuario({
      id,
      nome,
      senha,
      admin,
      nomeUsuario,
      status,
    });

    toast.promise(promise, {
      pending: "Editando usuário...",
      success: "Usuário editado com sucesso!",
      error: "Erro ao editar usuário!",
    });

    try {
      await promise;
      setOpenEdit(false);
      handleOnEdit();
      setNome("");
      setNomeUsuario("");
      setSenha("");
      setAdmin(false);
      setStatus(false);
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setNome("");
      setNomeUsuario("");
      setSenha("");
      setAdmin(false);
      setStatus(false);
    } finally {
      setLoading(false);
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
        <Box sx={style}>
          <h2 className="text-center">Editando Usuário</h2>
          <p className="text-center">{usuario?.nome}</p>

          <div className="w-72 mt-8">
            <div className="mt-5">
              <TextField
                id="standard-basic4"
                label="Nome"
                variant="filled"
                onChange={(e) => setNome(e.target.value)}
                sx={{ width: "100%" }}
                defaultValue={usuario?.nome}
                disabled
              />
            </div>
            <div className="mt-2">
              <TextField
                id="standard-basic2"
                label="Nome de usuário"
                variant="filled"
                onChange={(e) => setNomeUsuario(e.target.value)}
                sx={{ width: "100%" }}
                defaultValue={usuario?.nomeUsuario}
                disabled
              />
            </div>
            <div className="mt-2">
              <FormControl
                disabled

                variant="standard"
                sx={{ width: "100%" }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ pl: 2 }}
                >
                  Administrador?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={adminSelected}
                  onChange={handleChange}
                  label="Assunto"
                  defaultValue="Não"
                  sx={{ pl: 1.75 }}
                >
                  <MenuItem
                    key="Não"
                    value="Não"
                  >
                    Não
                  </MenuItem>
                  <MenuItem
                    key="Sim"
                    value="Sim"
                  >
                    Sim
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="mt-2">

              <FormControl
                disabled
                variant="standard"
                sx={{ width: "100%" }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  sx={{ pl: 2 }}
                >
                  Status?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={statusSelected}
                  onChange={handleChangeStatus}
                  label="Assunto"
                  defaultValue="Não"
                  sx={{ pl: 1.75 }}
                >
                  <MenuItem
                    key="Ativo"
                    value="Ativo"
                  >
                    Ativo
                  </MenuItem>
                  <MenuItem
                    key="Inativo"
                    value="Inativo"
                  >
                    Inativo
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-2 mb-3">
            <TextField
              disabled
              id="standard-basic"
              type="password"
              label="Senha"
              variant="filled"
              onChange={(e) => setSenha(e.target.value)}
              sx={{ width: "100%" }}
              defaultValue={senha}
            />
          </div>

          <div className="text-slate-600 font-thin text-xs mt-8">
            <div className="flex justify-between gap-4">
              <p>Criado em:</p>
              <p>
                {usuario?.createdAt
                  ? new Date(usuario.createdAt).toLocaleString()
                  : "Data não disponível"}
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Atualizado em:</p>
              <p>
                {usuario?.createdAt
                  ? new Date(usuario.updatedAt).toLocaleString()
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
              disabled
            >
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
