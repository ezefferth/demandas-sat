


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Status } from '../../../components/types';
import { LerStatus } from '../../../components/data/fetch/status/lerStatus';
import { AtualizarStatus } from '../../../components/data/fetch/prioridade/atualizarPrioridade';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  status: Status | null
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarStatus({ status, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setStatus } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerStatus({ setStatus })

  }

  const [nome, setNome] = useState<string>('');
  const [cor, setCor] = useState<string>('');



  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (loading) return;
    setLoading(true);

    if (!status) {
      setLoading(false);
      return null;
    }

    if (nome.length < 3 || cor.length < 3) {
      toast.error("Favor preencher corretamente o nome e a cor do status.");
      setLoading(false);
      return;
    }

    const id = status.id;

    const promise: Promise<AxiosResponse> = AtualizarStatus({ id, nome, cor });

    toast.promise(promise, {
      pending: "Editando status...",
      success: "Status editado com sucesso!",
      error: "Erro ao editar status!",
    });

    try {
      await promise;
      setOpenEdit(false);
      handleOnEdit();
      setNome("");
      setCor("");
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setNome("");
      setCor("");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (status) {
      setNome(status.nome || '');
      setCor(status.cor || '');
    }
  }, [status]);

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
            Editando Status
          </h2>
          <p className='text-center'>
            {status?.nome}
          </p>

          <div className='mt-5 mb-4'>
            <TextField id="standard-basic" label="Nome" variant="filled" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} defaultValue={status?.nome} />
          </div>
          <div className='mt-5 mb-4'>
            <TextField id="standard-basic" label="Cód. Cor" variant="filled" onChange={(e) => setCor(e.target.value)} sx={{ width: '100%' }} defaultValue={status?.cor} />
          </div>


          <div className='text-slate-600 font-thin text-xs mt-8'>
            <div className='flex justify-between gap-4'>
              <p>Criado em:</p>
              <p>
                {status?.createdAt
                  ? new Date(status.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {status?.createdAt
                  ? new Date(status.updatedAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
          </div>

          <p className='mt-8 text-center font-thin text-slate-600 text-sm'>A cor deve ser colocada em hexadecimal</p>
          <p className='mb-4 text-center font-thin text-slate-600 text-sm'>Consulte sugestões de cores <a href='https://celke.com.br/artigo/tabela-de-cores-html-nome-hexadecimal-rgb' target='_blank'>aqui</a></p>



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