import { MovMercanciaRCana } from '.';

export type TMovimientos = Pick<
  MovMercanciaRCana,
  'idConsecutivo' | 'consecTip' | 'fechaMov' | 'procesado' | 'anulada'
> & { nombreCliente: string };
