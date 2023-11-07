export interface RequestListingRow {
  id: number;
  status: number;
  comentario: string;
  createdAt: String;
  responsavel: {
    nome: string;
  };
}
