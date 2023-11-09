export interface RequestListingRow {
  id: number;
  status: number;
  comentario: string;
  createdAt: string;
  responsavel: {
    nome: string;
  };
}

export interface RequestListingData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: RequestListingRow[];
}