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
import { ITblDCjDespacCaja } from '@/remote/api/despacho_caja/types';
import { BaseResponse } from '@/types';

export default class ReportesDespachosCajasApi extends HttpClient {
  public authToken: string;

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getDespachoCj = (consecTip: ITblDCjDespacCaja['consecTip']) =>
    this.instance.get<BaseResponse<string>>(
      `/despachocajas/informes/despachocj/${consecTip}/pdf`,
    );

  public getDespachoCj2 = (consecTip: ITblDCjDespacCaja['consecTip']) =>
    this.instance.get<BaseResponse<string>>(
      `/despachocajas/informes/despachocj2/${consecTip}/pdf`,
    );

  public getDespachoCj3E = (consecTip: ITblDCjDespacCaja['consecTip']) =>
    this.instance.get<BaseResponse<string>>(
      `/despachocajas/informes/despachocj3e/${consecTip}/pdf`,
    );

  public getDespachoCjLt = (consecTip: ITblDCjDespacCaja['consecTip']) =>
    this.instance.get(`/despachocajas/informes/despachocjlt/${consecTip}/pdf`);

  public getDCompraPDCj = (consecTip: ITblDCjDespacCaja['consecTip']) =>
    this.instance.get<BaseResponse<string>>(
      `/despachocajas/informes/comppdcj/${consecTip}/pdf`,
    );

  public getDCControlVeh = (idPesaje: number) =>
    this.instance.get<BaseResponse<string>>(
      `/despachocajas/informes/controlveh/${idPesaje}/pdf`,
    );

  public getEtiquetaCr = () =>
    this.instance.get<BaseResponse<string>>(
      '/despachocajas/informes/etiqcr/pdf',
    );

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
