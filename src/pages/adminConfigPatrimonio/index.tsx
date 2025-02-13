

// import React from 'react'

import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { DataContext } from "../../components/data/context/dataContext";
import { Patrimonio } from "../../components/types";
import { TiEdit, TiTrash } from "react-icons/ti";
import ModalRemoverSetor from "./modalDel";
import ModalEditarSetor from "./modalEdit";
import ModalAddPatrimonioTipo from "./modalAddTipo";
import ModalAddPatrimonio from "./modalAdd";

export default function Patrimonios() {
  const [btn, setBtn] = useState<number>(1)

  const [openAddTipo, setOpenAddTipo] = useState(false);
  const handleOpenTipo = () => setOpenAddTipo(true);
  const handleCloseTipo = () => setOpenAddTipo(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openRemove, setOpenRemove] = useState(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [selectedPatrimonio, setSelectedPatrimonio] = useState<Patrimonio>()

  const { patrimonios, tipoPatrimonio } = useContext(DataContext)


  const handleSeletedRemove = (e: React.MouseEvent<HTMLButtonElement>, patrimonio: Patrimonio): void => {
    e.preventDefault()
    setSelectedPatrimonio(patrimonio)
    handleOpenRemove()
  }

  const handleSeletedEdit = (e: React.MouseEvent<HTMLButtonElement>, patrimonio: Patrimonio): void => {
    e.preventDefault()
    setSelectedPatrimonio(patrimonio)
    handleOpenEdit()
  }

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Patrimônios</p>
        </div>
        <button onClick={handleOpen}>
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
        </button>
      </div>
      <div className="flex justify-center mt-16 gap-4 text-slate-50">
        <button
          className={`px-4 py-1 rounded-md ${btn === 1 ? 'bg-slate-500' : 'bg-slate-600'} hover:bg-slate-500 transition-all`}
          onClick={() => setBtn(1)}
        >Todos</button>
        {
          tipoPatrimonio?.map((tipo, index) => {
            return (
              <button
                key={index}
                className={`px-4 py-1 rounded-md ${btn === index + 2 ? 'bg-slate-500' : 'bg-slate-600'} hover:bg-slate-500 transition-all`}
                onClick={() => setBtn(index + 2)}
              >{tipo.nome}</button>
            )
          })
        }
        <button onClick={handleOpenTipo} className="rounded-md">
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-8 w-8" />
        </button>
      </div>
      <div className="mt-8 p-8 text-slate-900 w-[36rem] mx-auto">
        <div className="flex justify-between font-semibold">
          <p>Nome</p>
          <p>Ações</p>
        </div>

        <div className="mt-3">
          {
            patrimonios?.map((patrimonio: Patrimonio) => {
              return (
                <div key={patrimonio.id} >
                  <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                    <p className="text-slate-900">{patrimonio.descricao}</p>
                    <div className="flex gap-1">
                      <button onClick={(e) => handleSeletedEdit(e, patrimonio)}>
                        <TiEdit size={25} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
                      </button>
                      <button onClick={(e) => handleSeletedRemove(e, patrimonio)}>
                        <TiTrash size={25} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
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

      </div>
      {/* <ModalRemoverSetor patrimonio={selectedPatrimonio ?? null} openRemove={openRemove} handleCloseRemove={handleCloseRemove} setOpenRemove={setOpenRemove} /> */}
      <ModalAddPatrimonio openAdd={openAdd} handleClose={handleClose} setOpenAdd={setOpenAdd} />
      <ModalAddPatrimonioTipo openAdd={openAddTipo} handleClose={handleCloseTipo} setOpenAdd={setOpenAddTipo} />
      {/* <ModalEditarSetor patrimonio={selectedPatrimonio ?? null} openEdit={openEdit} handleCloseEdit={handleCloseEdit} setOpenEdit={setOpenEdit} /> */}
    </div>
  )
}
