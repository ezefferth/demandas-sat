import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useState } from 'react';
import { DataContext } from '../../../components/data/context/dataContext';
import { TextField } from '@mui/material';
import { AtualizarPatrimonioChamado } from '../../../components/data/fetch/chamados/atualizarPatrimonioChamado';
import { Chamado, Patrimonio } from '../../../components/types';
import { LerChamados } from '../../../components/data/fetch/chamados/lerChamados';
import { FaArrowRight, FaX } from "react-icons/fa6";
import { AtualizarRemoverPatrimonioChamado } from '../../../components/data/fetch/chamados/atualizarRemoverPatrimonioChamado';

import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 15,
  p: 2,
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  chamado: Chamado;
};

export default function ModalPatrimonio({ open, setOpen, chamado }: Props) {
  const [patrimonioId, setPatrimonioId] = useState<string>(''); // Usando apenas um ID de patrimônio
  const [patrimonio, setPatrimonio] = useState<string>(''); // Usando apenas um ID de patrimônio
  const [error, setError] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);

  const { patrimonios, setChamados } = useContext(DataContext);
  const [patrimoniosAux, setPatrimoniosAux] = useState<Patrimonio>();

  function handleAddPatrimonio() {
    // Verifica se o patrimônio já está na lista auxiliar

    const aux = chamado.patrimonios.filter(pt => Number(pt.patrimonio) === Number(patrimonio))


    if (patrimonio) {
      const patrimonioFiltrado = patrimonios?.find(pt => Number(pt.patrimonio) === Number(patrimonio));
      console.log('Patrimônio encontrado:', patrimonioFiltrado);

      if (aux.length > 0) {
        setError2(true);
        return;
      }

      if (!patrimonioFiltrado) {
        setError(true);
      }
      else {
        // Adiciona à lista auxiliar, mas não cadastra ainda
        setPatrimonioId(patrimonioFiltrado.id)
        setPatrimoniosAux(patrimonioFiltrado);
        setError(false);
        setError2(false);
        // setPatrimonioId('');
        setPatrimonio('');
      }
    }
  }

  const [loading, setLoading] = useState<boolean>(false);

  const handleCadastrar = async () => {
    if (loading) return; // impede múltiplos cliques
    setLoading(true);

    const promise: Promise<AxiosResponse> = AtualizarPatrimonioChamado({ id: chamado.id, patrimonioId });

    toast.promise(promise, {
      pending: "Enviando comentario...",
      success: "Comentario criado com sucesso!",
      error: "Erro ao criar comentario!",
    });
    try {
      await promise;

      console.log("Todos os patrimônios cadastrados com sucesso!");

      setPatrimoniosAux(undefined);
      setPatrimonioId('');

      // Atualiza a lista de chamados após o sucesso
      await LerChamados({ setChamados });
    } catch (e) {
      console.error("Erro ao cadastrar patrimônios:", e);
    } finally {
      setLoading(false);
    }
  };

  const [loadingR, setLoadingR] = useState<boolean>(false);
  const handleRemover = async (patrimonioId: string) => {
    if (loadingR) return; // impede múltiplos cliques
    setLoadingR(true);

    const promise: Promise<AxiosResponse> = AtualizarRemoverPatrimonioChamado({ id: chamado.id, patrimonioId });


    toast.promise(promise, {
      pending: "Removendo patrimônios...",
      success: "Patrimônios removido com sucesso!",
      error: "Erro ao remover patrimônio!",
    });
    try {
      // Faz o cadastro de todos os patrimônios na lista auxiliar, um por um

      await promise

      console.log("Todos os patrimônios removidos com sucesso!");

      // Limpa a lista auxiliar
      setPatrimoniosAux(undefined);
      setPatrimonioId('');

      // Atualiza a lista de chamados após o sucesso
      await LerChamados({ setChamados });
    } catch (e) {
      console.error("Erro ao remover patrimônios:", e);
    } finally {
      setLoadingR(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setError(false);
    setError2(false);
    setPatrimoniosAux(undefined);
    setPatrimonioId('');
    setPatrimonio('');
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
            Cadastrar/Alterar Patrimonios
          </h2>

          <div className='mt-5 mb-4'>
            <div className='flex items-center gap-3'>
              <TextField
                id="standard-basic"
                type='text'
                size='small'
                label="ID do Patrimônio"
                placeholder='ID do Patrimônio'
                variant="standard"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
                sx={{
                  width: '100%',
                }}
              />
              <button
                className='rounded-full bg-gray-900 p-1 hover:bg-gray-800 transition-all'
                onClick={() => handleAddPatrimonio()}
              >
                <FaArrowRight className='text-gray-100' />
              </button>
            </div>

            {error && (
              <div className='flex justify-center mt-5'>
                <p className='text-red-500'>Patrimônio não encontrado.</p>
              </div>
            )}

            {error2 && (
              <div className='flex justify-center mt-5'>
                <p className='text-red-500'>Patrimônio já inserido.</p>
              </div>
            )}

            {patrimoniosAux && (
              <div className='mt-4'>
                <p className='text-sm text-center mb-2'>Patrimônio a ser cadastrado:</p>
                <div className='flex gap-2 hover:pl-1 h-6 cursor-pointer transition-all'>
                  <p>{patrimoniosAux.patrimonio}</p>
                  <p>{patrimoniosAux.descricao}</p>
                </div>
              </div>
            )}
            <div className='mt-6'>
              <p className='text-sm text-center mb-2'>Patrimônios cadastrados:</p>
              {
                chamado.patrimonios?.map((pt, index) => {
                  return (
                    <div key={index} className='flex justify-between mt-1'>
                      <div className='flex gap-2 hover:pl-1 h-6 cursor-pointer transition-all' key={pt.id}>
                        <p>{pt.patrimonio}</p>
                        <p className='truncate max-w-xs'>{pt.descricao}</p>
                      </div>
                      <div>
                        <button onClick={() => handleRemover(pt.id)}>
                          <FaX className='hover:text-gray-700 transition-all' />
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className='flex justify-center gap-4 mt-4'>
            <button className='border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all' onClick={handleClose}>
              Cancelar
            </button>

            {patrimoniosAux && (
              <button className='border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all' onClick={handleCadastrar}>
                Cadastrar
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
