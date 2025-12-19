export type Usuario = {
  id: string;
  nome: string;
  senha: string;
  admin: boolean;
  nomeUsuario: string;
  status: boolean;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Categoria = {
  nome: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Setor = {
  nome: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  recebeAssunto: boolean;
};

export type Assunto = {
  nome: string;
  id: string;
  categoriaId: string;
  tempoLimite: number;
  setorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Demanda = {
  id: string;
  assuntoId: string;
  usuarioId: string;
  setorId: string;
  prioridadeId: string | null;
  statusId: string;
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  finalizadoPor: string;
  patrimonios: Patrimonio[];
};

export type Comentario = {
  id: string;
  comentario: string;
  createdAt: Date;
  updatedAt: Date;
  demandaId: string;
  usuarioId: string;
};

export type Status = {
  id: string;
  nome: string;
  cor: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Prioridade = {
  id: string;
  nome: string;
  cor: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Sugestao = {
  id: string;
  sugestao: string;
  usuarioId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TipoPatrimonio = {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Patrimonio = {
  id: string;
  tipoPatrimonioId: string;
  descricao: string;
  patrimonio: string;
  status: string;
  setorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Documento = {
  id: string;
  nome: string;
  mimeType: string;
  conteudo: Uint8Array;
  createdAt: Date;
  updatedAt: Date;
  demandaId: number;
  comentarioId?: string | null;
};

export type TipoMaterial = "LIMPEZA" | "EXPEDIENTE";

export type Material = {
  id: string;
  nome: string;
  descricao?: string | null;
  tipo: TipoMaterial;
  unidade: string;
  qtd: number;
  qtdBetha?: number | null;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type StatusDemanda = {
  id: string;
  nome: string;
  cor: string;
  createdAt: Date;
  updatedAt: Date;
};

