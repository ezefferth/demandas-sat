


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { Setor } from '../../../components/types';
import { LerSetores } from '../../../components/data/fetch/setores/lerSetores';
import { AtualizarSetor } from '../../../components/data/fetch/setores/atualizarSetor';
import { SelectChangeEvent, TextField } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
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
  setor: Setor | null
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void
  handleCloseEdit: (value: boolean) => void
}

export default function ModalEditarSetor({ setor, openEdit, handleCloseEdit, setOpenEdit }: Props) {


  const { setSetores } = useContext(DataContext)

  const handleOnEdit = async () => {
    await LerSetores({ setSetores })

  }

  const [nome, setNome] = useState<string>(setor?.nome || '');
  const [status, setStatus] = useState<boolean>(setor?.status || false)
  const [statusSelected, setStatusSelected] = useState<string>(setor?.status ? 'Sim' : 'Não')
  const [recebeAssunto, setRecebeAssunto] = useState<boolean>(setor?.recebeAssunto || false)
  const [recebeAssuntoSelected, setRecebeAssuntoSelected] = useState<string>(setor?.recebeAssunto ? 'Sim' : 'Não')

  useEffect(() => {
    if (!setor) return;

    setNome(setor.nome);

    if (setor.status === true) {
      setStatus(true);
      setStatusSelected('Sim')
    }
    else {
      setStatus(false);
      setStatusSelected('Não');
    }

    if (setor.recebeAssunto === true) {
      setRecebeAssunto(true)
      setRecebeAssuntoSelected('Sim')
    }
    else {
      setRecebeAssunto(false)
      setRecebeAssuntoSelected("Não")
    }


  }, [setor])

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value == 'Sim') {
      setStatus(true);
      setStatusSelected('Sim')
    }
    else {
      setStatus(false);
      setStatusSelected('Não');
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleREdit = async () => {
    if (loading) return;
    setLoading(true);

    if (!setor) {
      setLoading(false);
      return null;
    }

    if (nome.length < 2) {
      toast.error("Favor preencher corretamente o nome do setor.");
      setLoading(false);
      return;
    }

    const id = setor.id;

    const promise: Promise<AxiosResponse> = AtualizarSetor({ id, nome, status, recebeAssunto });

    toast.promise(promise, {
      pending: "Editando setor...",
      success: "Setor editado com sucesso!",
      error: "Erro ao editar setor!",
    });

    try {
      await promise;
      setOpenEdit(false);
      handleOnEdit();
      setNome("");
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenEdit(false);
      setNome("");
    } finally {
      setLoading(false);
    }
  };



  const handleChangeR = (event: SelectChangeEvent) => {

    if (event.target.value == 'Sim') {
      setRecebeAssunto(true);
      setRecebeAssuntoSelected('Sim');
    }
    else {
      setRecebeAssunto(false);
      setRecebeAssuntoSelected('Não');
    }
  };


  return (
    <div>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className='text-center'>
            Editando Setor
          </h2>
          <p className='text-center'>
            {setor?.nome}
          </p>

          <div className='mt-5 mb-4 w-72'>
            <TextField id="standard-basic" label="Nome" variant="filled" onChange={(e) => setNome(e.target.value)} sx={{ width: '100%' }} defaultValue={setor?.nome} />
          </div>

          <div className='mt-2'>
            <FormControl variant="standard" sx={{ width: '100%' }} disabled>
              <InputLabel id="demo-simple-select-standard-label" sx={{ pl: 2 }}>Recebe assunto?</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={recebeAssuntoSelected}
                onChange={handleChangeR}
                label="Assunto"
                defaultValue='Não'
                sx={{ pl: 1.75 }}
              >
                <MenuItem key='Não' value='Não'>
                  Não
                </MenuItem>
                <MenuItem key='Sim' value='Sim'>
                  Sim
                </MenuItem>

              </Select>
            </FormControl>
          </div>
          <div className='mt-2'>

            <FormControl variant="standard" sx={{ width: '100%', }}>
              <InputLabel id="demo-simple-select-standard-label" sx={{ pl: 2 }}>Ativo?</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={statusSelected}
                onChange={handleChange}
                label="Assunto"
                // defaultValue={setor?.status ? 'Sim' : 'Não'}
                sx={{ pl: 1.75 }}
              >
                <MenuItem key='Não' value='Não'>
                  Não
                </MenuItem>
                <MenuItem key='Sim' value='Sim'>
                  Sim
                </MenuItem>

              </Select>
            </FormControl>
          </div>

          <div className='text-slate-600 font-thin text-xs mt-8'>
            <div className='flex justify-between gap-4'>
              <p>Criado em:</p>
              <p>
                {setor?.createdAt
                  ? new Date(setor.createdAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
            <div className='flex justify-between gap-4'>
              <p>Atualizado em:</p>
              <p>
                {setor?.createdAt
                  ? new Date(setor.updatedAt).toLocaleString()
                  : 'Data não disponível'}
              </p>
            </div>
          </div>


          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={() => setOpenEdit(false)}>
              Cancelar
            </button>
            <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleREdit}>
              Atualizar
            </button>
          </div>
        </Box>
      </Modal>
    </div >
  );
}