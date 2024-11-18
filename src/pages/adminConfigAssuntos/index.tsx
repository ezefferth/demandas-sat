

// import React from 'react'

import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { DataContext } from "../../components/data/context/dataContext";
import { Assunto } from "../../components/types";
import { TiEdit, TiTrash } from "react-icons/ti";

import ModalRemoverAssunto from "./modalDel";
import ModalAddAssunto from "./modalAdd";
import ModalEditarAssunto from "./modalEdit";

export default function Assuntos() {

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openRemove, setOpenRemove] = useState(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [selectedAssunto, setSelectedAssunto] = useState<Assunto>()

  const { assuntos } = useContext(DataContext)

  const handleSeletedRemove = (e: React.MouseEvent<HTMLButtonElement>, assunto: Assunto): void => {
    e.preventDefault()
    setSelectedAssunto(assunto)
    handleOpenRemove()
  }

  const handleSeletedEdit = (e: React.MouseEvent<HTMLButtonElement>, assunto: Assunto): void => {
    e.preventDefault()
    setSelectedAssunto(assunto)
    handleOpenEdit()
  }

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Assuntos</p>
        </div>
        <button onClick={handleOpen}>
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
        </button>
      </div>
      <div className="mt-8 p-8 text-slate-900 w-[36rem] mx-auto">
        <div className="flex justify-between font-semibold">
          <p>Nome</p>
          <p>Ações</p>
        </div>

        <div className="mt-3">
          {
            assuntos?.map((assunto: Assunto) => {
              return (
                <div key={assunto.id} >
                  <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                    <p className="text-slate-900">{assunto.nome}</p>
                    <div className="flex gap-1">
                      <button onClick={(e) => handleSeletedEdit(e, assunto)}>
                        <TiEdit size={25} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
                      </button>
                      <button onClick={(e) => handleSeletedRemove(e, assunto)}>
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
      <ModalRemoverAssunto assunto={selectedAssunto ?? null} openRemove={openRemove} handleCloseRemove={handleCloseRemove} setOpenRemove={setOpenRemove} />
      <ModalAddAssunto openAdd={openAdd} handleClose={handleClose} setOpenAdd={setOpenAdd} />
      <ModalEditarAssunto assunto={selectedAssunto ?? null} openEdit={openEdit} handleCloseEdit={handleCloseEdit} setOpenEdit={setOpenEdit} />
    </div>
  )
}
