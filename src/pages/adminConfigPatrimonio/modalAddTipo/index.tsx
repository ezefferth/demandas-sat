


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { TextField } from '@mui/material';
import { CriarTipoPatrimonio } from '../../../components/data/fetch/tipoPatrimonio/criarTipoPatrimonio';
import { LerTipoPatrimonios } from '../../../components/data/fetch/tipoPatrimonio/lerTipoPatrimonio';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

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

export default function ModalAddPatrimonioTipo({ openAdd, handleClose, setOpenAdd }: Props) {

  const [nome, setNome] = useState<string>('')

  const { setTipoPatrimonio } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerTipoPatrimonios({ setTipoPatrimonio })
  }
  const [loading, setLoading] = useState<boolean>(false);
  const handleAdd = async () => {

    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    if (nome.length <= 2) {
      toast.error("Favor, preencher o nome corretamente.");
      setLoading(false);
      return
    }

    const promise: Promise<AxiosResponse> = CriarTipoPatrimonio({ nome })

    toast.promise(promise, {
      pending: "Enviando tipo patrimônio...",
      success: "Tipo Patrimônio criado com sucesso!",
      error: "Erro ao criar tipo patrimônio!",
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
            Cadastrar Tipo de Patrimônio
          </h2>
          <div className='mt-5'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Tipo" variant="standard" onChange={e => setNome(e.target.value)} sx={{ width: '16rem' }} />
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