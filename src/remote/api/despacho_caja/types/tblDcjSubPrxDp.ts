import { ITblDCjDespacCajaDet } from '@/remote/api/despacho_caja/types/tblDCjDespacCajaDet';

export interface ITblDcjSubPrxDp {
  consecTip: ITblDCjDespacCajaDet['consecTip'];
  codigoPro: ITblDCjDespacCajaDet['codProduc'];
  descripcionMer: string;
  pesoPr: number;
  unidades: ITblDCjDespacCajaDet['unidadesC'];
}

export type TblDcjSubPrxDp = ITblDcjSubPrxDp[];
