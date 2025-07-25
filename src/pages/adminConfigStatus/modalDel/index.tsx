


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Status } from '../../../components/types';
import { LerStatus } from '../../../components/data/fetch/status/lerStatus';
import { RemoverStatus } from '../../../components/data/fetch/status/removerStatus';
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
  status: Status | null
  openRemove: boolean;
  setOpenRemove: (value: boolean) => void
  handleCloseRemove: (value: boolean) => void
}

export default function ModalRemoverStatus({ status, openRemove, handleCloseRemove, setOpenRemove }: Props) {


  const { setStatus } = useContext(DataContext)

  const handleOnRemove = async () => {
    await LerStatus({ setStatus })

  }

  const [loading, setLoading] = useState<boolean>(false);

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);

    if (!status) {
      setLoading(false);
      return null;
    }

    const id = status.id;

    const promise: Promise<AxiosResponse> = RemoverStatus({ id });

    toast.promise(promise, {
      pending: "Removendo status...",
      success: "Status removido com sucesso!",
      error: "Erro ao remover status!",
    });

    try {
      await promise;
      setOpenRemove(false);
      handleOnRemove();
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenRemove(false);
    } finally {
      setLoading(false);
    }
  };


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
            Remover Status
          </h2>

          <p className='mt-4'>Tem certeza que deseja remover o status "{status?.nome}"?</p>
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