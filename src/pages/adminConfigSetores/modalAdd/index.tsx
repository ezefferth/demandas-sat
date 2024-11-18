


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { LerSetores } from '../../../components/data/fetch/setores/lerSetores';
import { CriarSetor } from '../../../components/data/fetch/setores/criarSetor';

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
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void
  handleClose: (value: boolean) => void
}

export default function ModalAddSetor({ openAdd, handleClose, setOpenAdd }: Props) {

  const [nome, setNome] = useState<string>('')

  const { setSetores } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerSetores({ setSetores })

  }

  const handleAdd = async () => {
    try {
      if (nome.length >= 4) {
        await CriarSetor({ nome })
        setOpenAdd(false)
        handleOnAdd()
      } else {
        window.alert("Favor digitar o nome do setor corretamente!");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setNome('')
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
            Cadastrar Setor
          </h2>
          <div className='mt-5'>
            {/* <label>Nome</label> */}
            <input className='border bg-slate-100 border-slate-700 w-56 pl-2 text-slate-800 rounded-lg active:border-slate-500' placeholder='Nome do setor' onChange={e => setNome(e.target.value)} />
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