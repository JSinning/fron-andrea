/*
 Copyright (©) Andrea.com.co - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited.
* Proprietary and confidential.
* Written and developed with  ❤️ by Andrea.com.co
* 2020
*/

import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../HttpClient';

export default class ReportesCanalCaliente extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getStickMCan = (Ngui: number, Auton: number) =>
    this.instance.get(`/canalcaliente/informe/stick_km_can/${Ngui}/${Auton}`);
  public getStickMCan1 = (Nguia: number) =>
    this.instance.get(`/canalcaliente/informe/stick_km_can1/${Nguia}`);
  public gerStickMCan1Borra = () =>
    this.instance.get('/canalcaliente/informe/stick_km_can_cop_borra');
  public getStrickNCan2 = () =>
    this.instance.get('/canalcaliente/informe/stick_km_can2');
  public getStickMCanV2 = (nguia: number) =>
    this.instance.get(`/canalcaliente/informe/stick_km_canv2/${nguia}`);
  public getStickMCanv3 = (nguia: number) =>
    this.instance.get(`canalcaliente/informe/stick_km_canv3/${nguia}`);

  public getSticCanal = (Auton: number) =>
    this.instance.get(`/canalcaliente/informe/pdf_stic_canal/${Auton}`);
  public getStickMCanPDF = (auton: number) =>
    this.instance.get(`/canalcaliente/informe/pdf_stickmcan/${auton}`);
  public getStickMCan1PDF = (nguia: number) =>
    this.instance.get(`/canalcaliente/informe/pdf_stickmcan/${nguia}`);
  public getStickMCan2PDF = (nguia: number) =>
    this.instance.get(`/canalcaliente/informe/pdf_stickmcan2/${nguia}`);

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
