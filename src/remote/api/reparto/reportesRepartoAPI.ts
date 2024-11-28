import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import { BaseResponse } from '@/types';

export default class ReportesRepartoAPI extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getRepartoHistPdf = (nReparto: number) =>
    this.instance.get<BaseResponse<string>>(
      `/reparto/informes/repartohist/${nReparto}/pdf`,
    );
  public getRepartoDespaNac = (idConcecutivo: number) =>
    this.instance.get<BaseResponse<string>>(
      `/despachonacional/informes/DespacNac/${idConcecutivo}/pdf`,
    );
  public getReparto = (nReparto: number) =>
    this.instance.get<BaseResponse<string>>(
      `/reparto/informes/reparto/${nReparto}/pdf`,
    );
  public getRepartoDiaCons = () =>
    this.instance.get<BaseResponse<string>>('/reparto/informes/diacons/pdf');
  public getRepartoDiaCons2 = () =>
    this.instance.get<BaseResponse<string>>('/reparto/informes/diacons2/pdf');

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
