import { PieChart } from '@mui/x-charts/PieChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';
import { valueFormatter } from '../components/webUsageStatus';

type Props = {
  id: number;
  value: number;
  label: string;
};

export default function ChamadosPorCategoria() {
  const { chamados, assuntos, categorias } = useContext(DataContext);
  const [dadosGrafico, setDadosGrafico] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados || !assuntos || !categorias) return;

    // Mapeando Assuntos para suas respectivas Categorias
    const assuntoParaCategoria = assuntos.reduce((acc, assunto) => {
      acc[assunto.id] = assunto.categoriaId;
      return acc;
    }, {} as Record<string, string>);

    // Agrupando e contando os chamados por categoria
    const countByCategoria = chamados.reduce((acc, ch) => {
      const categoriaId = assuntoParaCategoria[ch.assuntoId];
      if (categoriaId) {
        acc[categoriaId] = (acc[categoriaId] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Transformando o resultado em um array para o gráfico
    const dadosArray = Object.entries(countByCategoria).map(([categoriaId, quantidade], index) => {
      const categoria = categorias.find(c => c.id === categoriaId);

      return {
        id: index,
        value: quantidade,
        label: categoria?.nome || 'Desconhecido'
      };
    });

    setDadosGrafico(dadosArray);
  }, [chamados, assuntos, categorias]);

  return (
    <PieChart
      series={[
        {
          data: dadosGrafico,
          arcLabel: (item) => `${item.value}`,
          cx: 120,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          
          valueFormatter,

        },
      ]}
      
      width={500} // Tamanho fixo do gráfico
      height={250} // Altura igual à largura para manter a proporção
    />
  );
}
