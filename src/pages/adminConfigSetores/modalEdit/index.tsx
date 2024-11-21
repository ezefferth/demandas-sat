


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Setor } from '../../../components/types';
import { LerSetores } from '../../../components/data/fetch/setores/lerSetores';
import { AtualizarSetor } from '../../../components/data/fetch/setores/atualizarSetor';
import { TextField } from '@mui/material';

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
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarSetor({ setor, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setSetores } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerSetores({ setSetores })

  }

  const [nome, setNome] = useState<string>('');



  const handleREdit = async () => {
    if (!setor) {
      return null;  // Caso a categoria seja null, não renderiza o modal
    }

    const id = setor.id
    try {
      await AtualizarSetor({ id, nome })
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
            Editando Setor
          </h2>
          <p className='text-center'>
            {setor?.nome}
          </p>

          <div className='mt-5 mb-4 w-72'>
            <TextField id="standard-basic" label="Nome" variant="filled" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} defaultValue={setor?.nome} />
          </div>

          <div className='text-slate-600 font-thin text-xs mt-8'>
            <div className='flex justify-between gap-4'>
              <p>Criado em:</p>
              <p>
                {setor?.createdAt
                  ? new Date(setor.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {setor?.createdAt
                  ? new Date(setor.updatedAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
          </div>


          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenEdit(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleREdit}>
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}