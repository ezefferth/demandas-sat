


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { AtualizarStatusDemanda } from '../../../components/data/fetch/chamados/atualizarStatusChamado';
import { Demanda } from '../../../components/types';
import { LerDemandas } from '../../../components/data/fetch/chamados/lerChamados';

import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void
  handleClose: (value: boolean) => void
  demanda: Demanda;
  // onUpdate: (updatedChamado: Chamado) => void;
}

export default function ModalStatus({ open, handleClose, setOpen, demanda }: Props) {


  const [statusId, setStatusId] = useState<string>('')

  const { status, setDemandas } = useContext(DataContext)



  useEffect(() => {
    if (demanda) {
      setStatusId(demanda.statusId || '');
    }
  }, [demanda])

  const [loading, setLoading] = useState<boolean>(false);
  const handle = async () => {
    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    const promise: Promise<AxiosResponse> = AtualizarStatusDemanda({ id: demanda.id, statusId });

    toast.promise(promise, {
      pending: "Atualizando status...",
      success: "Status atualizado com sucesso!",
      error: "Erro ao atualizar status!",
    });

    try {
      await promise
      setOpen(false);

      await LerDemandas({ setDemandas })
      // Atualiza o contexto global ou o estado local do chamado
      //onUpdate(updatedChamado);
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatusId(event.target.value);
  };


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
            Alterar Status
          </h2>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={statusId}
              onChange={handleChange}
              defaultValue={
                status?.find(st => st.id === demanda.statusId)?.nome || ''
              }
              label="Status"
            >
              {
                status?.map(st => (
                  <MenuItem key={st.id} value={st.id} >
                    {st.nome}
                  </MenuItem>
                ))
              }

            </Select>
          </FormControl>
          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handle}>
              Cadastrar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}