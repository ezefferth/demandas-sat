


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { TextField } from '@mui/material';
import { LerPrioridades } from '../../../components/data/fetch/prioridade/lerPrioridades';
import { CriarPrioridade } from '../../../components/data/fetch/prioridade/criarPrioridade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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

export default function ModalAddPrioridade({ openAdd, handleClose, setOpenAdd }: Props) {

  const [nome, setNome] = useState<string>('')
  const [cor, setCor] = useState<string>('')

  const { setPrioridades } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerPrioridades({ setPrioridades })

  }

  const handleAdd = async () => {
    try {
      if (nome.length >= 3 && cor.length >=3) {
        await CriarPrioridade({ nome, cor })
        setOpenAdd(false)
        handleOnAdd()
      } else {
        window.alert("Favor digitar o nome do status ou cor corretamente!");
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
            Cadastrar Prioridade
          </h2>
          <div className='mt-5'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Nome da Prioridade" variant="standard" onChange={e => setNome(e.target.value)} sx={{ width: '16rem' }} />
          </div>

          <div className='mt-5'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Cód. da Cor" variant="standard" onChange={e => setCor(e.target.value)} sx={{ width: '16rem' }} />
          </div>


          <p className='mt-8 text-center font-thin text-slate-600 text-sm'>A cor deve ser colocada em hexadecimal</p>
          <p className='mb-4 text-center font-thin text-slate-600 text-sm'>Consulte sugestões de cores <a href='https://celke.com.br/artigo/tabela-de-cores-html-nome-hexadecimal-rgb' target='_blank'>aqui</a></p>

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