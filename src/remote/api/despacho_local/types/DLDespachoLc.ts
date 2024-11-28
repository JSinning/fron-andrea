export interface IDLDespachoLc {
  idDespachoLoc: number;
  placaVeh: string;
  fechaUs?: string;
  anulado: boolean;
  fechaDL: string;
  imprime: string;
  realizo?: string;
  usuario?: string;
  motivoAnul?: string;
  observacion?: string;
  conductorVeh: string;
}

export type DLDespachoLc = IDLDespachoLc[];
