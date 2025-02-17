


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Patrimonio } from '../../../components/types';
import { SelectChangeEvent, TextField } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AtualizarPatrimonio } from '../../../components/data/fetch/patrimonio/atualizarPatrimonio';
import { LerPatrimonios } from '../../../components/data/fetch/patrimonio/lerPatrimonio';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  patrimonio: Patrimonio | null
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarPatrimonio({ patrimonio, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setPatrimonios, tipoPatrimonio } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerPatrimonios({ setPatrimonios })

  }

  const [descricao, setDescricao] = useState<string>(patrimonio?.descricao || '')
  const [tipoPatrimonioId, setTipoPatrimonioId] = useState<string>(patrimonio?.tipoPatrimonioId || '')
  const [status, setStatus] = useState<string>(patrimonio?.status || '')
  const [newPatrimonio, setNewPatrimonio] = useState<string>(patrimonio?.patrimonio || '')

  useEffect(() => {
    if (patrimonio) {
      setDescricao(patrimonio.descricao)
      setTipoPatrimonioId(patrimonio.tipoPatrimonioId)
      setStatus(patrimonio.status)
      setNewPatrimonio(patrimonio.patrimonio)
    }
  }, [patrimonio])


  const handleREdit = async () => {
    if (!patrimonio) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = patrimonio.id

    try {
      const patrimonio: number = parseInt(newPatrimonio)
      await AtualizarPatrimonio({ id, descricao, status, tipoPatrimonioId, patrimonio })
      setOpenEdit(false)
      handleOnEdit()
      setDescricao('')
      setTipoPatrimonioId('')
      setStatus('')
      setNewPatrimonio('')

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setDescricao('')
      setTipoPatrimonioId('')
      setStatus('')
      setNewPatrimonio('')
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setTipoPatrimonioId(event.target.value)
  };


  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
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
          <h2 className='text-center'>
            Editando Setor
          </h2>
          <p className='text-center'>
            {patrimonio?.patrimonio}
          </p>

          <div className='mt-5 mb-2'>
            <TextField id="standard-basic" label="Descrição" variant="standard" onChange={(e) => setDescricao(e.target.value)} sx={{ width: '100%' }} value={descricao}/>
          </div>
          <div className='mt-1 mb-2'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Número do patrimônio" type='number' variant="standard" onChange={e => setNewPatrimonio(e.target.value)} sx={{ width: '100%' }} value={newPatrimonio}/>
          </div>
          <FormControl id='standard-basic' variant="standard" sx={{ width: '100%', }}>
            <InputLabel id="demo-simple-select-standard-label" sx={{}}>Status do Equipamento</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={handleChangeStatus}
              label="Assunto"
              sx={{}}
            >
              <MenuItem key='Novo' value='Novo'>
                Novo
              </MenuItem>
              <MenuItem key='Ótimo' value='Ótimo'>
                Ótimo
              </MenuItem>
              <MenuItem key='Bom' value='Bom'>
                Bom
              </MenuItem>
              <MenuItem key='Regular' value='Regular'>
                Regular
              </MenuItem>
              <MenuItem key='Péssimo' value='Péssimo'>
                Péssimo
              </MenuItem>
              <MenuItem key='Inservível' value='Inservível'>
                Inservível
              </MenuItem>
            </Select>
          </FormControl>

          <div className='mt-2'>
            <FormControl id='standard-basic' variant="standard" sx={{ width: '100%', }}>
              <InputLabel id="demo-simple-select-standard-label" sx={{}}>Tipo do Equipamento</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={tipoPatrimonioId}
                onChange={handleChange}
                label="Tipo do Equipamento"
                sx={{}}
              >
                {
                  tipoPatrimonio?.map(tp => (
                    <MenuItem key={tp.nome} value={tp.id}>
                      {tp.nome}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>

          <div className='text-slate-600 font-thin text-xs mt-8'>
            <div className='flex justify-between gap-4'>
              <p>Criado em:</p>
              <p>
                {patrimonio?.createdAt
                  ? new Date(patrimonio.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {patrimonio?.createdAt
                  ? new Date(patrimonio.updatedAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
          </div>


          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenEdit(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleREdit}>
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}