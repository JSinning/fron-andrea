/*
Copyright (©) Andrea.com.co - All Rights Reserved Unauthorized copying of this file, via any medium is strictly prohibited.
    Proprietary and confidential. Written and developed with ❤ by Andrea.com.co
2020 */
import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';

export default class MovPileApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getFriVistaPdae = (nguia: number) =>
    this.instance.get(`/caidaanimal/sacrificio/nGuia/${nguia}`);
  public getFriVistaPdae2 = (nguia: number, codAni: number) =>
    this.instance.get(`/caidaanimal/sacrificio/friVistaPda/${nguia}/${codAni}`);
  public gettSacridio1 = () =>
    this.instance.get('/caidaanimal/sacrificio/sacrificioDetOne');
  public gettSacrificioAnula = (nguia: number, codAni: number) =>
    this.instance.get(
      `/caidaanimal/sacrificio/sacrificioDetOneAnula/${nguia}/${codAni}`,
    );
  public getSacriDetOne = (nguia: number, codAni: number) =>
    this.instance.get(`/caidaanimal/sacrificio/sacriDetOne/${nguia}/${codAni}`);
  public getEntraCorr = (nguia: number, codAni: number) =>
    this.instance.get(`/caidaanimal/sacrificio/entraCorr/${nguia}/${codAni}`);
  public getPadConsole = () =>
    this.instance.get('/caidaanimal/sacrificiosubone/friVistaPdaConsole');
  public getMenu1 = (data: any) =>
    this.instance.get('/caidaanimal/menu/tmenu', data);
  public getMenu2 = (tipo: number, data: any) =>
    this.instance.get(`/caidaanimal/menu/tmenu/${tipo}`, data);
  public getCofigureSacrCaida1 = (data: any) =>
    this.instance.get('/caidaanimal/menu/getConfigurSacrCaida1');
  public getEdades = () =>
    this.instance.get<
      BaseResponse<
        Array<{
          idEdad: string;
          descripcion1: string;
          descripcion2: string;
        }>
      >
    >('/caidaanimal/sacrificio/edades');
  public getEdadesFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idEdad: string;
          descripcion1: string;
          descripcion2: string;
        }>
      >
    >('/caidaanimal/sacrificio/edadesByText', { params });

  public postGuardarCaida = (data: any) =>
    this.instance.post('/caidaanimal/sacrificio/', data);

  public putCofigureSacrCaida1 = (data: any) =>
    this.instance.put('/caidaanimal/menu/putConfigurSacrCaida1', data);

  public DeleteSacrifico4 = (nGuia: number, codoInd: number) =>
    this.instance.delete(
      `/caidaanimal/sacrificiosubone/sacrifDetFour/${nGuia}/${codoInd}`,
    );
  public DeleteSacrifico3 = (nGuia: number, codoInd: number) =>
    this.instance.delete(
      `/caidaanimal/sacrificiosubone/sacrifDetThree/${nGuia}/${codoInd}`,
    );
  public DeleteSacrifico2 = (nGuia: number, codoInd: number) =>
    this.instance.delete(
      `/caidaanimal/sacrificiosubone/sacrifDetTwo/${nGuia}/${codoInd}`,
    );
  public DeleteSacrifico1 = (nGuia: number, codoInd: number) =>
    this.instance.delete(
      `/caidaanimal/sacrificiosubone/sacrifDet/${nGuia}/${codoInd}`,
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
