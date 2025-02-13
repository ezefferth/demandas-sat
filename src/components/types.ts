export type Usuario = {
  id: string;
  nome: string;
  senha: string;
  admin: boolean;
  nomeUsuario: string;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Categoria = {
  nome: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Setor = {
  nome: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export type Assunto = {
  nome: string;
  id: string;
  categoriaId: string;
  tempoLimite: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Chamado = {
  id: string;
  assuntoId: string;
  usuarioId: string
  setorId: string;
  prioridadeId: string | null;
  statusId: string;
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  finalizadoPor: string;
}

export type Comentario = {
  id: string;
  comentario: string;
  createdAt: Date;
  updatedAt: Date;
  chamadoId: string;
  usuarioId: string;
}

export type Status = {
  id: string
  nome: string;
  cor: string
  createdAt: Date;
  updatedAt: Date;

}

export type Prioridade = {
  id: string
  nome: string;
  cor: string
  createdAt: Date;
  updatedAt: Date;
}

export type Sugestao = {
  id: string
  sugestao: string;
  usuarioId: string
  createdAt: Date;
  updatedAt: Date;
}

export type TipoPatrimonio = {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Patrimonio = {
  id: string;
  tipoEquipamento: string
  descricao: string
  patromonio: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

