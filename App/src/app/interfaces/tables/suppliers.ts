export interface SuppliersRow {
  id: number;
  razao_social: string;
  cnpj: string;
  createdAt: string;
}

export interface SuppliersData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: SuppliersRow[];
}
