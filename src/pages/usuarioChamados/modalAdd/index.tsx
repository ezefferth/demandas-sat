


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { AuthContext } from '../../../components/data/context/authContext';
import { CriarChamado } from '../../../components/data/fetch/chamados/criarChamado';
import { LerChamadosUser } from '../../../components/data/fetch/chamados/lerChamadosUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  width: '40%',
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void
  handleClose: (value: boolean) => void
}

export default function ModalAddChamado({ openAdd, handleClose, setOpenAdd }: Props) {

  const [descricao, setDescricao] = useState<string>('')

  const [assuntoId, setAssuntoId] = useState<string>('')
  const handleChange = (event: SelectChangeEvent<string>) => {
    setAssuntoId(event.target.value);
  };

  const [setorId, setSetorId] = useState<string>('')
  const handleChangeSetor = (event: SelectChangeEvent<string>) => {
    setSetorId(event.target.value);
  };

  const { usuario } = useContext(AuthContext)
  const { setChamadosUser, assuntos, setores } = useContext(DataContext)

  const handleOnAdd = async () => {
    const id = usuario!.id
    await LerChamadosUser({ setChamadosUser, id })

  }

  const handleAdd = async () => {

    const usuarioId = usuario!.id

    try {
      if (descricao.length >= 3 && setorId.length >= 3 && assuntoId.length >= 3 && usuarioId.length >= 3) {
        await CriarChamado({ usuarioId, descricao, setorId, assuntoId })
        setOpenAdd(false)
        handleOnAdd()
      } else {
        window.alert("Favor digitar o nome do status ou cor corretamente!");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setDescricao('')
      setAssuntoId('')
      setSetorId('')
      setOpenAdd(false);
    }
  }

  return (
    <div>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className='text-center'>
            Abrir novo Chamado
          </h2>
          <div className='mt-5'>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel sx={{ pl: 1.5 }} id="demo-simple-select-standard-label">Assunto</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={categoriaId}
                onChange={handleChange}
                label="Assuntos"
                // defaultValue={assunto?.categoriaId}
                sx={{ pl: 1.5 }}
              >
                {
                  assuntos?.map(assunto => (
                    <MenuItem key={assunto.id} value={assunto.id}>
                      {assunto.nome}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className='mt-2'>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel sx={{ pl: 1.5 }} id="demo-simple-select-standard-label">Setor para atendimento</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={categoriaId}
                onChange={handleChangeSetor}
                label="Assuntos"
                // defaultValue={assunto?.categoriaId}
                sx={{ pl: 1.5 }}
              >
                {
                  setores?.map(setor => (
                    <MenuItem key={setor.id} value={setor.id}>
                      {setor.nome}
                    </MenuItem>
                  ))
                }

              </Select>
            </FormControl>
          </div>
          <div className='mt-2 mb-4'>
            <TextField
              multiline
              rows={3}
              placeholder="Descreva o problema aqui..."
              id="standard-basic"
              label="Descrição do Problema"
              variant="filled"
              onChange={(e) => setDescricao(e.target.value)}
              sx={{ width: '100%' }}
            />
          </div>

          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenAdd(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleAdd}>
              Cadastrar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}