


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
// import { LerCategorias } from '../../../components/data/fetch/categoria/lerCategoria';
import {  Setor } from '../../../components/types';
import { RemoverSetor } from '../../../components/data/fetch/setores/removerSetor';
import { LerSetores } from '../../../components/data/fetch/setores/lerSetores';

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
  setor: Setor | null
  openRemove: boolean;
  setOpenRemove: (value: boolean) => void
  handleCloseRemove: (value: boolean) => void
}

export default function ModalRemoverSetor({ setor, openRemove, handleCloseRemove, setOpenRemove }: Props) {


  const { setSetores } = useContext(DataContext)

  const handleOnRemove = async () => {
    await LerSetores({ setSetores })

  }

  const handleRemove = async () => {
    if (!setor) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = setor.id  
    try {
      await RemoverSetor({ id })
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

          <p className='mt-4'>Tem certeza que deseja remover o setor "{setor?.nome}"?</p>
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