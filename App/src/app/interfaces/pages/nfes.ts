export interface NfesResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: NfesData[];
}

export interface NfesData {
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

export interface NfesRequest {
  numero: number;
  data_emissao: Date;
  id_fornecedor: number;
}