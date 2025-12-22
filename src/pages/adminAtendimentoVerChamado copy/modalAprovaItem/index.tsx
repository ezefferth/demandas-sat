import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { AtualizarMateriaisAprovaItem } from "../../../components/data/fetch/demandasSolicitacaoMateriais/atualizarMateriaisAprovaItem";
import { LerSolicitacaoMateriais } from "../../../components/data/fetch/demandasSolicitacaoMateriais/lerSolicitacaoMaterial";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 15,
  width: "32%",
  p: 2,
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  item: {
    id: string;
    material?: { nome: string; unidade: string };
    qtdSolicitada: number;
    qtdAprovada?: number | null;
  };
};

export default function ModalAprovarItemSolicitacaoMaterial({
  open,
  setOpen,
  item,
}: Props) {
  const { setSolicitacaoMaterial } = useContext(DataContext);

  const [qtdAprovada, setQtdAprovada] = useState<number>(
    item.qtdAprovada ?? item.qtdSolicitada
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setQtdAprovada(
        item.qtdAprovada !== null && item.qtdAprovada !== undefined
          ? item.qtdAprovada
          : item.qtdSolicitada
      );
    }
  }, [open]);
  
  const incrementar = () => {
    setQtdAprovada((prev) =>
      prev < item.qtdSolicitada ? prev + 1 : prev
    );
  };

  const decrementar = () => {
    setQtdAprovada((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSalvar = async () => {
    if (loading) return;

    const aprovado = qtdAprovada > 0;

    setLoading(true);

    const promise: Promise<AxiosResponse> =
      AtualizarMateriaisAprovaItem({
        itemId: item.id,
        aprovado,              // boolean
        qtdAprovada,           // number (sempre)
      });

    toast.promise(promise, {
      pending: "Atualizando item...",
      success: "Item atualizado com sucesso!",
      error: "Erro ao atualizar item!",
    });

    try {
      await promise;
      await LerSolicitacaoMateriais({ setSolicitacaoMaterial });
      setOpen(false);
    } catch (e: any) {
      console.error(e?.response?.request?.status);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <h2 className="text-center font-semibold">
          Aprovar Item
        </h2>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <strong>Material:</strong>{" "}
            {item.material?.nome}
          </p>
          <p>
            <strong>Qtd. solicitada:</strong>{" "}
            {item.qtdSolicitada} {item.material?.unidade}
          </p>
        </div>

        {/* CONTROLE - / + */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-sm font-medium">
            Quantidade aprovada
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={decrementar}
              className="w-8 h-8 rounded-full bg-slate-300 hover:bg-slate-400 transition-all text-lg font-bold"
            >
              −
            </button>

            <span className="min-w-[3rem] text-center text-lg font-semibold">
              {qtdAprovada}
            </span>

            <button
              onClick={incrementar}
              className="w-8 h-8 rounded-full bg-slate-300 hover:bg-slate-400 transition-all text-lg font-bold"
            >
              +
            </button>
          </div>

          <span className="text-xs text-gray-500">
            {qtdAprovada === 0
              ? "Item será reprovado"
              : qtdAprovada === item.qtdSolicitada
              ? "Aprovação total"
              : "Aprovação parcial"}
          </span>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all"
            onClick={handleSalvar}
          >
            Salvar
          </button>
        </div>
      </Box>
    </Modal>
  );
}
