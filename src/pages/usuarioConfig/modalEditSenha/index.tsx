


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { AuthContext } from '../../../components/data/context/authContext';
import { AtualizarUsuarioSenha } from '../../../components/data/fetch/usuarios/atualizarUsuarioSenha';

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

export default function ModalEditarSenhaUsuario({ open, handleClose, setOpen }: Props) {

  const { usuario } = useContext(AuthContext)
  /* const { setCategorias } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerCategorias({ setCategorias })

  } */


  const [senha, setSenha] = useState<string>('');
  // const [nome, setNome] = useState<string>(usuario?.nome || '');
  // const [nomeUsuario, setNomeUsuario] = useState<string>(usuario?.nomeUsuario || '');

  // useEffect(() => {
  //   setNome(usuario?.nome || '')
  //   setNomeUsuario(usuario?.nomeUsuario || '')
  // }, [usuario])



  const handle = async () => {

    const id = usuario!.id
    if(senha.length >= 3){
      try {
        await AtualizarUsuarioSenha({ id, senha })
        setOpen(false)
        // handleOnEdit()
        setSenha('')
        
      } catch (e: any) {
        console.error(e.response?.request?.status);
        setOpen(false);
        setSenha('')
      }
    }else {
      window.alert("Digite uma senha válida!")
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
            Editando senha
          </h2>

          <div className='mt-5 w-72'>
            <TextField id="standard-basic" label="Senha" type='password' variant="filled" onChange={(e) => setSenha(e.target.value)} sx={{ width: '100%' }}/>
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