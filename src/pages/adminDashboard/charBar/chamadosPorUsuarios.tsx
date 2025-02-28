import { BarChart } from '@mui/x-charts/BarChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';

type Props = {
  nome: string;
  quantidade: number;
};

export default function ChamadosPorUsuarios() {
  const { chamados, usuarios } = useContext(DataContext);
  const [dadosGrafico, setDadosGrafico] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados || !usuarios) return; // Verifica se os arrays estão definidos

    // Agrupando e contando os chamados por setorId
    const countBySetor = chamados.reduce((acc, ch) => {
      const usuarioId = ch.usuarioId;
      acc[usuarioId] = (acc[usuarioId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Transformando o resultado em um array para o gráfico
    const dadosArray = Object.entries(countBySetor).map(([usuarioId, quantidade]) => {
      const usuario = usuarios.find(s => s.id === usuarioId);

      return {
        nome: usuario?.nome || 'Desconhecido',
        quantidade: quantidade
      };
    });

    dadosArray.sort((a, b) => a.quantidade - b.quantidade)

    setDadosGrafico(dadosArray);
  }, [chamados, usuarios]);

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
