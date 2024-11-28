/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import { BaseResponse, ICambFech } from '@/types';
import {
  ICodigoPiel,
  ICodigoVendedor,
  IConductores,
  IMesa,
  ISexo,
  ISubReparto,
  ITransport,
  SubReparto,
  ISubRepartoImp,
  SubRepartoImp,
  ISubRepartoHt,
  BuscarClientesHist,
  IClientes,
  ICiudades,
  ITercMesa,
  TercMesa,
  TercTransport,
  ITercTransport,
  TercClientes,
  ITercClientes,
  IProveedor,
  TercPieles,
  ITercPieles,
  ITipoMoviento,
  INitoCod,
  INGuiaOptions,
  BuscarClientesMod,
  IRpReparto,
  IMovDespaPielDt1,
  MovDespaPielDt1,
  IMovDespaPielDt2,
  MovDespaPielDt2,
  IMovDespaPielGuia,
  MovDespaPielGuia,
  ICodigoPielDespa,
  IMovDespaPiel,
} from '@/remote/api/reparto/types';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';

export default class ReporteAPI extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getMenu1 = () => this.instance.get('/reporte/menu/getTMenu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/reporte/menu/getTMenu1WithTipo2/${tipo}`);

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers.Authorization = 'Bearer ' + this.authToken;
    return config;
  };

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );
  };
}
