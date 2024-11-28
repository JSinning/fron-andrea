import { IDcCajasCjImp } from '@/remote/api/despacho_caja/types/dcCajasCjImp';

export interface IBuscarClientesDCCj {
  consecTip: IDcCajasCjImp['consecTip'];
  fechaMov: IDcCajasCjImp['fechaMov'];
  procesado: IDcCajasCjImp['procesado'];
  anulada: IDcCajasCjImp['anulada'];
  tercero: IDcCajasCjImp['tercero'];
}
