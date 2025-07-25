


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { CriarCategoria } from '../../../components/data/fetch/categoria/criarCategoria';
import { LerCategorias } from '../../../components/data/fetch/categoria/lerCategoria';
import { DataContext } from '../../../components/data/context/dataContext';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

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

export default function ModalAddCategoria({ openAdd, handleClose, setOpenAdd }: Props) {

  const [nome, setNome] = useState<string>('')

  const { setCategorias } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerCategorias({ setCategorias })

  }
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdd = async () => {
    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    if (nome.length <= 4) {
      toast.error("Favor digitar o nome do setor corretamente!");
      setLoading(false)
      return
    }

    const promise: Promise<AxiosResponse> = CriarCategoria({ nome })

    toast.promise(promise, {
      pending: "Enviando categoria...",
      success: "Categoria criada com sucesso!",
      error: "Erro ao criar categoria!",
    });

    try {
      await promise
      setOpenAdd(false)
      handleOnAdd()

    } catch (e: any) {
      console.error(e.response?.request?.status);
      setNome('')
      setOpenAdd(false);
    } finally {
      setLoading(false);
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
            Cadastrar Categoria
          </h2>
          <div className='mt-5'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Nome da categoria" variant="standard" onChange={e => setNome(e.target.value)} sx={{ width: '16rem' }} />
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