export interface IMovDespaPiel {
  idNDespacho: number;
  prefijo?: string;
  nDespacho: number;
  tipoMov: number;
  fechaMov: string;
  codPiel?: string;
  codPielEv?: string;
  dirEnvio?: string;
  ciudadEnvio?: string;
  paisEnvio?: string;
  transportador?: string;
  placaVeh?: string;
  ccConduct?: string;
  observacion?: string;
  elaboro?: string;
  anulado: boolean;
  motivoAnul?: string;
  imprime?: string;
  fecha?: string;
  usuario?: string;
  estacion?: string;
}
