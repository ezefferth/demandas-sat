import { FaSearch } from "react-icons/fa";
import { ItemSolicitacaoMaterial } from "../../../components/types";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../../components/data/context/dataContext";

export const TabelaSolicitacaoMaterial = ({
  titulo,
  dados,
  mostrarPrioridade = false,
}: {
  titulo: string;
  dados: any[];
  mostrarPrioridade?: boolean;

}) => {
  const navigate = useNavigate();

  const {setores, prioridades, status} = useContext(DataContext)

  return (
    <div className="mt-8 text-slate-900 mx-auto">
      <div className="mb-2">
        <span className="border-b-2 px-4 border-gray-400">
          {titulo}
        </span>
      </div>

      <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
        <thead>
          <tr className="text-slate-900 font-semibold bg-gray-400">
            <th className="px-2 py-1 border">ID</th>
            <th className="px-2 py-1 border">Descrição</th>
            <th className="px-2 py-1 border">Itens</th>
            <th className="px-2 py-1 border">Setor</th>
            <th className="px-2 py-1 border">Status</th>

            {mostrarPrioridade && (
              <th className="px-2 py-1 border">Prioridade</th>
            )}

            <th className="px-2 py-1 border text-center w-[2rem]">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {dados?.map((solicitacao, index) => (
            <tr
              key={solicitacao.id}
              className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
                } hover:bg-gray-100 transition-all`}
            >
              <td className="px-2 py-1 border">{solicitacao.id}</td>

              <td className="px-2 py-1 border max-w-[16rem]">
                <Tooltip
                  title={solicitacao.descricao || "Sem descrição"}
                  placement="top"
                  arrow
                >
                  <span className="block truncate cursor-help">
                    {solicitacao.descricao || "—"}
                  </span>
                </Tooltip>
              </td>

              <td className="px-2 py-1 border align-top">
                <table className="w-full text-sm border border-slate-400">
                  <thead>
                    <tr className="bg-slate-300">
                      <th className="border px-1 py-0.5">Material</th>
                      <th className="border px-1 py-0.5 text-center">Und</th>
                      <th className="border px-1 py-0.5 text-center">
                        Qtd Solicitada
                      </th>
                      <th className="border px-1 py-0.5 text-center">
                        Qtd Aprovada
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitacao.itens?.map((item: ItemSolicitacaoMaterial) => (
                      <tr key={item.id} className="bg-gray-100">
                        <td className="border px-1 py-0.5">
                          {item.material?.nome}
                        </td>
                        <td className="border px-1 py-0.5 text-center">
                          {item.material?.unidade}
                        </td>
                        <td className="border px-1 py-0.5 text-center">
                          {item.qtdSolicitada}
                        </td>
                        <td className="border px-1 py-0.5 text-center">
                          {item.qtdAprovada ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>

              <td className="px-2 py-1 border">
                {setores?.find(
                  (setor) => setor.id === solicitacao.setorId
                )?.nome}
              </td>

              <td className="px-2 py-1 border w-[12rem]">
                <div className="flex justify-center items-center h-full">
                  {solicitacao.statusDemandaId ? (
                    status
                      ?.filter((st) => st.id === solicitacao.statusDemandaId)
                      .map((st) => (
                        <span
                          key={st.id}
                          className="rounded-lg px-2 py-0.5 text-slate-950 text-center w-full overflow-hidden text-ellipsis whitespace-nowrap"
                          style={{ backgroundColor: st.cor }}
                        >
                          {st.nome}
                        </span>
                      ))
                  ) : (
                    <span className="bg-gray-400 py-0.5 text-center w-full rounded-md px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      Aguardando triagem
                    </span>
                  )}
                </div>
              </td>

              {mostrarPrioridade && (
                <td className="px-2 py-1 border w-[10rem]">
                  <p
                    className="text-center w-full rounded-lg px-2 overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{
                      backgroundColor:
                        prioridades?.find(
                          (p) => p.id === solicitacao.prioridadeDemandaId
                        )?.cor || "transparent",
                    }}
                  >
                    {
                      prioridades?.find(
                        (p) => p.id === solicitacao.prioridadeDemandaId
                      )?.nome ?? "—"
                    }
                  </p>
                </td>
              )}

              <td className="px-2 py-1 border">
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      navigate("/verSolicitacaoMaterialAdmin", {
                        state: solicitacao,
                      })
                    }
                  >
                    <FaSearch
                      size={18}
                      className="text-slate-800 hover:text-slate-700"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
