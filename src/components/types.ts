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