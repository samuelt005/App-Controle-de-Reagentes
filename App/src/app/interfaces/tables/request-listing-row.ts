export interface RequestListingRow {
  id: number;
  status: number;
  comentario: string;
  createdAt: string;
  responsavel: {
    nome: string;
  };
}
