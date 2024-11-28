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

export default class AvisosApi extends HttpClient {
  private authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getAvisos = () => this.instance.get('/movpieles/avisos');
  public getCodigoAvisos = (coigoAviso: number) =>
    this.instance.get(`/movpieles/avisos/${coigoAviso}`);
  public putAvisos = (codAviso: number, data: any) =>
    this.instance.put(`/movpieles/avisos/${codAviso}`, data);
  public postAvisos = (data: any) =>
    this.instance.post('/movpieles/avisos', data);
  public deletAvisos = (codAviso: number) =>
    this.instance.delete(`/movpieles/avisos/${codAviso}`);

  public getCambFecha = () => this.instance.get('/movpieles/cambfech/');
  public putCamFecha = (idAton: any, data: any) =>
    this.instance.put(`/movpieles/cambfech/${idAton}`, data);

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
