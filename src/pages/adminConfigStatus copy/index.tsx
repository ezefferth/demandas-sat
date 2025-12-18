import { useContext, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { TiEdit, TiTrash } from "react-icons/ti";
import { DataContext } from "../../components/data/context/dataContext";
import { Material } from "../../components/types";
import ModalAddMaterial from "./modalAdd";
import ModalEditarMaterial from "./modalEdit";
import ModalRemoverMaterial from "./modalDel";

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
        <div className="flex justify-between font-semibold">
          <p>Nome</p>
          <p>Tipo</p>
          <p>Qtd</p>
          <p>Ações</p>
        </div>

        {materiais?.map((m) => (
          <div key={m.id}>
            <div className="flex justify-between items-center hover:font-bold transition-all">
              <p>{m.nome}</p>
              <p>{m.tipo}</p>
              <p>{m.qtd}</p>
              <div className="flex gap-2">
                <button onClick={() => { setSelected(m); setOpenEdit(true); }}>
                  <TiEdit size={22} />
                </button>
                <button onClick={() => { setSelected(m); setOpenRemove(true); }}>
                  <TiTrash size={22} />
                </button>
              </div>
            </div>
            <div className="border-b my-1" />
          </div>
        ))}
      </div>

      <ModalAddMaterial openAdd={openAdd} setOpenAdd={setOpenAdd} />
      <ModalEditarMaterial material={selected ?? null} openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <ModalRemoverMaterial material={selected ?? null} openRemove={openRemove} setOpenRemove={setOpenRemove} />
    </div>
  );
}
