


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { LerCategorias } from '../../../components/data/fetch/categoria/lerCategoria';
import {  Assunto } from '../../../components/types';
import { RemoverAssunto } from '../../../components/data/fetch/assuntos/removerAssuntos';
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
  openRemove: boolean;
  setOpenRemove: (value: boolean) => void
  handleCloseRemove: (value: boolean) => void
}

export default function ModalRemoverAssunto({ assunto, openRemove, handleCloseRemove, setOpenRemove }: Props) {


  const { setAssuntos } = useContext(DataContext)

  const handleOnRemove = async () => {
    await LerAssuntos({ setAssuntos })

  }

  const handleRemove = async () => {
    if (!assunto) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = assunto.id  
    try {
      await RemoverAssunto({ id })
      setOpenRemove(false)
      handleOnRemove()

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenRemove(false);
    }
  }

  return (
    <div>
      <Modal
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className='text-center'>
            Remover Setor
          </h2>

          <p className='mt-4'>Tem certeza que deseja remover o setor "{assunto?.nome}"?</p>
          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenRemove(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleRemove}>
              Remover
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}