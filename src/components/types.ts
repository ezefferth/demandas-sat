export type Usuario = {
  nome: string;
  // email: string;
  senha: string;
  admin?: boolean;
  nomeUsuario: string;
  avatar: BinaryType | null;
};