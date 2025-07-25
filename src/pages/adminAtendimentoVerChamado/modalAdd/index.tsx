import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { TextField } from "@mui/material";
import { CriarComentario } from "../../../components/data/fetch/comentario/criarComentario";
import { LerComentarios } from "../../../components/data/fetch/comentario/lerComentarios";
import { CriarDocumento } from "../../../components/data/fetch/documentos/criarDocumento";
import { LerDocumento } from "../../../components/data/fetch/documentos/lerDocumentos";
import { toast } from "react-toastify";

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
  chamadoId: string;
  usuarioId: string;
};

export default function ModalAddComentario({
  openAdd,
  handleClose,
  setOpenAdd,
  chamadoId,
  usuarioId,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const [comentario, setComentario] = useState<string>("");

  const { setComentarios, setDocumentos } = useContext(DataContext);

  const handleOnAdd = async () => {
    await LerComentarios({ chamadoId, setComentarios });
  };

  const [fileSelecionado, setFileSelecionado] = useState<{
    nome: string;
    mimeType: string;
    conteudoBase64: string;
  } | null>(null);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        await LerComentarios({ chamadoId, setComentarios });
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      }
    };

    fetchComentarios();
  }, [chamadoId, setComentarios]);

  const handleAdd = async () => {
    if (loading) return;
    setLoading(true);

    if (comentario.length <= 2) {
      toast.error("Favor digitar o comentário corretamente!");
      setLoading(false);
      return;
    }

    try {
      // 1) Envia o comentário com feedback automático
      const comentarioResponse = await toast.promise(
        CriarComentario({ comentario, usuarioId, chamadoId }),
        {
          pending: "Enviando comentário...",
          success: "Comentário criado com sucesso!",
          error: "Erro ao criar comentário!",
        }
      );

      const comentarioId = comentarioResponse.data.id;

      // 2) Se houver arquivo selecionado, faz upload
      if (fileSelecionado) {
        await toast.promise(
          CriarDocumento({
            nome: fileSelecionado.nome,
            mimeType: fileSelecionado.mimeType,
            conteudo: fileSelecionado.conteudoBase64,
            chamadoId: Number(chamadoId),
            comentarioId,
          }),
          {
            pending: "Enviando anexo...",
            success: "Anexo enviado com sucesso!",
            error: "Erro ao enviar anexo.",
          }
        );
      }

      // 3) Recarrega documentos
      await LerDocumento({ chamadoId: Number(chamadoId), setDocumentos });

      // 4) Limpa estado
      setOpenAdd(false);
      setComentario("");
      setFileSelecionado(null);
      setTimeout(() => handleOnAdd(), 100);

    } catch (e: any) {
      toast.error("Erro inesperado ao adicionar comentário.");
      console.error(e.response?.request?.status);
      setComentario("");
      setOpenAdd(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileSelecionado(null); // Limpa o arquivo selecionado se nenhum for escolhido
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      // FileReader.result já é uma string data URL (e.g., data:image/png;base64,...)
      const base64String = reader.result as string;
      // setConteudo(base64String);
      console.log("Arquivo carregado. Tamanho Base64:", base64String.length);
      setFileSelecionado({
        nome: file.name,
        mimeType: file.type,
        conteudoBase64: base64String,
      });
    };

    reader.onerror = (error) => {
      console.error("Erro ao ler o arquivo:", error);
      window.alert("Erro ao ler o arquivo. Tente novamente.");
    };
    reader.readAsDataURL(file); // Lê o arquivo como Data URL (Base64)
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
          <div className="mt-6 mb-8 text-center">
            <label className="block text-sm text-gray-600 mb-1">
              Anexar documento (opcional)
            </label>
            <input
              type="file"
              accept="
                image/*,
                application/pdf,
                application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                application/vnd.oasis.opendocument.text,
                application/vnd.ms-excel,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                application/vnd.oasis.opendocument.spreadsheet,
                .doc,
                .docx,
                .odt,
                .xls,
                .xlsx,
                .ods
              " // Aceita imagens e PDFs
              onChange={handleFileChange}
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
