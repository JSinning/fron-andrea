export interface ITblDCjDespacCaja {
  idConcecutivo: number;
  consecTip: number;
  pedidoN: number;
  idPesajeV: number;
  fechaMov: string;
  nitoCC: string;
  dirEnvio?: string;
  ciudadEnvio?: string;
  paisEnvio?: string;
  transportador?: string;
  placaVeh: string;
  cCConduct?: string;
  document?: string;
  esPropio: boolean;
  horometro?: string;
  grupoDesp: number;
  turnoD: string;
  precintoInv?: string;
  precintoFs?: string;
  observaciones?: string;
  observaciones2?: string;
  anulada: boolean;
  motivoAnul?: string;
  procesado: boolean;
  entrego?: string;
  recibio?: string;
  imprim: string;
  concModEnv?: number;
  usuario?: string;
  fecha?: string;
  estacion?: string;
}

export type TblDCjDespacCaja = ITblDCjDespacCaja[];
