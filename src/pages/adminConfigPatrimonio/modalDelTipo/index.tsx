


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
// import { LerCategorias } from '../../../components/data/fetch/categoria/lerCategoria';
import { TipoPatrimonio } from '../../../components/types';
import { RemoverTipoPatrimonio } from '../../../components/data/fetch/tipoPatrimonio/removerTipoPatrimonio';
import { LerTipoPatrimonios } from '../../../components/data/fetch/tipoPatrimonio/lerTipoPatrimonio';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

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
  tipoPatrimonio: TipoPatrimonio | null
  openRemove: boolean;
  setOpenRemove: (value: boolean) => void
  handleCloseRemove: (value: boolean) => void
}

export default function ModalRemoverTipoPatrimonio({ tipoPatrimonio, openRemove, handleCloseRemove, setOpenRemove }: Props) {


  const { setTipoPatrimonio } = useContext(DataContext)

  const handleOnRemove = async () => {
    await LerTipoPatrimonios({ setTipoPatrimonio })

  }

  const [loading, setLoading] = useState<boolean>(false);
  const handleRemove = async () => {
    if (loading) return; // impede múltiplos cliques
    setLoading(true)
    if (!tipoPatrimonio) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = tipoPatrimonio.id

    const promise: Promise<AxiosResponse> = RemoverTipoPatrimonio({ id })

    toast.promise(promise, {
      pending: "Removendo tipo patrimônio...",
      success: "Tipo Patrimônio removido com sucesso!",
      error: "Erro ao remover tipo patrimônio!",
    });

    try {
      await promise
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

          <p className='mt-4'>Tem certeza que deseja remover o setor "{tipoPatrimonio?.nome}"?</p>
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