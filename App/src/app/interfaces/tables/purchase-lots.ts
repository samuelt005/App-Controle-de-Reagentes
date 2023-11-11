export interface PurchaseLot {
  id?: number;
  numero: number;
}

export interface PurchaseLotsRow {
  id: number;
  numero: number;
  itens_vinculados: string;
  createdAt: string;
}

export interface PurchaseLotsData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: PurchaseLotsRow[];
}

export interface EditPurchaseLot {
  rowData: {
    id: number;
    numero: number;
  };
}
