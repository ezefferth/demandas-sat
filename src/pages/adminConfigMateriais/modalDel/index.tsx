import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { Material } from "../../../components/types";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { LerMateriais } from "../../../components/data/fetch/materiais/lerMateriais";
import { RemoverMaterial } from "../../../components/data/fetch/materiais/removerMaterial";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 2,
  width: 420,
};

type Props = {
  material: Material | null;
  openRemove: boolean;
  setOpenRemove: (value: boolean) => void;
};

export default function ModalRemoverMaterial({ material, openRemove, setOpenRemove }: Props) {
  const { setMateriais } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const handleOnRemove = async () => {
    await LerMateriais({ setMateriais });
  };

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);

    if (!material?.id) {
      setLoading(false);
      return;
    }

    const promise: Promise<AxiosResponse> = RemoverMaterial({ id: material.id });

    toast.promise(promise, {
      pending: "Removendo material...",
      success: "Material removido com sucesso!",
      error: "Erro ao remover material!",
    });

    try {
      await promise;
      setOpenRemove(false);
      await handleOnRemove();
    } catch (e: any) {
      console.error(e.response?.request?.status);
      setOpenRemove(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={openRemove} onClose={() => setOpenRemove(false)}>
      <Box sx={style}>
        <h2 className="text-center">Remover Material</h2>

        <p className="mt-4">
          Tem certeza que deseja remover o material <b>"{material?.nome}"</b>?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all"
            onClick={() => setOpenRemove(false)}
          >
            Cancelar
          </button>
          <button
            className="border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all"
            onClick={handleRemove}
          >
            Remover
          </button>
        </div>
      </Box>
    </Modal>
  );
}
