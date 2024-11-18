


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { LerCategorias } from '../../../components/data/fetch/categoria/lerCategoria';
import { Categoria } from '../../../components/types';
import { AtualizarCategoria } from '../../../components/data/fetch/categoria/atualizarCategoria';

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
  categoria: Categoria | null
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarCategoria({ categoria, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setCategorias } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerCategorias({ setCategorias })

  }

  const [nome, setNome] = useState<string>('');



  const handleRemove = async () => {
    if (!categoria) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = categoria.id
    try {
      await AtualizarCategoria({ id, nome })
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
            {categoria?.nome}
          </p>

          <div className='w-72 mt-8'>
            <input
              className='border rounded-lg px-3 py-1 w-full'
              type='text'
              value={nome}
              placeholder={categoria?.nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className='text-slate-600 font-thin text-xs mt-8'>
            <div className='flex justify-between gap-4'>
              <p>Criado em:</p>
              <p>
                {categoria?.createdAt
                  ? new Date(categoria.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {categoria?.createdAt
                  ? new Date(categoria.updatedAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
          </div>


          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenEdit(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleRemove}>
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}