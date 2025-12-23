import { Chamado, Demanda } from "../components/types";

export function CalculaDuracaoEAtrasoDemanda(demanda: Demanda) {
  if (!demanda?.createdAt) return { duration: "", atraso: 0 };

  const startTime = new Date(demanda.createdAt).getTime();
  const endTime = demanda.finishedAt
    ? new Date(demanda.finishedAt).getTime()
    : Date.now(); // Usa o momento atual se o demanda estiver em andamento

  const diffInSeconds = Math.floor((endTime - startTime) / 1000);

  // Calcular duração formatada
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const duration = `${days}d ${hours}h ${minutes}m`;

  // Calcular atraso em minutos
  const atraso = Math.floor(diffInSeconds / 60); // Total em minutos

  return { duration, atraso };
}

export function CalculaDuracaoEAtrasoChamado(chamado: Chamado) {
  if (!chamado?.createdAt) return { duration: "", atraso: 0 };

  const startTime = new Date(chamado.createdAt).getTime();
  const endTime = chamado.finishedAt
    ? new Date(chamado.finishedAt).getTime()
    : Date.now(); // Usa o momento atual se o demanda estiver em andamento

  const diffInSeconds = Math.floor((endTime - startTime) / 1000);

  // Calcular duração formatada
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const duration = `${days}d ${hours}h ${minutes}m`;

  // Calcular atraso em minutos
  const atraso = Math.floor(diffInSeconds / 60); // Total em minutos

  return { duration, atraso };
}