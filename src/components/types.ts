export type Usuario = {
  nome: string;
  // email: string;
  senha: string;
  admin?: boolean;
  nomeUsuario: string;
  avatar: BinaryType | null;
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