


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Demanda } from '../../../components/types';
import { AtualizarPrioridadeDemanda } from '../../../components/data/fetch/demandas/atualizarPrioridadeDemanda';
import { LerDemandas } from '../../../components/data/fetch/demandas/lerDemandas';

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

export default function ModalPrioridade({ open, handleClose, setOpen, demanda }: Props) {


  const [prioridadeId, setPrioridadeId] = useState<string>('')

  const { prioridades, setDemandas } = useContext(DataContext)

  useEffect(() => {
    if (demanda) {
      setPrioridadeId(demanda.prioridadeId || '');
    }
  }, [demanda])
  const [loading, setLoading] = useState<boolean>(false);


  const handle = async () => {
    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    const promise: Promise<AxiosResponse> = AtualizarPrioridadeDemanda({ id: demanda.id, prioridadeId });

    toast.promise(promise, {
      pending: "Atualizando prioridade...",
      success: "Prioridade atualizada com sucesso!",
      error: "Erro ao atualizar prioridade!",
    });

    try {
      await promise
      setOpen(false);

      await LerDemandas({ setDemandas })

      // Atualiza o contexto global ou o estado local do chamado
      //onUpdate(updatedChamado);
    } catch (e: any) {
      toast.error("Erro ao atualizar prioridade!");
      console.error(e.response?.request?.status);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPrioridadeId(event.target.value);
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
            Alterar Prioridade
          </h2>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label">Prioridade</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={prioridadeId}
              onChange={handleChange}
              defaultValue={
                prioridades?.find(st => st.id === demanda.prioridadeId)?.nome || ''
              }
              label="Status"
            >
              {
                prioridades?.map(st => (
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
              Alterar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}