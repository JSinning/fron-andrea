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

export default class MenuApi extends HttpClient {
  private authToken: string;
  constructor(authToken: string) {
    super(API_URL);

    this.authToken = authToken;
    this.initializeRequestInterceptor();
  }

  public setAuthToken(value: string) {
    this.authToken = value;
    this.initializeRequestInterceptor();
  }

  public ping = () => this.instance.get('/ping');
  public empresas = () => this.instance.get('/Panelprincipal/empresas');
  public otros = (user: string) =>
    this.instance.get(`/Panelprincipal/nameEstacion/${user}`);
  public deleteFechaPieles = (user: string) =>
    this.instance.delete(`/menu_produccion/entraPieles/${user}`);
  public fechaPieles = (data: any) =>
    this.instance.post('/menu_produccion/entraPieles', data);

  public deleteFechaCanalCaliente = (user: string) =>
    this.instance.delete(`/menu_produccion/entraCCa/${user}`);
  public fechaCanalCaliente = (data: any) =>
    this.instance.post('/menu_produccion/entraCCa', data);

  public deleteFechaSacrifio = (user: string) =>
    this.instance.delete(`/menu_produccion/entraSacr/${user}`);
  public fechaScarifico = (data: any) =>
    this.instance.post('/menu_produccion/entraSacr', data);

  public deleteFechaVisceras = (user: string) =>
    this.instance.delete(`/menu_produccion/entraVisc/${user}`);
  public fechaVisceras = (data: any) =>
    this.instance.post('/menu_produccion/entraVisc', data);

  public deleteFechaDNacional = (user: string) =>
    this.instance.delete(`/menu_produccion/entraDNa/${user}`);
  public fechaDNacional = (data: any) =>
    this.instance.post('/menu_produccion/entraDNa', data);

  public deleteFechaRCanal = (user: string) =>
    this.instance.delete(`/menu_produccion/entraRCa/${user}`);
  public fechaRCanal = (data: any) =>
    this.instance.post('/menu_produccion/entraRCa', data);

  public deleteFechaCuarteo = (user: string) =>
    this.instance.delete(`/menu_produccion/entraCteo/${user}`);
  public fechaCuarteo = (data: any) =>
    this.instance.post('/menu_produccion/entraCteo', data);

  public deleteFechaGuia = (user: string) =>
    this.instance.delete(`/menu_produccion/entraGuia/${user}`);
  public fechaGuia = (data: any) =>
    this.instance.post('/menu_produccion/entraGuia', data);

  public deleteFechaDLocal = (user: string) =>
    this.instance.delete(`/menu_produccion/entraDLo/${user}`);
  public fechaDLocal = (data: any) =>
    this.instance.post('/menu_produccion/entraDLo', data);

  public deleteFechaDCaja = (user: string) =>
    this.instance.delete(`/menu_produccion/entraDCj/${user}`);
  public fechaDCaja = (data: any) =>
    this.instance.post('/menu_produccion/entraDCj', data);

  public deleteFechaReparto = (user: string) =>
    this.instance.delete(`/menu_produccion/entraRepa/${user}`);
  public fechaReparto = (data: any) =>
    this.instance.post('/menu_produccion/entraRepa', data);

  public deleteFechaReporte = (user: string) =>
    this.instance.delete(`/menu_produccion/entraRepor/${user}`);
  public fechaReporte = (data: any) =>
    this.instance.post('/menu_produccion/entraRepor', data);

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
