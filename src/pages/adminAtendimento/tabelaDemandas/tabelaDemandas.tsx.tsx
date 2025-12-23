import { FaExclamationTriangle, FaSearch } from "react-icons/fa";

import { Tooltip } from "@mui/material";
import { TabelaGenerica } from "./tabelaGenerica";
import { Assunto, Demanda, Prioridade, Setor, Status } from "../../../components/types";
import { CalculaDuracaoEAtrasoDemanda } from "../../../utils/calculaDuracaoAtraso";


type Props = {
  titulo: string
  demandas: Demanda[]
  setores?: Setor[]
  assuntos?: Assunto[]
  prioridades?: Prioridade[]
  status?: Status[]
  paginacao?: React.ReactNode;
  onVisualizar: (
    e: React.MouseEvent<HTMLButtonElement>,
    demanda: Demanda
  ) => void;
};

export function TabelaDemanda({
  titulo,
  demandas,
  setores,
  assuntos,
  status,
  prioridades,
  paginacao,
  onVisualizar,
}: Props) {




  return (
    <TabelaGenerica
      titulo={titulo}
      colunas={[
        { label: "ID" },
        { label: "Data" },
        { label: "Descrição" },
        { label: "Setor" },
        { label: "Assunto" },

        ...(titulo !== "Aguardando Triagem"
          ? [
            { label: "Status" },
            { label: "Prioridade" },
          ]
          : []),

        { label: "Ações", className: "text-center w-[2rem]" },
      ]}
      dados={demandas}
      paginacao={paginacao}
      renderLinha={(demanda, index) => {
        const { atraso, duration } = CalculaDuracaoEAtrasoDemanda(demanda);

        const assunto = assuntos?.find(a => a.id === demanda.assuntoId);
        const statusAtual = status?.find(s => s.id === demanda.statusId);

        const estaAtrasado =
          assunto?.tempoLimite &&
          atraso > 0 &&
          atraso > assunto.tempoLimite;

        return (
          <tr
            key={demanda.id}
            className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"} hover:bg-gray-100`}
          >
            {/* ID */}
            <td className="px-2 py-1 border">{demanda.id}</td>

            {/* Data */}
            <td className="px-2 py-1 border">
              {demanda.createdAt
                ? new Date(demanda.createdAt).toLocaleDateString()
                : ""}
            </td>

            {/* Descrição */}
            <td className="px-2 py-1 border max-w-[16rem] truncate">
              <Tooltip title={demanda.descricao}>
                <span>{demanda.descricao}</span>
              </Tooltip>
            </td>

            {/* Setor */}
            <td className="px-2 py-1 border">
              {setores?.find(s => s.id === demanda.setorId)?.nome}
            </td>

            {/* Assunto */}
            <td className="px-2 py-1 border">
              {assuntos?.find(a => a.id === demanda.assuntoId)?.nome}
            </td>
            {
              titulo !== "Aguardando Triagem" && (
                <>
                  <td className="px-2 py-1 border border-slate-300 w-[12rem]">
                    <p
                      className="rounded-md flex items-center gap-1 justify-center w-full max-w-[12rem] px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        backgroundColor: statusAtual?.cor || "transparent",
                      }}
                    >
                      {estaAtrasado && (
                        <Tooltip title={`Atrasado em ${duration}`}>
                          <span>
                            <FaExclamationTriangle
                              className="text-slate-800"
                              size={16}
                              style={{ verticalAlign: "middle" }}
                            />
                          </span>
                        </Tooltip>
                      )}

                      {statusAtual?.nome}
                    </p>
                  </td>

                  {/* Prioridade */}
                  <td className="px-2 py-1 border w-[12rem]">
                    <span
                      className="rounded-md flex items-center gap-1 justify-center w-full max-w-[12rem] px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        backgroundColor:
                          prioridades?.find(p => p.id === demanda.prioridadeId)?.cor,
                      }}
                    >
                      {prioridades?.find(p => p.id === demanda.prioridadeId)?.nome}
                    </span>
                  </td>

                </>
              )
            }
            {/* Status */}


            {/* Ações */}
            <td className="px-2 py-1 border text-center">
              <button onClick={(e) => onVisualizar(e, demanda)}>
                <FaSearch size={18} />
              </button>
            </td>
          </tr>
        );
      }}
    />
  );
}
