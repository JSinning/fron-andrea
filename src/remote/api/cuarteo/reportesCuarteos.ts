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
import IPagination from '@/types/IPagination';
import { BaseResponse, FriRCanaGuiasProd } from '@/types';
import {
  FriRCanaTotCanal,
  NitCCCuateo,
  ProductosSecund,
  Productos,
  reprocesoCanalDt1,
  reprocesoCanalDt3,
  subRelaCanGuia4,
  ISubRelaCanGuia3Data,
  ITblReproCanal,
  ProductosDt2,
  reprocesoCanalDt2,
  IReprocesoCanalDt2,
} from '@/remote/api/cuarteo/types';
import { IGuiaSacrifico } from '../guia_sacrificio/type';

export default class ReportesCuarteosApi extends HttpClient {
  public authToken: string;

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public rptReprocesopdf = (reprocesoNo: ITblReproCanal['reprocesoNo']) =>
    this.instance.get<BaseResponse<string>>(
      `/cuarteo/informes/rptreproceso/pdf/${reprocesoNo}`,
    );

  public rptDespacNacpdf = (reprocesoNo: ITblReproCanal['reprocesoNo']) =>
    this.instance.get<BaseResponse<string>>(
      `/cuarteo/informes/rptdespacnac/pdf/${reprocesoNo}`,
    );

  public rptrelacanpdf = (consecTip: string, tipoMov: string) =>
    this.instance.get<BaseResponse<string>>(
      `/cuarteo/informes/rptrelacan/pdf/${consecTip}/${tipoMov}`,
    );

  public rptstickmcanpdf = (autoNum: IReprocesoCanalDt2['autoNum']) =>
    this.instance.get<BaseResponse<string>>(
      `/cuarteo/informes/rptstickmcan/pdf/${autoNum}`,
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
