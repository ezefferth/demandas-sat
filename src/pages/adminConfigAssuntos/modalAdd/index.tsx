


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { LerAssuntos } from '../../../components/data/fetch/assuntos/lerAssuntos';
import { CriarAssunto } from '../../../components/data/fetch/assuntos/criarSetor';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void
  handleClose: (value: boolean) => void
}

export default function ModalAddAssunto({ openAdd, handleClose, setOpenAdd }: Props) {

  const [nome, setNome] = useState<string>('')

  const { setAssuntos, categorias } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerAssuntos({ setAssuntos })

  }

  const [tempoLimite, setTempoLimite] = useState<number>(0);

  const [categoriaId, setCategoriaId] = useState<string>('')

  const handleAdd = async () => {
    try {
      if (nome.length >= 4 && tempoLimite > 1) {
        await CriarAssunto({ nome, categoriaId, tempoLimite })
        setOpenAdd(false)
        handleOnAdd()
      } else {
        window.alert("Favor digitar o nome do setor corretamente!");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setNome('')
      setOpenAdd(false);
    }
  }
  const handleChange = (event: SelectChangeEvent) => {
    setCategoriaId(event.target.value);
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
          <h2 className='text-center'>
            Cadastrar Assunto
          </h2>
          <div className='mt-5 mb-4'>
            <TextField
              id="standard-basic"
              label="Nome do Assunto"
              variant="standard"
              onChange={(e) => setNome(e.target.value)}
              sx={{ width: '100%' }} />
          </div>
          <div className='mt-5 mb-4'>
            <TextField
              id="standard-basic"
              variant="standard"
              label="Tempo limite"
              placeholder='tempo limite em minutos'
              type='number'
              onChange={(e) => setTempoLimite(parseInt(e.target.value))}
              sx={{ width: '100%' }}
            />
          </div>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoriaId}
              onChange={handleChange}
              label="Assunto"
            >
              {
                categorias?.map(categorias => (
                  <MenuItem key={categorias.id} value={categorias.id} >
                    {categorias.nome}
                  </MenuItem>
                ))
              }

            </Select>
          </FormControl>
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