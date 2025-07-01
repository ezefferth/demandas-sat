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

  const [selectedAssunto, setSelectedAssunto] = useState<Assunto>();

  const { assuntos } = useContext(DataContext);

  const handleSeletedRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    assunto: Assunto
  ): void => {
    e.preventDefault();
    setSelectedAssunto(assunto);
    handleOpenRemove();
  };

  const handleSeletedEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    assunto: Assunto
  ): void => {
    e.preventDefault();
    setSelectedAssunto(assunto);
    handleOpenEdit();
  };

  const [btnAti, setBtnAti] = useState<boolean>(false);
  const [btnUi, setBtnUi] = useState<boolean>(true);
  const [btnDev, setBtnDev] = useState<boolean>(false);

  const handleBtnAti = () => {
    setBtnAti(true);
    setBtnUi(false);
    setBtnDev(false);
  };
  const handleBtnUi = () => {
    setBtnAti(false);
    setBtnUi(true);
    setBtnDev(false);
  };
  const handleBtnDev = () => {
    setBtnAti(false);
    setBtnUi(false);
    setBtnDev(true);
  };

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
      <div className="flex justify-center mt-16 gap-4 text-slate-50">
        <button
          className={`px-4 py-1 rounded-md ${
            !btnAti ? "bg-slate-500" : "bg-slate-600"
          } hover:bg-slate-500 transition-all font-`}
          onClick={handleBtnAti}
        >
          Assessoria de TI
        </button>
        {/* fb203925-c3d9-472c-93e6-3d5c5b110001 */}
        <button
          className={`px-4 py-1 rounded-md ${
            !btnUi ? "bg-slate-500" : "bg-slate-600"
          } hover:bg-slate-500 transition-all`}
          onClick={handleBtnUi}
        >
          Unidade de Informática
        </button>
        <button
          className={`px-4 py-1 rounded-md ${
            !btnDev ? "bg-slate-500" : "bg-slate-600"
          } hover:bg-slate-500 transition-all`}
          onClick={handleBtnDev}
        >
          Unidade de Desenvolvimento
        </button>
      </div>
      <div className="mt-8 p-8 text-slate-900 w-[46rem] mx-auto">
        <div className="flex justify-between font-semibold">
          <p>Nome</p>
          <p>Ações</p>
        </div>

        {btnAti && (
          <div className="mt-3">
            {assuntos?.map((assunto: Assunto) => {
              if (assunto.setorId === "fdc0248f-ade9-4325-917f-ace517196efb") {
                return (
                  <div key={assunto.id}>
                    <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                      <p className="text-slate-900">{assunto.nome}</p>
                      <div className="flex gap-1">
                        <button onClick={(e) => handleSeletedEdit(e, assunto)}>
                          <TiEdit
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <button
                          onClick={(e) => handleSeletedRemove(e, assunto)}
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
        )}
        {btnUi && (
          <div className="mt-3">
            {assuntos?.map((assunto: Assunto) => {
              if (assunto.setorId === "66a38650-99d9-4dff-bebd-2281dc29f142") {
                return (
                  <div key={assunto.id}>
                    <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                      <p className="text-slate-900">{assunto.nome}</p>
                      <div className="flex gap-1">
                        <button onClick={(e) => handleSeletedEdit(e, assunto)}>
                          <TiEdit
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <button
                          onClick={(e) => handleSeletedRemove(e, assunto)}
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
        )}
        {btnDev && (
          <div className="mt-3">
            {assuntos?.map((assunto: Assunto) => {
              if (assunto.setorId === "fb203925-c3d9-472c-93e6-3d5c5b110001") {
                return (
                  <div key={assunto.id}>
                    <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                      <p className="text-slate-900">{assunto.nome}</p>
                      <div className="flex gap-1">
                        <button onClick={(e) => handleSeletedEdit(e, assunto)}>
                          <TiEdit
                            size={25}
                            className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                          />
                        </button>
                        <button
                          onClick={(e) => handleSeletedRemove(e, assunto)}
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
        )}

        {/* <div className="mt-3">
          {assuntos?.map((assunto: Assunto) => {
            return (
              <div key={assunto.id}>
                <div className="flex justify-between items-center hover:font-bold hover:pl-2 transition-all">
                  <p className="text-slate-900">{assunto.nome}</p>
                  <div className="flex gap-1">
                    <button onClick={(e) => handleSeletedEdit(e, assunto)}>
                      <TiEdit
                        size={25}
                        className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600"
                      />
                    </button>
                    <button onClick={(e) => handleSeletedRemove(e, assunto)}>
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
          })}
        </div> */}
      </div>
      <ModalRemoverAssunto
        assunto={selectedAssunto ?? null}
        openRemove={openRemove}
        handleCloseRemove={handleCloseRemove}
        setOpenRemove={setOpenRemove}
      />
      <ModalAddAssunto
        openAdd={openAdd}
        handleClose={handleClose}
        setOpenAdd={setOpenAdd}
      />
      <ModalEditarAssunto
        assunto={selectedAssunto ?? null}
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        setOpenEdit={setOpenEdit}
      />
    </div>
  );
}
