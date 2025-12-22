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
};

export type Setor = {
  nome: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
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

export type Chamado = {
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
  chamadoId: string;
  usuarioId: string;
};
export type ComentarioDemanda = {
  id: string;
  comentario: string;
  createdAt: Date;
  updatedAt: Date;
  demandaId: string;
  usuarioId: string;
};
export type ComentarioSolicitacaoMaterial = {
  id: string;
  comentario: string;
  createdAt: Date;
  solicitacaoId: number;
  updatedAt: Date;
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
  chamadoId: number;
  comentarioId?: string | null;
};
export type DocumentoDemanda = {
  id: string;
  nome: string;
  mimeType: string;
  conteudo: Uint8Array;
  createdAt: Date;
  updatedAt: Date;
  demandaId: number;
  comentarioId?: string | null;
};

export type Material = {
  id: string
  nome: string
  descricao?: string
  tipo: "LIMPEZA" | "EXPEDIENTE"
  unidade: string
  qtd: number
  qtdBetha: number
  ativo: boolean
  createdAt: Date;
  updatedAt: Date;
}
export type ItemSelecionado = {
  materialId: string
  nome: string
  unidade: string
  qtdSolicitada: number
}
export type ItemSolicitacaoMaterial = {
  id: string
  solicitacaoId: number
  materialId: string
  qtdSolicitada: number
  qtdAprovada: number
  aprovado: boolean
  createdAt: Date
  updatedAt: Date
  // solicitacao  
  material: Material

}
export type SolicitacaoMaterial = {
  id: number
  usuarioId: string
  setorId: string
  descricao?: string
  statusDemandaId?: string
  prioridadeDemandaId?: string
  createdAt: Date
  updatedAt: Date
  finishedAt?: Date
  finalizadoPor: string
  itens: ItemSolicitacaoMaterial[]
}