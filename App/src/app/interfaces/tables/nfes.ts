export interface Nfe {
  id?: number;
  numero: number;
  data_emissao: Date;
  id_fornecedor: number;
}

export interface NfesRow {
  id: number;
  numero: number;
  data_emissao: string;
  emitente: {
    id: number;
    razao_social: string;
    cnpj: string;
  };
  itens_vinculados: number;
}

export interface NfesData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: NfesRow[];
}

export interface EditNfe {
  rowData: {
    id: number;
    numero: number;
    data_emissao: string;
    emitente: {
      id: number;
      razao_social: string;
      cnpj: string;
    };
    itens_vinculados: number;
  };
}
