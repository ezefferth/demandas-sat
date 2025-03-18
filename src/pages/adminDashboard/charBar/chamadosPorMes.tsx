import { BarChart } from '@mui/x-charts/BarChart';
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';

type Props = {
  nome: string;
  quantidade: number;
};

export default function ChamadosPorMes() {

  // Função para converter o número do mês para o nome abreviado
  function converteParaMes(valor: number) {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return meses[valor - 1];
  }

  // Função para obter os últimos 12 meses
  function obterUltimos12Meses() {
    const dataAtual = new Date();
    const meses = [];

    for (let i = 11; i >= 0; i--) {
      const data = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - i, 1);
      const mes = data.getMonth() + 1;
      const ano = data.getFullYear();
      meses.push({ mes, ano, nome: `${converteParaMes(mes)} ${ano}`, quantidade: 0 });
    }

    return meses;
  }

  const { chamados } = useContext(DataContext);
  const [dadosGrafico, setDadosGrafico] = useState<Props[]>([]);

  useEffect(() => {
    if (!chamados) return;

    const ultimos12Meses = obterUltimos12Meses();

    // Contando os chamados por mês
    chamados.forEach(chamado => {
      const dataChamado = new Date(chamado.createdAt);
      const mesChamado = dataChamado.getMonth() + 1;
      const anoChamado = dataChamado.getFullYear();

      // Verificando se o chamado está nos últimos 12 meses
      const mesEncontrado = ultimos12Meses.find(item => item.mes === mesChamado && item.ano === anoChamado);

      if (mesEncontrado) {
        mesEncontrado.quantidade += 1;
      }
    });

    // Garantindo a ordem correta dos meses
    ultimos12Meses.sort((a, b) => (a.ano - b.ano) || (a.mes - b.mes));

    // Atualizando o estado para o gráfico
    setDadosGrafico(ultimos12Meses);
  }, [chamados]);

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
