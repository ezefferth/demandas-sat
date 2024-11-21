export type Usuario = {
  id: string;
  nome: string;
  senha: string;
  admin: boolean;
  nomeUsuario: string;
  avatar?: BinaryType | null;
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
}

export type Assunto = {
  nome: string;
  id: string;
  categoriaId: string;
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
