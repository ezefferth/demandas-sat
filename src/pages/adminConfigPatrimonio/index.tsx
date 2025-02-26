

// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { DataContext } from "../../components/data/context/dataContext";
import { Patrimonio, TipoPatrimonio } from "../../components/types";
import { TiEdit, TiTrash } from "react-icons/ti";
// import ModalRemoverSetor from "./modalDel";
// import ModalEditarSetor from "./modalEdit";
import ModalAddPatrimonioTipo from "./modalAddTipo";
import ModalAddPatrimonio from "./modalAdd";
import { Popover } from "@mui/material";
import ModalEditarTipoPatrimonio from "./modalEditTipo";
import ModalRemoverTipoPatrimonio from "./modalDelTipo";
import ModalRemovePatrimonio from "./modalDel";
import ModalEditarPatrimonio from "./modalEdit";

export default function Patrimonios() {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>, tipoPatrimonio: TipoPatrimonio) => {
    setAnchorEl(event.currentTarget)
    setSelectedTipoPatrimonio(tipoPatrimonio)

  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  const [btn, setBtn] = useState<number>(0)

  const [openAddTipo, setOpenAddTipo] = useState(false);
  const handleOpenTipo = () => setOpenAddTipo(true);
  const handleCloseTipo = () => setOpenAddTipo(false);


  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);

  const [openRemove, setOpenRemove] = useState(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);

  const [openRemoveTipo, setOpenRemoveTipo] = useState<boolean>(false);
  const handleOpenRemoveTipo = () => setOpenRemoveTipo(true);
  const handleCloseRemoveTipo = () => setOpenRemoveTipo(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openEditTipo, setOpenEditTipo] = useState<boolean>(false);
  const handleOpenEditTipo = () => setOpenEditTipo(true);
  const handleCloseEditTipo = () => setOpenEditTipo(false);

  const [selectedPatrimonio, setSelectedPatrimonio] = useState<Patrimonio>()
  const [selectedTipoPatrimonio, setSelectedTipoPatrimonio] = useState<TipoPatrimonio | null>()



  const { patrimonios, tipoPatrimonio, setores } = useContext(DataContext)

  const [patrimonioFiltred, setPatrimonioFiltred] = useState<Patrimonio[]>()

  useEffect(() => {
    if (patrimonios && selectedTipoPatrimonio && btn !== 1) {
      const newPatrimonios = patrimonios.filter((patrimonio) => patrimonio.tipoPatrimonioId === selectedTipoPatrimonio.id)
      setPatrimonioFiltred(newPatrimonios)
    }
    else {
      setPatrimonioFiltred(patrimonios)
    }
  }, [btn, patrimonios])

  const handleOnClickEditTipoPatrimonio = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault()
    handleOpenEditTipo()
    handleClosePopover();
  }

  const handleOnClickRemoveTipoPatrimonio = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault()
    handleOpenRemoveTipo()
    handleClosePopover();
  }

  // function teste() {
  //   patrimonios?.map(patrimonio => {
  //     if (patrimonio.tipoPatrimonio === selectedTipoPatrimonio?.id) {
  //       console.log(patrimonio)
  //     }
  //   })
  // }

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

  function handleSelectTipoPatrimonio(e: React.MouseEvent<HTMLButtonElement>, tipoPatrimonio: TipoPatrimonio, btn: number) {
    e.preventDefault()
    setSelectedTipoPatrimonio(tipoPatrimonio)
    setBtn(btn)
  }
  function handleSelectTipoPatrimonioTodos(e: React.MouseEvent<HTMLButtonElement>, btn: number) {
    e.preventDefault()
    setBtn(btn)
    setSelectedTipoPatrimonio(null)
  }

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          {/* <button onClick={() => teste()}>xx</button> */}
          <p>Patrimônios</p>
        </div>
        <button onClick={handleOpen}>
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
        </button>
      </div>
      <div className="flex justify-center mt-16 gap-4 text-slate-50">
        <button
          className={`px-4 py-1 rounded-md ${btn === 1 ? 'bg-slate-500' : 'bg-slate-600'} hover:bg-slate-500 transition-all`}
          onClick={(e) => handleSelectTipoPatrimonioTodos(e, 1)}
        >Todos</button>
        {
          tipoPatrimonio?.map((tipo, index) => {
            return (
              <button
                key={index}
                className={`px-4 py-1 rounded-md ${btn === index + 2 ? 'bg-slate-500' : 'bg-slate-600'} hover:bg-slate-500 transition-all`}
                onClick={(e) => handleSelectTipoPatrimonio(e, tipo, index + 2)}
                onContextMenu={(e) => handleClickPopover(e, tipo)}
              >{tipo.nome}</button>
            )
          })
        }
        <button onClick={handleOpenTipo} className="rounded-md">
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-8 w-8" />
        </button>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300 w-[6rem]">Patrimônio</th>
              <th className="px-2 py-1 border border-slate-300">Descrição</th>
              <th className="px-2 py-1 border border-slate-300">Setor</th>
              <th className="px-2 py-1 border border-slate-300">Status</th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[6rem]">Ações</th>
            </tr>
          </thead>
          <tbody>

            {patrimonioFiltred
              ?.map((patrimonio, index) => (
                <tr
                  key={patrimonio.id}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} hover:bg-gray-100 transition-all`}
                >
                  <td className="py-1 border border-slate-300 text-center">
                    <span>{patrimonio.patrimonio}</span>
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {patrimonio.descricao}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {setores?.find(setor => setor.id === patrimonio.setorId)?.nome}
                  </td>
                  <td className="px-2 py-1 border border-slate-300 max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap">
                    {patrimonio.status}
                  </td>
                  <td className="px-2 py-1 border border-slate-300">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={(e) => handleSeletedEdit(e, patrimonio)}>
                        <TiEdit size={20} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
                      </button>
                      <button onClick={(e) => handleSeletedRemove(e, patrimonio)}>
                        <TiTrash size={20} className="text-slate-800 hover:text-slate-700 transition-all cursor-pointer active:text-slate-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className="py-1 text-xs text-slate-800  w-20">
          <div className="h-6 px-2 mt-1">
            <p className="hover:border-b hover:rounded-md text-center border-slate-800 cursor-pointer px-2 " onClick={(e) => handleOnClickEditTipoPatrimonio(e)}>Editar</p>
          </div>
          <div className="h-6 px-2">
            <p className="hover:border-b hover:rounded-md text-center border-slate-800 cursor-pointer px-2" onClick={(e) => handleOnClickRemoveTipoPatrimonio(e)}>Remover</p>

          </div>
        </div>
      </Popover>

      <ModalRemovePatrimonio patrimonio={selectedPatrimonio ?? null} openRemove={openRemove} handleCloseRemove={handleCloseRemove} setOpenRemove={setOpenRemove} />
      <ModalAddPatrimonio openAdd={openAdd} handleClose={handleClose} setOpenAdd={setOpenAdd} />
      <ModalAddPatrimonioTipo openAdd={openAddTipo} handleClose={handleCloseTipo} setOpenAdd={setOpenAddTipo} />
      <ModalEditarTipoPatrimonio tipoPatrimonio={selectedTipoPatrimonio ?? null} openEdit={openEditTipo} handleCloseEdit={handleCloseEditTipo} setOpenEdit={setOpenEditTipo} />
      <ModalRemoverTipoPatrimonio tipoPatrimonio={selectedTipoPatrimonio ?? null} openRemove={openRemoveTipo} handleCloseRemove={handleCloseRemoveTipo} setOpenRemove={setOpenRemoveTipo} />
      <ModalEditarPatrimonio patrimonio={selectedPatrimonio ?? null} openEdit={openEdit} handleCloseEdit={handleCloseEdit} setOpenEdit={setOpenEdit} />
    </div>
  )
}
