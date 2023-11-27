import { UnDeMedida } from '../shared/un-de-medida';

export interface HistoricosResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: HistoricosData[];
}

export interface HistoricosData {
  id: number;
  operacao: number;
  qtd_mov: number;
  qtd_rec: number;
  valor_tot: string;
  comentario: string;
  data: string;
  nfe: {
    numero: number;
    emitente: {
      razao_social: string;
    };
  };
  tipo: {
    id_un_de_medida: number;
    un_de_medida: {
      sigla: string;
      peso: number;
    };
  };
  responsavel_movimentacao: {
    nome: string;
  };
}

export interface HistoricosRequest {
  data: Date;
  valor_tot: number;
  qtd_mov: number;
  is_entry: boolean;
  comentario: string;
  id_usuario: string;
}

export interface HistoricosPageData {
  desc: string;
  total_value: number | null;
  total_entries: number;
  total_outputs: number;
  un_de_medida: UnDeMedida;
}

export interface AdjustmentsDialog {
  id: number;
  unDeMedida: string;
}
