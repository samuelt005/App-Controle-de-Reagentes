export interface SolicitacoesResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: SolicitacoesData[];
}

export interface SolicitacoesRequest {
  comentario: string;
  id_usuario: string;
}

export interface SolicitacoesData {
  id: number;
  status: number;
  comentario: string;
  createdAt: string;
  responsavel_solicitacao: {
    nome: string;
  };
}
