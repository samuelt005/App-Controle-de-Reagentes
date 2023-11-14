import { Tags } from '../dialogs/tags';

export interface Type {
  id?: number;
  descricao: string;
  loc_estoque: string;
  id_un_de_medida: number;
}

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
    id: number;
    cod: number;
    descricao: string;
    loc_estoque: string;
    estoque_atual: string;
    ativo: boolean;
    un_de_medida: {
      id: number;
      sigla: string;
    };
    tags: Tags[];
  };
}
