export interface UsuariosResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: UsuariosData[];
}

export interface UsuariosData {
  id: string;
  nome: string;
  email: string;
  confirmed_email: boolean;
  ra: string;
  cpf: number;
  createdAt: string;
  perfil: {
    id: string;
    nome: string;
  };
}

export interface UsuariosRequest {
  nome: string;
  email: string;
  ra: string;
  cpf: string;
}
