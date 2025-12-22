import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { LerComentariosSolicitacaoMaterial } from "../../../components/data/fetch/comentarioSolicitacao/lerComentarios";
import { CriarComentarioSolicitacaoMaterial } from "../../../components/data/fetch/comentarioSolicitacao/criarComentario";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // /border: '1px solid #000',
  boxShadow: 15,
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void;
  handleClose: (value: boolean) => void;
  solicitacaoId: number;
  usuarioId: string;
};

export default function ModalAddComentarioSolicitacaoMaterial({
  openAdd,
  handleClose,
  setOpenAdd,
  solicitacaoId,
  usuarioId,
}: Props) {
  const [comentario, setComentario] = useState<string>("");

  const { setComentariosSolicitacaoMaterial } = useContext(DataContext);

  const handleOnAdd = async () => {
    await LerComentariosSolicitacaoMaterial({ solicitacaoId, setComentariosSolicitacaoMaterial });
  };


  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        await LerComentariosSolicitacaoMaterial({ solicitacaoId, setComentariosSolicitacaoMaterial });
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      }
    };

    fetchComentarios();
  }, [solicitacaoId, setComentariosSolicitacaoMaterial]);


  const handleAdd = async () => {
    if (comentario.length < 2) {
      toast.info("Favor digitar o comentário corretamente!");
      return;
    }
    
    const promise = CriarComentarioSolicitacaoMaterial({
      comentario,
      usuarioId,
      solicitacaoId,
    });

    toast.promise(promise, {
      pending: "Enviando comentário...",
      success: "Comentário adicionado com sucesso!",
      error: "Erro ao adicionar comentário.",
    });

    try {
      await promise;

      setOpenAdd(false);
      setComentario("");

      setTimeout(() => handleOnAdd(), 100);
    } catch (e: any) {
      console.error(e?.response?.request?.status);
      setComentario("");
      setOpenAdd(false);
    }
  };



  return (
    <div>
      <Modal
        open={openAdd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-center">Inserir Comentário</h2>
          <div className="mt-5 mb-4">
            <TextField
              id="standard-basic"
              multiline
              rows={4}
              label="Comentário"
              placeholder="Comentário..."
              variant="standard"
              onChange={(e) => setComentario(e.target.value)}
              sx={{ width: "100%" }}
            />
          </div>


          <div className="flex justify-center gap-4 mt-4">
            <button
              className="border rounded-lg bg-red-200 px-3 py-1 hover:bg-red-300 transition-all"
              onClick={() => setOpenAdd(false)}
            >
              Cancelar
            </button>
            <button
              className="border rounded-lg bg-slate-300 px-3 py-1 hover:bg-slate-400 transition-all"
              onClick={handleAdd}
            >
              Inserir
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
