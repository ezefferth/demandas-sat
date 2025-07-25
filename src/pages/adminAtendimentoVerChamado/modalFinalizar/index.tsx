


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';

import { LerChamados } from '../../../components/data/fetch/chamados/lerChamados';
import { AtualizarFinalizarChamado } from '../../../components/data/fetch/chamados/atualizarFinalizarChamado';
import { Chamado } from '../../../components/types';
import { AuthContext } from '../../../components/data/context/authContext';

import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

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
  open: boolean;
  setOpen: (value: boolean) => void
  handleClose: (value: boolean) => void
  chamado: Chamado;
}

export default function ModalAddFinalizar({ open, handleClose, setOpen, chamado }: Props) {


  const { usuario } = useContext(AuthContext)
  const { setChamados } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerChamados({ setChamados })
  }

  const [loading, setLoading] = useState<boolean>(false);

  const handle = async () => {
    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    if (chamado.statusId === null && chamado.prioridadeId !== null) {
      window.alert("Não é possível atualizar chamado sem status. Por favor verifique novamente o andamento do chamado!")
      setLoading(false);
      return;
    }
    else if (chamado.prioridadeId === null && chamado.statusId !== null) {
      window.alert("Não é possível atualizar chamado sem prioridade. Por favor verifique novamente o andamento do chamado!")
      setLoading(false);
      return;
    }
    else if (chamado.prioridadeId === null && chamado.statusId === null) {
      window.alert("Não é possível atualizar chamado sem status e prioridade. Por favor verifique novamente o andamento do chamado!")
      setLoading(false);
      return;
    }


    else {
      const id = chamado.id
      const finalizadoPor = usuario!.id
      const statusId = 'aa4357cd-f1de-4b37-95cc-4beeab958854' // Por padrão, se não houver status, assume-se que o chamado está em andamento (statusId = 1)

      const promise: Promise<AxiosResponse> = AtualizarFinalizarChamado({ id, statusId, finalizadoPor })

      toast.promise(promise, {
        pending: "Encerrando chamado...",
        success: "Chamado encerrado com sucesso!",
        error: "Erro ao encerrar chamado!",
      });

      try {
        await promise
        setOpen(false)
        handleOnAdd()
      } catch (e: any) {
        console.error(e.response?.request?.status);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className='text-center'>
            Finalizar Chamado?
          </h2>

          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handle}>
              Confirmar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}