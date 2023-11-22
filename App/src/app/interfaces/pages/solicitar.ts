export interface solicitacaoRequest {
  id: number;
  data: Date;
  qtd_mov: number;
  comentario: string;
  id_usuario?: string;
  id_solicitacao: number;
}