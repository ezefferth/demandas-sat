


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../components/data/context/authContext';
import { AtualizarUsuarioFoto } from '../../../components/data/fetch/usuarios/atualizarUsuarioFoto';
import { LerUsuario } from '../../../components/data/fetch/usuarios/lerUsuario';

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

export default function ModalEditarFotoUsuario({ open, handleClose, setOpen }: Props) {

  const { usuario, setUsuario } = useContext(AuthContext)
  /* const { setCategorias } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerCategorias({ setCategorias })

  } */


  const [avatar, setAvatar] = useState<Base64URLString>();
  // const [nome, setNome] = useState<string>(usuario?.nome || '');
  // const [nomeUsuario, setNomeUsuario] = useState<string>(usuario?.nomeUsuario || '');




  const handle = async () => {

    const id = usuario!.id
    if (avatar) {
      try {
        await AtualizarUsuarioFoto({ id, avatar })
        setOpen(false)
        // handleOnEdit()
        await LerUsuario({ id, setUsuario })

        setAvatar(undefined)


      } catch (e: any) {
        console.error(e.response?.request?.status);
        setOpen(false);
        setAvatar(undefined)
      }
    } else {
      window.alert("Selecione um avatar!")
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
            Editando Avatar
          </h2>

          <input
            className='mt-6'
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  setAvatar(reader.result as string); // Converte a imagem para base64
                };
                reader.readAsDataURL(file);
              }
            }}
          />

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