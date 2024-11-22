


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Status } from '../../../components/types';
import { TextField } from '@mui/material';
import { LerPrioridades } from '../../../components/data/fetch/prioridade/lerPrioridades';
import { AtualizarPrioridade } from '../../../components/data/fetch/status/atualizarStatus';

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
  prioridade: Status | null
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarPrioridade({ prioridade, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setPrioridades } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerPrioridades({ setPrioridades })

  }

  const [nome, setNome] = useState<string>('');
  const [cor, setCor] = useState<string>('');



  const handleEdit = async () => {
    if (!prioridade) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = prioridade.id
    try {
      await AtualizarPrioridade({ id, nome, cor })
      setOpenEdit(false)
      handleOnEdit()
      setNome('')

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setNome('')
    }
  }

  useEffect(() => {
    if (prioridade) {
      setNome(prioridade.nome || '');
      setCor(prioridade.cor || '');
    }
  }, [prioridade]);

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
            Editando Prioridade
          </h2>
          <p className='text-center'>
            {prioridade?.nome}
          </p>

          <div className='mt-5 mb-4'>
            <TextField id="standard-basic" label="Nome" variant="filled" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} defaultValue={prioridade?.nome} />
          </div>
          <div className='mt-5 mb-4'>
            <TextField id="standard-basic" label="Cód. Cor" variant="filled" onChange={(e) => setCor(e.target.value)} sx={{ width: '100%' }} defaultValue={prioridade?.cor} />
          </div>


          <div className='text-slate-600 font-thin text-xs mt-8'>
            <div className='flex justify-between gap-4'>
              <p>Criado em:</p>
              <p>
                {prioridade?.createdAt
                  ? new Date(prioridade.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {prioridade?.createdAt
                  ? new Date(prioridade.updatedAt).toLocaleString()
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