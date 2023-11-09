export interface EditNfe {
  rowData: {
    id: number;
    numero: number;
    data_emissao: string;
    emitente: {
      id: number;
      razao_social: string;
      cnpj: string;
    },
    itens_vinculados: number;
  };
}