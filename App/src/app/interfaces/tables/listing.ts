import { NewTags } from "../dialogs/new-tags";
import { UnsDeMedida } from "./uns-de-medida";

export interface ListingRow {
  id: number;
  cod: number;
  descricao: string;
  loc_estoque: string;
  estoque_atual: string;
  vlr_estoque: string;
  entradas: number;
  saidas: number;
  ativo: boolean;
  un_de_medida: UnsDeMedida;
  tags: NewTags[];
}

export interface ListingData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: ListingRow[];
}
