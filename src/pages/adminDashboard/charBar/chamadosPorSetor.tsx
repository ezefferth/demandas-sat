import { BarChart } from '@mui/x-charts/BarChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';

type Props = {
  nome: string;
  quantidade: number;
};

export default function ChamadosPorSetor() {
  const { chamados, setores } = useContext(DataContext);
  const [dadosGrafico, setDadosGrafico] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados || !setores) return; // Verifica se os arrays estão definidos

    // Agrupando e contando os chamados por setorId
    const countBySetor = chamados.reduce((acc, ch) => {
      const setorId = ch.setorId;
      acc[setorId] = (acc[setorId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transformando o resultado em um array para o gráfico
    const dadosArray = Object.entries(countBySetor).map(([setorId, quantidade]) => {
      const setor = setores.find(s => s.id === setorId);

      return {
        nome: setor?.nome || 'Desconhecido',
        quantidade: quantidade
      };
    });

    setDadosGrafico(dadosArray);
  }, [chamados, setores]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: dadosGrafico.map(item => item.nome) }]}
        series={[
          {
            data: dadosGrafico.map(item => item.quantidade),
            label: 'Chamados'
          }
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}
