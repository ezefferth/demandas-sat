

// import React from 'react'

import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { DataContext } from "../../components/data/context/dataContext";
import { Status } from "../../components/types";
import { TiEdit, TiTrash } from "react-icons/ti";
import ModalRemoverStatus from "./modalDel";
import ModalAddStatus from "./modalAdd";
import ModalEditarStatus from "./modalEdit";

export default function StatusPage() {

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openRemove, setOpenRemove] = useState(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [selectedStatus, setSelectedStatus] = useState<Status>()

  const { status } = useContext(DataContext)

  const handleSeletedRemove = (e: React.MouseEvent<HTMLButtonElement>, status: Status): void => {
    e.preventDefault()
    setSelectedStatus(status)
    handleOpenRemove()
  }

  const handleSeletedEdit = (e: React.MouseEvent<HTMLButtonElement>, status: Status): void => {
    e.preventDefault()
    setSelectedStatus(status)
    handleOpenEdit()
  }

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Status</p>
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
            status?.map((st: Status) => {
              return (
                <div key={st.id} >
                  <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                    <p className="text-slate-900">{st.nome}</p>
                    <div className="flex gap-1">
                      <span style={{ backgroundColor: st.cor }} className="rounded-lg px-2 mr-8 text-sm items-center justify-center flex w-20">{st.cor}</span>
                      <button onClick={(e) => handleSeletedEdit(e, st)}>
                        <TiEdit size={25} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
                      </button>
                      <button onClick={(e) => handleSeletedRemove(e, st)}>
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
      <ModalRemoverStatus status={selectedStatus ?? null} openRemove={openRemove} handleCloseRemove={handleCloseRemove} setOpenRemove={setOpenRemove} />
      <ModalAddStatus openAdd={openAdd} handleClose={handleClose} setOpenAdd={setOpenAdd} />
      <ModalEditarStatus status={selectedStatus ?? null} openEdit={openEdit} handleCloseEdit={handleCloseEdit} setOpenEdit={setOpenEdit} />
    </div>
  )
}
