/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import { API_URL } from '@/consts';
import { HttpClient } from '@/remote/HttpClient';
import { AxiosRequestConfig } from 'axios';
import {
  AllTipoMov,
  BaseResponse,
  Customer,
  DetMovimientoRCanal,
  FriRCanaGuiasProd,
  FriRCanaNumGuia,
  FriRCanaTotCanal,
  IDetailDescription,
  MovMercanciaRCana,
} from '@/types';
import { TMovimientos } from './types/TMovimiento';
import IPagination from '@/types/IPagination';
import { ICambFech } from '@/remote/api/relacion_canales/types/cambFech';
import IQuery from '@/types/query';

export default class RelacionCanalApi extends HttpClient {
  constructor(authToken: string) {
    super(API_URL + '/relacion_canales');
    this.initializeRequestInterceptor(authToken);
  }

  public movements() {
    return this.instance.get<
      MovMercanciaRCana[],
      BaseResponse<MovMercanciaRCana[]>
    >('/movimientos');
  }

  public movement(consecTip: number, tipoMov: number) {
    return this.instance.get<
      MovMercanciaRCana,
      BaseResponse<MovMercanciaRCana>
    >(`/movimientos/${consecTip}/${tipoMov}`);
  }

  public allTipoMov() {
    return this.instance.get<AllTipoMov[], BaseResponse<AllTipoMov[]>>(
      '/movimientos/tipo_mov/all',
    );
  }

  public findConsecTip(tipoMov: number) {
    return this.instance.get<
      { consecTip: number },
      BaseResponse<{ consecTip: number }>
    >(`/movimientos/after_update/consec_tip/${tipoMov}`);
  }

  public updatePesaje(consecTip: number) {
    return this.instance.put<BaseResponse, BaseResponse>(
      `/movimientos/pesaje/${consecTip}`,
    );
  }

  public report(idConsecutivo: number) {
    return this.instance.get<string, BaseResponse<string>>(
      `/informes/${idConsecutivo}/pdf`,
    );
  }

  public checkEtiqueta(etiqueta: string) {
    return this.instance.get<boolean, BaseResponse<boolean>>(
      `/detalles/check_etiqueta/${etiqueta}`,
    );
  }

  public afterCheckEtiqueta(etiqueta: string) {
    return this.instance.get<boolean, BaseResponse<boolean>>(
      `/detalles/after_check_etiqueta/${etiqueta}`,
    );
  }

  public customers(params?: IPagination) {
    return this.instance.get<Customer[], BaseResponse<Customer[]>>(
      '/movimientos/clientes/all',
      { params },
    );
  }

  public customersFind(params?: IQuery) {
    return this.instance.get<Customer[], BaseResponse<Customer[]>>(
      '/movimientos/clientes/allByText',
      { params },
    );
  }

  public details(consecTip: number) {
    return this.instance.get<
      DetMovimientoRCanal[],
      BaseResponse<DetMovimientoRCanal[]>
    >('/detalles/' + consecTip);
  }

  public detailDescriptions() {
    return this.instance.get<
      IDetailDescription[],
      BaseResponse<IDetailDescription[]>
    >('/detalles/descriptions/all');
  }

  public checkDetailBeforeUpdateOrCreate(
    consecTip: number,
    tipoMov: number,
    data: Partial<DetMovimientoRCanal>,
    esPropio?: boolean,
    etiquetaN2?: string,
  ) {
    return this.instance.put<
      boolean | { consec: number; etiquetaN2: string },
      BaseResponse<boolean | { consec: number; etiquetaN2: string }>
    >(`/detalles/before_insert/${consecTip}/${tipoMov}`, data, {
      params: {
        esPropio,
        etiquetaN2,
      },
    });
  }

  public createMovement(data: Partial<MovMercanciaRCana>) {
    return this.instance.post<
      Partial<MovMercanciaRCana>,
      BaseResponse<MovMercanciaRCana>
    >('/movimientos/', data);
  }

  public updateMovement(
    consecTip: number,
    tipoMov: number,
    data: Partial<MovMercanciaRCana>,
  ) {
    return this.instance.put<
      Partial<MovMercanciaRCana>,
      BaseResponse<MovMercanciaRCana[]>
    >(`/movimientos/${consecTip}/${tipoMov}`, data);
  }

  public deleteMovement(consecTip: number, tipoMov: number) {
    return this.instance.delete<BaseResponse, BaseResponse>(
      `/movimientos/${consecTip}/${tipoMov}`,
    );
  }

  public total(consecTip: number, tipoMov: number) {
    return this.instance.get<
      { unid: number; subtota: number },
      BaseResponse<{ unid: number; subtota: number }>
    >(`/detalles/${consecTip}/${tipoMov}/total`);
  }

  public guiaNumber(consecTip: number, tipoMov: number) {
    return this.instance.get<FriRCanaNumGuia, BaseResponse<FriRCanaNumGuia>>(
      `/movimientos/${consecTip}/${tipoMov}/info`,
    );
  }

  public info(guiaNumber: number) {
    return this.instance.get<FriRCanaTotCanal, BaseResponse<FriRCanaTotCanal>>(
      `/subRelaCanLot/${guiaNumber}`,
    );
  }

  public products(consecTip: number, tipoMov: number) {
    return this.instance.get<
      FriRCanaGuiasProd,
      BaseResponse<FriRCanaGuiasProd>
    >(`/subConsoDespa/${consecTip}/${tipoMov}`);
  }

  public createDetail(
    consecTip: number,
    tipoMov: number,
    data: Partial<DetMovimientoRCanal>,
  ) {
    return this.instance.post<
      Partial<DetMovimientoRCanal>,
      BaseResponse<DetMovimientoRCanal>
    >(`/detalles/${consecTip}/${tipoMov}`, data);
  }

  public updateDetail(
    consecTip: number,
    tipoMov: number,
    autoNum: number,
    data: Partial<DetMovimientoRCanal>,
  ) {
    return this.instance.put<
      Partial<DetMovimientoRCanal>,
      BaseResponse<DetMovimientoRCanal>
    >(`/detalles/${consecTip}/${tipoMov}/${autoNum}`, data);
  }

  public getMenu1 = () => this.instance.get('/menu/getMenu1');

  public getMenu2 = (tipo: number) =>
    this.instance.get(`/menu/getMenu2/${tipo}`);

  public getSubConsecDespa = (consecTip: number, tipoMov: number) =>
    this.instance.get(`/subConsoDespa/${consecTip}/${tipoMov}`);

  public getSubRelCanLot = (guiaGen: number) =>
    this.instance.get(`/subRelaCanLot/${guiaGen}`);

  public getCliente = (params?: IPagination) =>
    this.instance.get<TMovimientos[], BaseResponse<TMovimientos[]>>(
      '/movimientos/consulta/clientes/all',
      { params },
    );
  public getClienteFind = (params?: IQuery) =>
    this.instance.get<TMovimientos[], BaseResponse<TMovimientos[]>>(
      '/movimientos/consulta/clientes/allByText',
      { params },
    );

  public getTerceros = () => this.instance.get('/movimientos/clientes/all');

  public getTipoMov = () => this.instance.get('/movimientos/tipo_mov/all');

  public getBusCliente = (idConcecutivo: number) =>
    this.instance.get<MovMercanciaRCana, BaseResponse<MovMercanciaRCana>>(
      `/movimientos/consulta/bus_client/${idConcecutivo}`,
    );

  public anularMovement = (
    consecTip: number,
    tipoMov: number,
    data: { motivoAnul: string },
  ) =>
    this.instance.put<null, BaseResponse>(
      `/movimientos/modificacion/set_null/${consecTip}/${tipoMov}`,
      data,
    );

  public getDetalles = (consecTip: number) =>
    this.instance.get(`/detalles/${consecTip}`);

  public getInfo = (consecTip: number, tipoMov: number) =>
    this.instance.get(
      `/relacion_canales/movimientos/consulta/${consecTip}/${tipoMov}/info`,
    );

  public getTCofInv1 = () => this.instance.get('/config');

  public putConfigur1 = (data: any) => this.instance.put('/config', data);

  public getCambFech = () =>
    this.instance.get<BaseResponse<ICambFech>>('/cambfech');
  public putCamFech = (data: ICambFech) =>
    this.instance.put<BaseResponse<ICambFech>>('/cambfech', data);

  private initializeRequestInterceptor(authToken: string) {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      config.headers = {
        Authorization: `Bearer ${authToken}`,
      };
      return config;
    }, this.handleError);
  }
}
