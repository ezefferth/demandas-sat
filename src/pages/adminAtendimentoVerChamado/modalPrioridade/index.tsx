


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Chamado } from '../../../components/types';
import { AtualizarPrioridadeChamado } from '../../../components/data/fetch/chamados/atualizarPrioridadeChamado';
import { LerChamados } from '../../../components/data/fetch/chamados/lerChamados';

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
  chamado: Chamado;
  // onUpdate: (updatedChamado: Chamado) => void;
}

export default function ModalPrioridade({ open, handleClose, setOpen, chamado }: Props) {


  const [prioridadeId, setPrioridadeId] = useState<string>('')

  const { prioridades, setChamados } = useContext(DataContext)

  useEffect(() => {
    if (chamado) {
      setPrioridadeId(chamado.prioridadeId || '');
    }
  }, [chamado])

  const handle = async () => {
    try {
      await AtualizarPrioridadeChamado({ id: chamado.id, prioridadeId });
      setOpen(false);

      await LerChamados({setChamados})

      // Atualiza o contexto global ou o estado local do chamado
      //onUpdate(updatedChamado);
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpen(false);
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
            Alterar Status
          </h2>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={prioridadeId}
              onChange={handleChange}
              defaultValue={
                prioridades?.find(st => st.id === chamado.prioridadeId)?.nome || ''
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