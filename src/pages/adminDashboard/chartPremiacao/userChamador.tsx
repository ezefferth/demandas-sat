
import { DataContext } from '../../../components/data/context/dataContext';
import { useContext, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


export default function ChamadorDoMes() {

  // Função para converter o número do mês para o nome abreviado
  function converteParaMes(valor: number) {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[valor - 1];
  }

  // Função para obter o mês de referência (Atual ou Anterior)
  function obterMesDeReferencia() {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();

    // Se for dia 28 ou mais, o mês de referência é o mês atual
    // Caso contrário, considera o mês anterior
    if (diaAtual >= 28) {
      return { mes: mesAtual, ano: anoAtual };
    } else {
      const mesAnterior = mesAtual - 1 === 0 ? 12 : mesAtual - 1;
      const anoAnterior = mesAtual - 1 === 0 ? anoAtual - 1 : anoAtual;
      return { mes: mesAnterior, ano: anoAnterior };
    }
  }

  const { chamados, usuarios } = useContext(DataContext);
  const [vencedores, setVencedores] = useState<string[]>([]);
  const [mesReferencia, setMesReferencia] = useState('');

  useEffect(() => {
    if (!chamados || !usuarios) return;

    const { mes, ano } = obterMesDeReferencia();
    setMesReferencia(`${converteParaMes(mes)} de ${ano}`);

    // Inicializando o contador de chamados por usuário no mês de referência
    const countPorUsuario: Record<string, number> = {};

    // Contando os chamados do mês de referência
    chamados.forEach(chamado => {
      const dataChamado = new Date(chamado.createdAt);
      const mesChamado = dataChamado.getMonth() + 1;
      const anoChamado = dataChamado.getFullYear();

      // Verificando se o chamado é do mês de referência
      if (mesChamado === mes && anoChamado === ano) {
        const usuarioId = chamado.usuarioId;
        countPorUsuario[usuarioId] = (countPorUsuario[usuarioId] || 0) + 1;
      }
    });

    // Identificando o(s) vencedor(es)
    const maxChamados = Math.max(...Object.values(countPorUsuario));
    const vencedoresDoMes = Object.entries(countPorUsuario)
      .filter(([_, quantidade]) => quantidade === maxChamados)
      .map(([usuarioId]) => usuarios.find(u => u.id === usuarioId)?.nome || 'Desconhecido');

    setVencedores(vencedoresDoMes);

  }, [chamados, usuarios]);

  // Animação de Premiação
  const animacao = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
    config: { tension: 300, friction: 10 }
  });

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Chamador do Mês</h2>
      <h3>{mesReferencia}</h3>
      {vencedores.length > 0 ? (
        vencedores.map((nome, index) => (
          <animated.div style={animacao} key={index}>
            <EmojiEventsIcon style={{ color: 'gold', fontSize: '40px' }} />
            <span style={{ fontSize: '20px', marginLeft: '10px' }}>{nome}</span>
          </animated.div>
        ))
      ) : (
        <p>Nenhum chamado registrado neste mês.</p>
      )}
    </div>
  );
}
