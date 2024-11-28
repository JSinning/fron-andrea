import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';

export default class RelacionReportesApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getRelaCanPDF = (idConcecutivo: number) =>
    this.instance.get(`/relacion_canales/informes/${idConcecutivo}/pdf`);

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
