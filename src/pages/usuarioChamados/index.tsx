

// import React from 'react'

import { useContext, useState } from "react";
import { FaPlusSquare, FaSearch } from "react-icons/fa";
// import ModalAddCategoria from "./modalAdd";
import { DataContext } from "../../components/data/context/dataContext";
import { Chamado } from "../../components/types";
import ModalAddChamado from "./modalAdd";
import { useNavigate } from "react-router-dom";
// import ModalRemoverCategoria from "./modalDel";
// import ModalEditarCategoria from "./modalEdit";

export default function Chamados() {

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);


  const { chamadosUser, assuntos } = useContext(DataContext)

  const navigate = useNavigate()

  const handleSeletedVisualizar = (e: React.MouseEvent<HTMLButtonElement>, chamado: Chamado): void => {
    e.preventDefault();

    navigate(`/verChamado/`, { state: chamado });
  };

  

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Meus Chamados</p>
        </div>
        <button onClick={handleOpen}>
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
        </button>
      </div>

      <div className="mt-8 p-8 text-slate-900 w-[60rem] mx-auto">
        <table className="table-auto w-full border-collapse border border-slate-300 text-left">
          <thead>
            <tr className="bg-gray-400 text-slate-900 font-semibold">
              <th className="px-2 py-1 border border-slate-300">ID</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Assunto</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[2rem]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {chamadosUser?.map((chamado: Chamado, index: number) => (
              <tr
                key={chamado.id}
                className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300">{chamado.id}</td>
                <td className="px-2 py-1 border border-slate-300 max-w-[16rem]">
                  <p className="truncate ">{chamado.descricao}</p>
                </td>
                <td className="px-2 py-1 border border-slate-300 max-w-[10rem]">
                  <p className="truncate">
                    {assuntos?.find((assunto) => assunto.id === chamado.assuntoId)?.nome}
                  </p>
                </td>
                <td className="px-2 py-1 border border-slate-300">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={(e) => handleSeletedVisualizar(e, chamado)}>
                      <FaSearch
                        size={20}
                        className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* <div className="mt-8 p-8 text-slate-900 w-[45rem] mx-auto">
        <div className="flex justify-between font-semibold">
          <p>ID</p>
          <p>Descrição</p>
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
  {/* <ModalRemoverCategoria categoria={selectedCategoria ?? null} openRemove={openRemove} handleCloseRemove={handleCloseRemove} setOpenRemove={setOpenRemove} /> */ }
  <ModalAddChamado openAdd={openAdd} handleClose={handleClose} setOpenAdd={setOpenAdd} />
  {/* <ModalEditarCategoria categoria={selectedCategoria ?? null} openEdit={openEdit} handleCloseEdit={handleCloseEdit} setOpenEdit={setOpenEdit} /> */ }
    </div >
  )
}
