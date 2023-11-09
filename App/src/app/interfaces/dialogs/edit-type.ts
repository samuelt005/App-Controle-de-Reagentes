export interface EditType {
  rowData: {
    cod: number;
    descricao: string;
    loc_estoque: string;
    un_de_medida: {
      sigla: string;
    };
  };
}
