import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { DataContext } from "../../../components/data/context/dataContext";
import { LerDocumento } from "../../../components/data/fetch/documentos/lerDocumentos";
import { CriarDocumento } from "../../../components/data/fetch/documentos/criarDocumento";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 2,
};

type Props = {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void;
  handleClose: (value: boolean) => void;
  chamadoId: number; // Mudei para number, pois é um ID
  comentarioId?: string; // Opcional
};

export default function ModalAddAnexo({
  openAdd,
  handleClose,
  setOpenAdd,
  chamadoId,
}: // comentarioId, // Se for usar, descomente aqui e no handleAdd
  Props) {
  const [nome, setNome] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [conteudo, setConteudo] = useState<string>(""); // Inicialize com string vazia

  const { setDocumentos } = useContext(DataContext);

  const handleOnAdd = async () => {
    // Recarregar documentos após adição
    await LerDocumento({ chamadoId, setDocumentos });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setConteudo(""); // Limpa o conteúdo se nenhum arquivo for selecionado
      setNome("");
      setMimeType("");
      return;
    }

    setNome(file.name);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => {
      // FileReader.result já é uma string data URL (e.g., data:image/png;base64,...)
      const base64String = reader.result as string;
      setConteudo(base64String);
      console.log("Arquivo carregado. Tamanho Base64:", base64String.length);
    };
    reader.onerror = (error) => {
      console.error("Erro ao ler o arquivo:", error);
      window.alert("Erro ao ler o arquivo. Tente novamente.");
      setConteudo("");
      setNome("");
      setMimeType("");
    };
    reader.readAsDataURL(file); // Lê o arquivo como Data URL (Base64)
  };
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    if (loading) return;

    setLoading(true);

    if (!conteudo) {
      window.alert("Por favor, selecione um anexo para inserir.");
      return;
    }

    if (!nome || !mimeType) {
      window.alert("Informações do arquivo (nome ou tipo) estão faltando.");
      return;
    }

    const promise: Promise<AxiosResponse> = CriarDocumento({
      nome,
      mimeType,
      conteudo,
      chamadoId,
      // comentarioId, // Descomente se for usar
    });

    toast.promise(promise, {
      pending: "Enviando anexo...",
      success: "Anexo criado com sucesso!",
      error: "Erro ao criar anexo!",
    });

    try {
      await promise
      setOpenAdd(false);
      // Um pequeno delay para garantir que o modal feche antes de recarregar
      // ou para dar tempo do backend processar completamente.
      // Pode ser ajustado ou removido se não for necessário.
      setTimeout(() => handleOnAdd(), 100);

      // Limpar os estados após o sucesso
      setNome("");
      setMimeType("");
      setConteudo("");

    } catch (e: any) {
      console.error("Erro ao adicionar documento:", e);
      setOpenAdd(false); // Fechar modal mesmo em caso de erro, ou manter aberto para correção
      // Manter os campos para que o usuário possa corrigir
    } finally {
      setLoading(false);
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
          <h2 className="text-center">Inserir Documento</h2>

          <div className="mt-5 mb-4 flex justify-center">
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
                .ods,
                .zip,
                .rar
              " // Aceita imagens e PDFs
              onChange={handleFileChange}
            />
          </div>

          {nome && (
            <div className="flex justify-center text-sm text-gray-600">
              Arquivo selecionado:{" "}
              <span className="font-semibold ml-1">{nome}</span>
            </div>
          )}

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
