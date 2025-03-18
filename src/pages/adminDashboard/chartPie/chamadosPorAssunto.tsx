import { PieChart } from '@mui/x-charts/PieChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';
import { valueFormatter } from '../components/webUsageStatus';

type Props = {
  id: number;
  value: number;
  label?: string;
};

export default function ChamadosPorAssunto() {
  const { chamados, assuntos } = useContext(DataContext);
  const [chamadosPorAssunto, setChamadosPorAssunto] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados || !assuntos) return; // Verifica se os arrays estão definidos

    // Agrupando e contando os chamados por assuntoId
    const countByAssunto = chamados.reduce((acc, ch) => {
      acc[ch.assuntoId] = (acc[ch.assuntoId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transformando o resultado em um array para o gráfico
    const chamadosPorAssuntoArray = Object.entries(countByAssunto).map(([assuntoId, count], index) => {
      // Buscando o nome do assunto
      const assunto = assuntos.find(a => a.id === assuntoId);

      return {
        id: index,
        value: count,
        label: assunto?.nome || 'Desconhecido'
      };
    });

    setChamadosPorAssunto(chamadosPorAssuntoArray);
  }, [chamados, assuntos]);

  return (
    <PieChart
      series={[
        {
          data: chamadosPorAssunto,
          cx: 120,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
          arcLabel: (item) => `${item.value}`
        },

      ]}
      width={500}
      height={250}
    />

  );
}
