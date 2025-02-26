import { PieChart } from '@mui/x-charts/PieChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';

type Props = {
  id: number;
  value: number;
  label: string;
};

export default function ChamadosPorStatus() {
  const { chamados, status } = useContext(DataContext);
  const [chamadosPor, setChamadosPor] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados || !status) return; // Verifica se os arrays estão definidos

    // Agrupando e contando os chamados por prioridade
    const countBy = chamados.reduce((acc, ch) => {
      acc[ch.statusId] = (acc[ch.statusId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transformando o resultado em um array para o gráfico
    const chamadosPorArray = Object.entries(countBy).map(([statusId, count], index) => {
      // Buscando o nome do assunto
      const aux = status.find(a => a.id === statusId);

      return {
        id: index,
        value: count,
        label: aux?.nome || 'Desconhecido'
      };
    });

    setChamadosPor(chamadosPorArray);
  }, [chamados, status]);

  return (
    <div>
      <PieChart
        series={[
          {
            data: chamadosPor, // Dados prontos para o gráfico
          },
        ]}
        width={600}
        height={250}
      />
    </div>
  );
}
