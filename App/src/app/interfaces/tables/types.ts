import { Tags } from './tags';

export interface TypesRow {
  cod: string;
  desc: string;
  tags: Tags;
  localizacao: string;
  un: string;
  valor_estoque: number;
  prod_id: number;
}

export interface TypesData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: TypesRow[];
}

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
