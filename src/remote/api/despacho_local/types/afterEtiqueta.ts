import { IDespachoLocalDet2 } from '@/remote/api/despacho_local/types/DespachoLocalDet2';

export interface IAfterEtiqueta {
  etiqueta: IDespachoLocalDet2['etiqueta'];
  etiquetaN2: string;
  cuartoFrio: number;
  anular: boolean;
  motivoAnula: string;
  usuario: string;
}
