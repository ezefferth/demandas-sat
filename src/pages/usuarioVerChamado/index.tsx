
import { useLocation } from 'react-router-dom';
import { Chamado } from '../../components/types';
import { useContext } from 'react';
import { DataContext } from '../../components/data/context/dataContext';


export default function VerChamado() {

  const location = useLocation();
  const chamado = location.state as Chamado;

  const { assuntos, setores } = useContext(DataContext)

  if (chamado) {
    return (
      <div className="p-12">
        <div className="flex justify-between items-center">
          <div className="font-normal text-lg">
            <p>Chamado N-{chamado.id}</p>
          </div>
          {/* <button onClick={handleOpen}>
            <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
          </button> */}
        </div>
        <div className="mt-8 p-8 text-slate-900 w-[40rem] mx-auto">
          <div className='flex'>
            <div className='w-24'>
              <p>Assunto:</p>
            </div>
            <div>
              {
                assuntos?.map(assunto => {
                  if (assunto.id == chamado.assuntoId) {
                    return (
                      <span>{assunto.nome}</span>
                    )
                  }
                })
              }
            </div>
          </div>
          <div className='flex'>
            <div className='w-24'>
              <p>Setor:</p>
            </div>
            <div>
              {
                setores?.map(setor => {
                  if (setor.id == chamado.setorId) {
                    return (
                      <span>{setor.nome}</span>
                    )
                  }
                })
              }
            </div>
          </div>
          <div className='flex'>
            <div className='w-24'>
              <p>Descrição:</p>
            </div>
            <div>
              <p>{chamado.descricao}</p>
            </div>
          </div>
        </div>
        {/* <div className="mt-8 p-8 text-slate-900 w-[40rem] mx-auto">
          <div className="flex justify-between font-semibold">
            <p>ID</p>
            <p>Assunto</p>
            <p>Ações</p>
          </div>

          <div className="mt-3">
            {
              chamados?.map((chamado: Chamado) => {
                return (
                  <div key={chamado.id} >
                    <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                      <p className="text-slate-900">{chamado.id}</p>
                      {
                        assuntos?.map((assunto) => {
                          if (assunto.id == chamado.assuntoId) {
                            return (
                              <p className="text-slate-900">{assunto.nome}</p>
                            )
                          }
                        })
                      }
                      <div className="flex gap-1">

                        <button onClick={(e) => handleSeletedVisualizar(e, chamado)}>
                          <FaSearch size={23} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
                        </button>
                        <div className="border-b-2 border-slate-300" />
                      </div>
                    </div>
                    <div className="border-b border-slate-300 my-1 w-full" />
                  </div>
                )
              })
            }
          </div>

        </div> */}
        {/* <ModalRemoverCategoria categoria={selectedCategoria ?? null} openRemove={openRemove} handleCloseRemove={handleCloseRemove} setOpenRemove={setOpenRemove} /> */}
        {/* <ModalAddChamado openAdd={openAdd} handleClose={handleClose} setOpenAdd={setOpenAdd} /> */}
        {/* <ModalEditarCategoria categoria={selectedCategoria ?? null} openEdit={openEdit} handleCloseEdit={handleCloseEdit} setOpenEdit={setOpenEdit} /> */}
      </div>
    )
  }


}
