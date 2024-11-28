export interface ITblDCjDespacCajaDet {
  consecTip: number;
  autoNum?: number;
  etiquetaC: string;
  etiTex: string;
  etiNCaja: number;
  codProduc: string;
  descripcClien: string;
  unidadesC: number;
  idPedido: number;
  peso1: number;
  peso2: number;
  taraC: number;
  anulaCC: boolean;
  motivoAnu?: string;
  usuarioCr?: string;
  fechaG: string;
}

export type TblDCjDespacCajaDet = ITblDCjDespacCajaDet[];
