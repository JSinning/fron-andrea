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

export default class MovPileApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getMinValue = () => this.instance.get('/movpieles/minValue');
  public getComenzarProceso = (minValu: number) =>
    this.instance.get(`/movpieles/byAuton/${minValu}`);
  public geNanimal = (nguia: number) =>
    this.instance.get(`/movpieles/byNGuia/${nguia}`);
  public geNomP = (nguia: number) =>
    this.instance.get(`/movpieles/nGuiaNom/${nguia}`);
  public getMovPiesf = () => this.instance.get('/movpieles/movPielesSF');
  public getMovPiesfPeso = () =>
    this.instance.get('/movpieles/movPielesSfPeso');
  public getMovSigte = () => this.instance.get('/movpieles/movPielesSfSgte');
  public getMovDia = () => this.instance.get('/movpieles/subDetRelPielDia');
  public putGuardar = (auton: number, codInd: number, data: any) =>
    this.instance.put(`/movpieles/${auton}/${codInd}`, data);
  public getMenu1 = (data: any) =>
    this.instance.get('/movpieles/tMenuUno', data);
  public getMenu2 = (tipo: number, data: any) =>
    this.instance.get(`/movpieles/tMenuDos/${tipo}`, data);
  public getConfigur1 = (data: any) =>
    this.instance.get('/movpieles/configurPieles', data);
  public getMovPielesUno = (autonu: number) =>
    this.instance.get(`/movpieles/movPielesUno/${autonu}`);

  public getRptPesoPiel = () =>
    this.instance.get('/movpieles/informes/pdf_peso_piel');

  public putConfigur1 = (data: any) =>
    this.instance.put('/movpieles/putConfigurPieles', data);

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
