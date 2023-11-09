export interface LotsRow {
  id: number;
  numero: number;
  itens_vinculados: string;
  createdAt: string;
}

export interface LotsData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: LotsRow[];
}
