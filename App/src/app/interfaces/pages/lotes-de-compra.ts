export interface LotesDeCompraResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: LotesDeCompraData[];
}

export interface LotesDeCompraData {
  id: number;
  numero: number;
  itens_vinculados: string;
  createdAt: string;
}

export interface LotesDeCompraRequest {
  numero: number;
}

export interface LotesDeCompraDialog {
  rowData: {
    id: number;
    numero: number;
  };
}
