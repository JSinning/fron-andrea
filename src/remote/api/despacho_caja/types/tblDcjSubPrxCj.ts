import { ITblDCjDespacCajaDet } from '@/remote/api/despacho_caja/types/tblDCjDespacCajaDet';

export interface ITblDcjSubPrxCj {
  consecTip: ITblDCjDespacCajaDet['consecTip'];
  etiNCaja: ITblDCjDespacCajaDet['etiNCaja'];
  codigoPro: ITblDCjDespacCajaDet['codProduc'];
  descripcionMer: string;
  pesoPr: number;
  unidades: ITblDCjDespacCajaDet['unidadesC'];
}

export type TblDcjSubPrxCj = ITblDcjSubPrxCj[];
