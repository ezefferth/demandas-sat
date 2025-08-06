import React from "react";
// ajuste o caminho se necessário
import { FiFileText } from "react-icons/fi";
import { FaFileImage, FaFilePdf } from "react-icons/fa";
import { Chamado, Documento } from "../../components/types";
import { FaFileCsv, FaFileExcel, FaFileWord, FaFileZipper, FaTrash } from "react-icons/fa6";
import { RemoverDocumento } from "../../components/data/fetch/documentos/removerDocumento";
import { LerDocumento } from "../../components/data/fetch/documentos/lerDocumentos";
import { DataContext } from "../../components/data/context/dataContext";

type Props = {
  documentos: Documento[];
  localChamado: Chamado
};

export const ListaDocumentos: React.FC<Props> = ({ documentos, localChamado }) => {
  const { setDocumentos } = React.useContext(DataContext);

  const handleDelete = async (id: string, chamadoId: Number) => {
    try {
      await RemoverDocumento({ id });
      await LerDocumento({ chamadoId, setDocumentos });
    } catch (error) {
      console.error("Erro ao remover documento:", error);
      window.alert("Erro ao remover documento. Tente novamente mais tarde.");
      // Aqui você pode adicionar um toast ou mensagem de erro para o usuário
    }
  };

  return (
    <div className="space-y-2">
      {documentos.map((doc) => {
        if (doc.comentarioId === null) {
          // Converte o buffer retornado do backend
          //@ts-ignore
          const uint8Array = new Uint8Array(doc.conteudo.data);
          const blob = new Blob([uint8Array], { type: doc.mimeType });
          const url = URL.createObjectURL(blob);

          // Handler de clique
          const handleClick = () => {
            if (doc.mimeType === "application/pdf") {
              // PDF: abrir em nova aba
              window.open(url, "_blank");
            } else if (doc.mimeType.startsWith("image/")) {
              // Imagem: forçar download
              const link = document.createElement("a");
              link.href = url;
              link.download = doc.nome;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              // Outros tipos: download por padrão
              const link = document.createElement("a");
              link.href = url;
              link.download = doc.nome;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          };

          return (
            <div
              key={doc.id}
              className="flex items-center justify-between px-3 py-2 border rounded hover:bg-slate-50 transition w-full"
            >
              {/* Botão de clique (ícone + nome) */}
              <button
                onClick={handleClick}
                className="flex items-center gap-2 flex-1 text-left"
              >
                {doc.mimeType.startsWith("image/") && (
                  <FaFileImage
                    size={20}
                    className="text-slate-600"
                  />
                )}

                {doc.mimeType === "application/pdf" && (
                  <FaFilePdf
                    size={20}
                    className="text-slate-600"
                  />
                )}

                {(doc.mimeType ===
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
                  doc.mimeType === "application/vnd.ms-excel" || // .xls
                  doc.mimeType ===
                  "application/vnd.oasis.opendocument.spreadsheet") && ( // .ods
                    <FaFileExcel
                      size={20}
                      className="text-slate-600"
                    />
                  )}

                {(doc.mimeType ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
                  doc.mimeType === "application/msword" || // .doc
                  doc.mimeType ===
                  "application/vnd.oasis.opendocument.text") && ( // .odt
                    <FaFileWord
                      size={20}
                      className="text-slate-600"
                    />
                  )}

                {doc.mimeType === "text/csv" && (
                  <FaFileCsv
                    size={20}
                    className="text-slate-600"
                  />
                )}
                {doc.mimeType === "application/zip" || doc.mimeType === "application/rar" &&(
                  <FaFileZipper
                    size={20}
                    className="text-slate-600"
                  />
                )}{/* falta ajustar */}

                {/* Fallback */}
                {!doc.mimeType.startsWith("image/") &&
                  doc.mimeType !== "application/pdf" &&
                  doc.mimeType !==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                  doc.mimeType !== "application/vnd.ms-excel" &&
                  doc.mimeType !==
                  "application/vnd.oasis.opendocument.spreadsheet" &&
                  doc.mimeType !==
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                  doc.mimeType !== "application/msword" &&
                  doc.mimeType !== "application/vnd.oasis.opendocument.text" &&
                  doc.mimeType !== "text/csv" && (
                    <FiFileText
                      size={20}
                      className="text-slate-600"
                    />
                  )}
                <span className="truncate w-0 flex-1 min-w-0">{doc.nome}</span>
              </button>

              {/* Botão de exclusão */}
              {
                !localChamado.finishedAt && (
                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Deseja realmente excluir este documento?"
                      );
                      if (confirmed) {
                        handleDelete(doc.id, doc.chamadoId);
                      }
                    }}
                    className="ml-2 p-1 hover:text-red-600 transition"
                    title="Excluir documento"
                  >
                    <FaTrash />
                  </button>
                )
              }

            </div>
          );
        }
      })}
    </div>
  );
};

type Props2 = {
  documentos: Documento[];
  id: string;
};

export const ListaDocumentosComentarios: React.FC<Props2> = ({
  documentos,
  id,
}) => {
  const { setDocumentos } = React.useContext(DataContext);

  const handleDelete = async (id: string, chamadoId: Number) => {
    try {
      await RemoverDocumento({ id });
      await LerDocumento({ chamadoId, setDocumentos });
    } catch (error) {
      console.error("Erro ao remover documento:", error);
      window.alert("Erro ao remover documento. Tente novamente mais tarde.");
      // Aqui você pode adicionar um toast ou mensagem de erro para o usuário
    }
  };

  return (
    <div className="space-y-2">
      {documentos.map((doc) => {
        if (doc.comentarioId == id) {
          // Converte o buffer retornado do backend
          //@ts-ignore
          const uint8Array = new Uint8Array(doc.conteudo.data);
          const blob = new Blob([uint8Array], { type: doc.mimeType });
          const url = URL.createObjectURL(blob);

          // Handler de clique
          const handleClick = () => {
            if (doc.mimeType === "application/pdf") {
              // PDF: abrir em nova aba
              window.open(url, "_blank");
            } else if (doc.mimeType.startsWith("image/")) {
              // Imagem: forçar download
              const link = document.createElement("a");
              link.href = url;
              link.download = doc.nome;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              // Outros tipos: download por padrão
              const link = document.createElement("a");
              link.href = url;
              link.download = doc.nome;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          };

          return (
            <div
              key={doc.id}
              className="flex items-center justify-between py-2  hover:bg-slate-50 transition w-full"
            >
              {/* Botão de clique (ícone + nome) */}
              <button
                onClick={handleClick}
                className="flex items-center gap-2 flex-1 text-left"
              >
                {doc.mimeType.startsWith("image/") && (
                  <FaFileImage
                    size={20}
                    className="text-slate-600"
                  />
                )}

                {doc.mimeType === "application/pdf" && (
                  <FaFilePdf
                    size={20}
                    className="text-slate-600"
                  />
                )}

                {(doc.mimeType ===
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
                  doc.mimeType === "application/vnd.ms-excel" || // .xls
                  doc.mimeType ===
                  "application/vnd.oasis.opendocument.spreadsheet") && ( // .ods
                    <FaFileExcel
                      size={20}
                      className="text-slate-600"
                    />
                  )}

                {(doc.mimeType ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
                  doc.mimeType === "application/msword" || // .doc
                  doc.mimeType ===
                  "application/vnd.oasis.opendocument.text") && ( // .odt
                    <FaFileWord
                      size={20}
                      className="text-slate-600"
                    />
                  )}

                {doc.mimeType === "text/csv" && (
                  <FaFileCsv
                    size={20}
                    className="text-slate-600"
                  />
                )}

                {/* Fallback */}
                {!doc.mimeType.startsWith("image/") &&
                  doc.mimeType !== "application/pdf" &&
                  doc.mimeType !==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                  doc.mimeType !== "application/vnd.ms-excel" &&
                  doc.mimeType !==
                  "application/vnd.oasis.opendocument.spreadsheet" &&
                  doc.mimeType !==
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
                  doc.mimeType !== "application/msword" &&
                  doc.mimeType !== "application/vnd.oasis.opendocument.text" &&
                  doc.mimeType !== "text/csv" && (
                    <FiFileText
                      size={20}
                      className="text-slate-600"
                    />
                  )}
                <span className="truncate w-0 flex-1 min-w-0 text-xs">
                  {doc.nome}
                </span>
              </button>

              {/* Botão de exclusão */}
              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    "Deseja realmente excluir este documento?"
                  );
                  if (confirmed) {
                    handleDelete(doc.id, doc.chamadoId);
                  }
                }}
                className="ml-2 p-1 hover:text-red-600 transition"
                title="Excluir documento"
              >
                <FaTrash />
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};
