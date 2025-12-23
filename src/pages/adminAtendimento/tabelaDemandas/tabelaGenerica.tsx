type Coluna = {
  label: string;
  className?: string;
};

type Props<T> = {
  titulo?: string;
  colunas: Coluna[];
  dados: T[];
  renderLinha: (item: T, index: number) => React.ReactNode;
  paginacao?: React.ReactNode;
};

export function TabelaGenerica<T>({
  titulo,
  colunas,
  dados,
  renderLinha,
  paginacao,
}: Props<T>) {
  return (
    <div className="mt-4 text-slate-900 mx-auto">
      {titulo && (
        <div className="mb-2">
          <span className="border-b-2 px-4 border-gray-400">
            {titulo}
          </span>
        </div>
      )}

      <table className="table-auto w-full border-collapse border border-slate-300 text-left text-sm">
        <thead>
          <tr className="bg-gray-400 font-semibold">
            {colunas.map((c, idx) => (
              <th
                key={idx}
                className={`px-2 py-1 border border-slate-300 ${c.className ?? ""}`}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dados.map((item, index) => renderLinha(item, index))}
        </tbody>
      </table>

      {paginacao && (
        <div className="flex justify-center mt-4">
          {paginacao}
        </div>
      )}
    </div>
  );
}
