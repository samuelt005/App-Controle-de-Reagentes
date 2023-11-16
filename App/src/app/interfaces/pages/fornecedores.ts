export interface FornecedoresResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: FornecedoresData[];
}

export interface FornecedoresData {
  id: number;
  razao_social: string;
  cnpj: string;
  createdAt: string;
  notas_vinculadas: number;
}

export interface FornecedoresRequest {
  razao_social: string;
  cnpj: string;
}

export interface FornecedoresDialog {
  rowData: {
    id: number;
    cnpj: number;
    razao_social: string;
  };
}
