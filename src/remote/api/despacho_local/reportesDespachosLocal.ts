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
import { BaseResponse } from '@/types';
import { IDLDespachoLc } from '@/remote/api/despacho_local/types';

export default class ReportesDespachosLocalApi extends HttpClient {
  public authToken: string;

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public rptDespachoLocalpdf = (
    idDespachoLoc: IDLDespachoLc['idDespachoLoc'],
  ) =>
    this.instance.get<BaseResponse<string>>(
      `/despacholocal/informes/DespachoLoc/${idDespachoLoc}/pdf`,
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
