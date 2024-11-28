/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
export interface MovMercanciaRCana {
  idConsecutivo: number;
  prefijo?: string;
  consecTip: number;
  tipoMov: number;
  destino?: number;
  fechaMov: string;
  nitoCC: string;
  dirEnvio?: string;
  ciudadEnvio?: string;
  paisEnvio?: string;
  transportador?: string;
  placaVeh?: string;
  ccConductor?: string;
  document?: string;
  esPropio: boolean;
  horometro?: string;
  observaciones?: string;
  observaciones2?: string;
  anulada?: boolean;
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
