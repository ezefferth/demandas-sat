import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { TiEdit, TiTrash } from "react-icons/ti";
import { DataContext } from "../../components/data/context/dataContext";
import { Material } from "../../components/types";
import ModalAddMaterial from "./modalAdd";
import ModalEditarMaterial from "./modalEdit";
import ModalRemoverMaterial from "./modalDel";
import { Tooltip } from "@mui/material";

export default function MateriaisPage() {
  const { materiais } = useContext(DataContext);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [selected, setSelected] = useState<Material>();

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <p className="text-lg">Materiais</p>
        <button onClick={() => setOpenAdd(true)}>
          <FaPlusSquare className="h-6 w-6 text-slate-600 hover:text-slate-800" />
        </button>
      </div>

      <div className="mt-8 p-8 w-[45rem] mx-auto">
        <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
          <thead>
            <tr className="text-slate-900 font-semibold bg-gray-400">
              <th className="px-2 py-1 border border-slate-300">Nome</th>
              <th className="px-2 py-1 border border-slate-300">Tipo</th>
              <th className="px-2 py-1 border border-slate-300 text-center">Qtd</th>
              <th className="px-2 py-1 border border-slate-300 text-center">
                Qtd Betha
              </th>
              <th className="px-2 py-1 border border-slate-300 text-center w-[5rem]">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {materiais?.map((m, index) => (
              <tr
                key={m.id}
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                  } hover:bg-gray-100 transition-all`}
              >
                <td className="px-2 py-1 border border-slate-300 max-w-[14rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  <Tooltip title={m.nome} placement="bottom-start">
                    <span className="cursor-default">
                      {m.nome}
                    </span>
                  </Tooltip>
                </td>

                <td className="px-2 py-1 border border-slate-300">
                  {m.tipo}
                </td>

                <td className="px-2 py-1 border border-slate-300 text-center">
                  {m.qtd}
                </td>

                <td className="px-2 py-1 border border-slate-300 text-center">
                  {m.qtdBetha}
                </td>

                <td className="px-2 py-1 border border-slate-300">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelected(m);
                        setOpenEdit(true);
                      }}
                    >
                      <TiEdit size={20} />
                    </button>

                    <button
                      onClick={() => {
                        setSelected(m);
                        setOpenRemove(true);
                      }}
                    >
                      <TiTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalAddMaterial openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <ModalEditarMaterial material={selected ?? null} openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <ModalRemoverMaterial material={selected ?? null} openRemove={openRemove} setOpenRemove={setOpenRemove} />
    </div>
  );
}
