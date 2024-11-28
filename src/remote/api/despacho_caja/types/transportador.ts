import { ITransportad } from '@/remote/api/despacho_caja/types/transportad';

export interface ITransportador {
  idTransporta: ITransportad['idTransporta'];
  desctransport: ITransportad['desctransport'];
  expr2: string;
}
