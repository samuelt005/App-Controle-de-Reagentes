import { Tag } from '../shared/tag';

export interface TiposDeReagenteResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: TiposDeReagenteData[];
}

export interface TiposDeReagenteData {
  cod: string;
  desc: string;
  tags: Tag;
  localizacao: string;
  un: string;
  valor_estoque: number;
  prod_id: number;
}

export interface TiposDeReagenteRequest {
  descricao: string;
  loc_estoque: string;
  id_un_de_medida: number;
}

export interface TiposDeReagenteDialog {
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
    tags: Tag[];
  };
}

export interface TagsDialog {
  id: number;
  tags: { sigla: string }[];
}
