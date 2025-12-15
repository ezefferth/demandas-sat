// import React from 'react'

import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { DataContext } from "../../components/data/context/dataContext";
import { Usuario } from "../../components/types";
import { TiEdit, TiTrash } from "react-icons/ti";
import ModalAddUsuario from "./modalAdd";
import ModalRemoverUsuario from "./modalDel";
import ModalEditarUsuario from "./modalEdit";

export default function Usuarios() {
  const [btnIna, setBtnIna] = useState<boolean>(false);
  const [btnAdm, setBtnAdm] = useState<boolean>(false);
  const [btn, setBtn] = useState<boolean>(true);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openRemove, setOpenRemove] = useState(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [selectedUsuario, setSelectedUsuario] = useState<Usuario>();

  const { usuarios } = useContext(DataContext);

  const handleBtnIna = () => {
    setBtnIna(true);
    setBtnAdm(false);
    setBtn(false);
  };
  const handleBtnAdm = () => {
    setBtnIna(false);
    setBtnAdm(true);
    setBtn(false);
  };
  const handleBtn = () => {
    setBtnIna(false);
    setBtnAdm(false);
    setBtn(true);
  };

  const handleSeletedCategoriaRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    usuario: Usuario
  ): void => {
    e.preventDefault();
    setSelectedUsuario(usuario);
    handleOpenRemove();
  };

  const handleSeletedCategoriaEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    usuario: Usuario
  ): void => {
    e.preventDefault();
    setSelectedUsuario(usuario);
    handleOpenEdit();
  };

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Usuários</p>
        </div>
        <button onClick={handleOpen}>
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
        </button>
      </div>
      <div className="flex justify-center mt-16 gap-4 text-slate-50">
        <button
          className={`px-4 py-1 rounded-md ${
            !btn ? "bg-slate-500" : "bg-slate-600"
          } hover:bg-slate-500 transition-all font-`}
          onClick={handleBtn}
        >
          Usuários
        </button>
        <button
          className={`px-4 py-1 rounded-md ${
            !btnAdm ? "bg-slate-500" : "bg-slate-600"
          } hover:bg-slate-500 transition-all`}
          onClick={handleBtnAdm}
        >
          Administradores
        </button>
        <button
          className={`px-4 py-1 rounded-md ${
            !btnIna ? "bg-slate-500" : "bg-slate-600"
          } hover:bg-slate-500 transition-all`}
          onClick={handleBtnIna}
        >
          Inativos
        </button>
      </div>

      {btn && (
        <>
          <div className="p-8 text-slate-900 w-[36rem] mx-auto">
            <div className="flex justify-between font-semibold">
              <p>Nome</p>
              <p>Ações</p>
            </div>

            <div className="mt-3">
              {usuarios?.map((usuario: Usuario) => {
                if (!usuario.admin && usuario.status) {
                  return (
                    <div key={usuario.id}>
                      <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                        <p className="text-slate-900">{usuario.nome}</p>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) =>
                              handleSeletedCategoriaEdit(e, usuario)
                            }
                          >
                            <TiEdit
                              size={25}
                              className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                            />
                          </button>
                          <button
                            onClick={(e) =>
                              handleSeletedCategoriaRemove(e, usuario)
                            }
                          >
                            <TiTrash
                              size={25}
                              className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                            />
                          </button>
                          <div className="border-b-2 border-slate-300" />
                        </div>
                      </div>
                      <div className="border-b border-slate-300 my-1 w-full" />
                    </div>
                  );
                }
                return null
              })}
            </div>
          </div>
        </>
      )}
      {btnAdm && (
        <div className="p-8 text-slate-900 w-[36rem] mx-auto">
          <div className="flex justify-between font-semibold">
            <p>Nome</p>
            <p>Ações</p>
          </div>

          <div className="mt-3">
            {usuarios?.map((usuario: Usuario) => {
              if (usuario.admin && usuario.status) {
                return (
                  <div key={usuario.id}>
                    <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                      <p className="text-slate-900">{usuario.nome}</p>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) =>
                            handleSeletedCategoriaEdit(e, usuario)
                          }
                        >
                          <TiEdit
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <button
                          onClick={(e) =>
                            handleSeletedCategoriaRemove(e, usuario)
                          }
                        >
                          <TiTrash
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <div className="border-b-2 border-slate-300" />
                      </div>
                    </div>
                    <div className="border-b border-slate-300 my-1 w-full" />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
      {btnIna && (
        <div className="p-8 text-slate-900 w-[36rem] mx-auto">
          <div className="flex justify-between font-semibold">
            <p>Nome</p>
            <p>Ações</p>
          </div>

          <div className="mt-3">
            {usuarios?.map((usuario: Usuario) => {
              if (!usuario.status) {
                return (
                  <div key={usuario.id}>
                    <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                      <p className="text-slate-900">{usuario.nome}</p>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) =>
                            handleSeletedCategoriaEdit(e, usuario)
                          }
                        >
                          <TiEdit
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <button
                          onClick={(e) =>
                            handleSeletedCategoriaRemove(e, usuario)
                          }
                        >
                          <TiTrash
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <div className="border-b-2 border-slate-300" />
                      </div>
                    </div>
                    <div className="border-b border-slate-300 my-1 w-full" />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}

      <ModalRemoverUsuario
        usuario={selectedUsuario ?? null}
        openRemove={openRemove}
        handleCloseRemove={handleCloseRemove}
        setOpenRemove={setOpenRemove}
      />
      <ModalAddUsuario
        openAdd={openAdd}
        handleClose={handleClose}
        setOpenAdd={setOpenAdd}
      />
      <ModalEditarUsuario
        usuario={selectedUsuario ?? null}
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        setOpenEdit={setOpenEdit}
      />
    </div>
  );
}
