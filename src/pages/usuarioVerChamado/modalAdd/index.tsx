


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { TextField } from '@mui/material';
import { CriarComentario } from '../../../components/data/fetch/comentario/criarComentario';
import { LerComentarios } from '../../../components/data/fetch/comentario/lerComentarios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void
  handleClose: (value: boolean) => void
  chamadoId: string;
  usuarioId: string;
}

export default function ModalAddComentario({ openAdd, handleClose, setOpenAdd, chamadoId, usuarioId }: Props) {


  const [comentario, setComentario] = useState<string>('')

  const { setComentarios } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerComentarios({ chamadoId, setComentarios })
  }

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        await LerComentarios({ chamadoId, setComentarios });
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      }
    };

    fetchComentarios();
  }, [chamadoId, setComentarios]);

  const handleAdd = async () => {
    try {
      if (comentario.length >= 6) {
        await CriarComentario({ comentario, usuarioId, chamadoId })
        setOpenAdd(false)
        setTimeout(() =>
          handleOnAdd(), 100)
      } else {
        window.alert("Favor digitar o comentario corretamente!");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setComentario('')
      setOpenAdd(false);
    }
  }


  return (
    <div>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className='text-center'>
            Inserir Comentários
          </h2>
          <div className='mt-5 mb-4'>
            <TextField id="standard-basic" multiline rows={4} label="Comentário" placeholder='Comentário...' variant="standard" onChange={(e) => setComentario(e.target.value)} sx={{ width: '100%' }} />
          </div>
          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenAdd(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleAdd}>
              Cadastrar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}