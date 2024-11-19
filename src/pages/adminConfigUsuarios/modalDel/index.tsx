


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Usuario } from '../../../components/types';
import { RemoverUsuario } from '../../../components/data/fetch/usuarios/removerUsuario';
import { LerUsuarios } from '../../../components/data/fetch/usuarios/lerUsuarios';

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
  usuario: Usuario | null
  openRemove: boolean;
  setOpenRemove: (value: boolean) => void
  handleCloseRemove: (value: boolean) => void
}

export default function ModalRemoverUsuario({ usuario, openRemove, handleCloseRemove, setOpenRemove }: Props) {


  const { setUsuarios } = useContext(DataContext)

  const handleOnRemove = async () => {
    await LerUsuarios({ setUsuarios })
  }

  const handleRemove = async () => {
    if (!usuario) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = usuario.id
    try {
      await RemoverUsuario({ id })
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

          <p className='mt-4'>Tem certeza que deseja remover o usuário "{usuario?.nome}"?</p>
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