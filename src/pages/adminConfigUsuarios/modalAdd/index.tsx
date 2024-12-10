


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
// import { LerAssuntos } from '../../../components/data/fetch/assuntos/lerAssuntos';
// import { CriarAssunto } from '../../../components/data/fetch/assuntos/criarSetor';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { LerUsuarios } from '../../../components/data/fetch/usuarios/lerUsuarios';
import { CriarUsuario } from '../../../components/data/fetch/usuarios/criarUsuario';

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
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void
  handleClose: (value: boolean) => void
}

export default function ModalAddUsuario({ openAdd, handleClose, setOpenAdd }: Props) {

  const [nome, setNome] = useState<string>('')
  const [admin, setAdmin] = useState<boolean>(false)
  const [adminSelected, setAdminSelected] = useState<string>('Não')
  const [nomeUsuario, setNomeUsuario] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const { setUsuarios, /* categorias */ } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerUsuarios({ setUsuarios })
  }


  const handleAdd = async () => {
    try {
      if (nome.length >= 4 && nomeUsuario.length >= 4) {
        await CriarUsuario({ nome, senha, admin, nomeUsuario })
        setOpenAdd(false)
        handleOnAdd()
      } else {
        window.alert("Favor digitar o nome do usuario corretamente!");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setNome('')
      setOpenAdd(false);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    
    if(event.target.value == 'Sim'){
      setAdmin(true);
      setAdminSelected('Sim');
    }
    else{
      setAdmin(false);
      setAdminSelected('Não');
    }
  };

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
            Cadastrar Usuário
          </h2>
          <div className='mt-5'>
            <TextField id="standard-basic" label="Nome" variant="standard" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} />
          </div>
          <div className='mt-2 mb-2'>
            <TextField id="standard-basic" label="Nome de usuário" variant="standard" onChange={(e) => setNomeUsuario(e.target.value)} sx={{ width: '100%' }} />
          </div>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label">Administrador?</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={adminSelected}
              onChange={handleChange}
              label="Assunto"
              defaultValue='Não'
            >
              <MenuItem key='Não' value='Não'>
                Não
              </MenuItem>
              <MenuItem key='Sim' value='Sim'>
                Sim
              </MenuItem>
              
            </Select>
          </FormControl>
          <div className='mt-2 mb-4'>
            <TextField id="standard-basic" label="Senha" type='password' variant="standard" onChange={(e) => setSenha(e.target.value)} sx={{ width: '100%' }} />
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