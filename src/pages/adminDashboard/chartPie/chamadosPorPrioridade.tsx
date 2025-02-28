import { PieChart } from '@mui/x-charts/PieChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';
import { valueFormatter } from '../components/webUsageStatus';

type Props = {
  id: number;
  value: number;
  label: string;
};

export default function ChamadosPorPrioridades() {
  const { chamados, prioridades } = useContext(DataContext);
  const [chamadosPor, setChamadosPor] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados || !prioridades) return; // Verifica se os arrays estão definidos

    // Agrupando e contando os chamados por prioridadeId
    const countBy = chamados.reduce((acc, ch) => {
      const prioridadeId = ch.prioridadeId || 'semPrioridade'; // Tratar null como 'semPrioridade'
      acc[prioridadeId] = (acc[prioridadeId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transformando o resultado em um array para o gráfico
    const chamadosPorArray = Object.entries(countBy).map(([prioridadeId, count], index) => {
      // Buscando o nome da prioridade
      const aux = prioridades.find(p => p.id === prioridadeId);

      return {
        id: index,
        value: count,
        label: aux?.nome || 'Sem Prioridade'
      };
    });

    setChamadosPor(chamadosPorArray);
  }, [chamados, prioridades]);

  return (
    <PieChart
      series={[
        {
          data: chamadosPor,
          cx: 120,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
          arcLabel: (item) => `${item.value}`
        },

      ]}


      width={500} // Tamanho fixo do gráfico
      height={250} // Altura igual à largura para manter a proporção
    />
  );
}
