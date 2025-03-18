


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { CriarPatrimonio } from '../../../components/data/fetch/patrimonio/criarPatrimonio';
import { LerPatrimonios } from '../../../components/data/fetch/patrimonio/lerPatrimonio';

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

export default function ModalAddPatrimonio({ openAdd, handleClose, setOpenAdd }: Props) {

  

  const [descricao, setDescricao] = useState<string>('')
  const [patrimonio, setPatrimonio] = useState<number | null>(null)
  const [tipoPatrimonioId, setTipoPatrimonioId] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [setorId, setSetorId] = useState<string>('')

  const { setPatrimonios, tipoPatrimonio, setores } = useContext(DataContext)

  const handleOnAdd = async () => {
    await LerPatrimonios({ setPatrimonios })

  }

  const handleAdd = async () => {
    try {
      if (descricao.length >= 2) {
        await CriarPatrimonio({ descricao, patrimonio, tipoPatrimonioId, status, setorId })
        setOpenAdd(false)
        handleOnAdd()
        setDescricao('')
        setTipoPatrimonioId('')
        setPatrimonio(null)
        setStatus('')
        setOpenAdd(false);    
      } else {
        window.alert("Favor digitar o nome do setor corretamente!");
      }
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setDescricao('')
      setTipoPatrimonioId('')
      setPatrimonio(0)
      setStatus('')
      setOpenAdd(false);      
    }
  }


  const handleChange = (event: SelectChangeEvent) => {
    setTipoPatrimonioId(event.target.value)
  };

  const handleChangeSetor = (event: SelectChangeEvent) => {
    setSetorId(event.target.value)
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
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
            Cadastrar Patrimônio
          </h2>
          <div className='mt-5'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Descrição" variant="standard" onChange={e => setDescricao(e.target.value)} sx={{ width: '16rem' }} />
          </div>
          <div className='mt-1 mb-1'>
            {/* <label>Nome</label> */}
            <TextField id="standard-basic" label="Número do patrimônio" type='text' variant="standard" onChange={e => setPatrimonio(parseInt(e.target.value))} sx={{ width: '16rem' }} />
          </div>
          <div className='mt-1'>

            <FormControl id='standard-basic' variant="standard" sx={{ width: '100%', }}>
              <InputLabel id="demo-simple-select-standard-label" sx={{}}>Status do Equipamento</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={status}
                onChange={handleChangeStatus}
                label="Assunto"
                sx={{}}
              >
                <MenuItem key='Novo' value='Novo'>
                  Novo
                </MenuItem>
                <MenuItem key='Ótimo' value='Ótimo'>
                  Ótimo
                </MenuItem>
                <MenuItem key='Bom' value='Bom'>
                  Bom
                </MenuItem>
                <MenuItem key='Regular' value='Regular'>
                  Regular
                </MenuItem>
                <MenuItem key='Péssimo' value='Péssimo'>
                  Péssimo
                </MenuItem>
                <MenuItem key='Inservível' value='Inservível'>
                  Inservível
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='mt-1'>
            <FormControl id='standard-basic' variant="standard" sx={{ width: '100%', }}>
              <InputLabel id="demo-simple-select-standard-label" sx={{}}>Tipo do Equipamento</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={tipoPatrimonioId}
                onChange={handleChange}
                label="Tipo do Equipamento"
                sx={{}}
              >
                {
                  tipoPatrimonio?.map(tp => (
                    <MenuItem key={tp.nome} value={tp.id}>
                      {tp.nome}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className='mt-1'>
            <FormControl id='standard-basic' variant="standard" sx={{ width: '100%', }}>
              <InputLabel id="demo-simple-select-standard-label" sx={{}}>Setor</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={setorId}
                onChange={handleChangeSetor}
                label="Tipo do Equipamento"
                sx={{}}
              >
                {
                  setores?.map(st => (
                    <MenuItem key={st.nome} value={st.id}>
                      {st.nome}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
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