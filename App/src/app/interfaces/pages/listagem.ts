import { Tag } from "../shared/tag";
import { UnDeMedida } from "../shared/un-de-medida";

export interface ListagemResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: ListagemData[];
}

export interface ListagemData {
  id: number;
  cod: number;
  descricao: string;
  loc_estoque: string;
  estoque_atual: number;
  vlr_estoque: string;
  entradas: number;
  saidas: number;
  ativo: boolean;
  un_de_medida: UnDeMedida;
  tags: Tag[];
}

export interface ListagemPageData {
  total_items: number;
  total_value: number;
  most_used: string;
}