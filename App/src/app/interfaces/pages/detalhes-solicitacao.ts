export interface ItemSolicitacao {
  id: number;
  novo: boolean;
  recusado: boolean;
  comentario: string;
  qtd_mov: number;
  status?: number;
  lote?: {
    id: number;
    numero: number;
  };
  nfe?: {
    id: number;
    numero: number;
  };
  tipo: {
    cod: number;
    descricao: string;
    un_de_medida: {
      sigla: string;
    };
  };
}

export interface ItemSolicitacaoRequest {
  recusado?: boolean | null;
  lote?: string | null;
  nfe?: string | null;
}

export interface SolicitacaoPageData {
  id: number;
  data: Date;
  status: number;
  responsavel: string;
  comentario: string;
}
