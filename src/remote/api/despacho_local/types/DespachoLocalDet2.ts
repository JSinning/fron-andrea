export interface IDespachoLocalDet2 {
  idDespachoLoc: number;
  auton: number;
  etiqueta: string;
  idEti: number;
  anular: boolean;
  motivoAnula?: string;
  fechaG?: string;
  guiaNo?: number;
  nAnima?: number;
  ladoAni?: string;
  pesoPro?: number;
  codigoProd?: string;
}

export type DespachoLocalDet2 = IDespachoLocalDet2[];
