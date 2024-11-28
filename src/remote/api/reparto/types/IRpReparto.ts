/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
export interface IRpReparto {
  prefijo?: string;
  nReparto: number;
  tipoMov: number;
  nGuia: number;
  fechaMov: string;
  mCodResUsua: boolean;
  observacion?: string;
  elaboro?: string;
  anulado: boolean;
  motivoAnul?: string;
  estado: string;
  motivoEstado?: string;
  procesado: boolean;
  imprime?: string;
  fecha?: string;
  usuario?: string;
}
