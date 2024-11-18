


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Assunto } from '../../../components/types';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { AtualizarAssunto } from '../../../components/data/fetch/assuntos/atualizarAssunto';
import { LerAssuntos } from '../../../components/data/fetch/assuntos/lerAssuntos';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  assunto: Assunto | null
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarAssunto({ assunto, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setAssuntos, categorias } = useContext(DataContext)

  const [categoriaId, setCategoriaId] = useState<string>('')
  const [nome, setNome] = useState<string>(assunto?.nome || '');


  const handleOnEdit = async () => {
    await LerAssuntos({ setAssuntos })
  }

  useEffect(() => {
    if (assunto) {
      setNome(assunto.nome || '');
      setCategoriaId(assunto.categoriaId || '');
    }
  }, [assunto]);


  const handleChange = (event: SelectChangeEvent<string>) => {
    setCategoriaId(event.target.value);
  };

  const handleEdit = async () => {
    if (!assunto) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = assunto.id
    try {
      await AtualizarAssunto({ id, nome, categoriaId })
      setOpenEdit(false)
      handleOnEdit()
      setNome('')

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setNome('')
    }
  }

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
            Editando Categoria
          </h2>
          <p className='text-center'>
            {assunto?.nome}
          </p>

          <div className='w-72 mt-8'>
            <div className='mt-5 mb-4'>
              <TextField id="standard-basic" label="Nome" variant="filled" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} defaultValue={assunto?.nome} />
            </div>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel sx={{pl:'12px'}} id="demo-simple-select-standard-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={categoriaId}
                onChange={handleChange}
                label="Categoria"
                defaultValue={assunto?.categoriaId}
                sx={{pl:'10px'}}
              >
                {
                  categorias?.map(categorias => (
                    <MenuItem key={categorias.id} value={categorias.id}>
                      {categorias.nome}
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
                {assunto?.createdAt
                  ? new Date(assunto.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {assunto?.createdAt
                  ? new Date(assunto.updatedAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
          </div>


          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenEdit(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleEdit}>
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}