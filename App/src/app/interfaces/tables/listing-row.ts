import { NewTags } from './new-tags';
import { UnsDeMedida } from './uns-de-medida';

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
