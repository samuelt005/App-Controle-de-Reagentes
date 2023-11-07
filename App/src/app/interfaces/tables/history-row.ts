export interface HistoryRow {
  id: number;
  operacao: number;
  qtd_mov: number;
  qtd_rec: number;
  valor_unit: string;
  novo: boolean;
  recusado: boolean;
  resp_ajuste: string;
  comentario: string;
  data: string;
  nfe: {
    numero: number;
    id_emitente: number;
    emitente: {
      cnpj: string;
      razao_social: string;
    };
  };
  solicitacao: {
    id_responsavel: number;
    responsavel: {
      nome: string;
    };
  };
  tipo: {
    id_un_de_medida: number;
    un_de_medida: {
      sigla: string;
    };
  };
}
