


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { AuthContext } from '../../../components/data/context/authContext';

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
  open: boolean;
  setOpen: (value: boolean) => void
  handleClose: (value: boolean) => void
}

export default function ModalEditarDadosUsuario({ open, handleClose, setOpen }: Props) {

  const { usuario } = useContext(AuthContext)
  /* const { setCategorias } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerCategorias({ setCategorias })

  } */



  const [nome, setNome] = useState<string>(usuario?.nome || '');
  const [nomeUsuario, setNomeUsuario] = useState<string>(usuario?.nomeUsuario || '');

  useEffect(() => {
    setNome(usuario?.nome || '')
    setNomeUsuario(usuario?.nomeUsuario || '')
  }, [usuario])



  const handle = async () => {


    try {
      // await AtualizarCategoria({ id, nome })
      setOpen(false)
      // handleOnEdit()
      setNome('')

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpen(false);
      setNome('')
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
            Editando
          </h2>

          <div className='mt-5 w-72'>
            <TextField id="standard-basic" label="Nome" variant="filled" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} defaultValue={nome}/>
          </div>
          <div className='mt-2 mb-4 w-72'>
            <TextField id="standard-basic" label="Login" variant="filled" onChange={(e) => setNomeUsuario(e.target.value)} sx={{ width: '100%' }} defaultValue={nomeUsuario}/>
          </div>


          <div className='flex justify-center gap-4 mt-10'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handle}>
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}