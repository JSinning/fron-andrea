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

export default class CanalCaliente extends HttpClient {
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

  // Avisos
  public getAvisos = () => this.instance.get('/canalcaliente/avisos');
  public getByIdAvisos = (codAviso: number) =>
    this.instance.get(`/canalcaliente/avisos/${codAviso}`);
  public postAvisos = (data: any) =>
    this.instance.post('/canalcaliente/avisos/', data);
  public putAvisos = (codAviso: number, data: any) =>
    this.instance.put(`/canalcaliente/avisos/${codAviso}`, data);
  public deleteAvisos = (codAviso: number) =>
    this.instance.delete(`/canalcaliente/avisos/${codAviso}`);

  // Cambiar Fecha
  public putCambFech = (data: any) =>
    this.instance.put('/canalcaliente/cambfech', data);

  // MovCanalCaliente
  public getMovPielesSfSgte = () =>
    this.instance.get('/canalcaliente/formulario/getMovCanalCalienSfSiguien');
  public getMovCanalCalienSf = () =>
    this.instance.get('/canalcaliente/formulario/getMovCanalCalienSf');
  public getMovCanalCalienSfPeso = () =>
    this.instance.get('/canalcaliente/formulario/getMovCanalCalienSfPeso');
  public getByNGuia = (nguia: number) =>
    this.instance.get(`/canalcaliente/formulario/getByNGuia/${nguia}`);
  public getNombreByNGuia = (nguia: number) =>
    this.instance.get(`/canalcaliente/formulario/nombreByNGuia/${nguia}`);
  public getbyidAuto = (auton: number) =>
    this.instance.get(`/canalcaliente/mov_canal_caliente/${auton}`);
  public putMov = (auton: number, data: any) =>
    this.instance.put(`/canalcaliente/mov_canal_caliente/${auton}`, data);
  public getByCategoria = (categoria: number) =>
    this.instance.get(`/canalcaliente/formulario/getByCategoria/${categoria}`);
  public getfriSacriOrdia = () =>
    this.instance.get('/canalcaliente/mov_canal_caliente/mov/entraCCa');

  // PesSebo
  public getPesSebo = () =>
    this.instance.get('/canalcaliente/formulario/getPesSebo');

  // MovPielesSfPeso
  public getMovPielesSfPeso = () =>
    this.instance.get('/canalcaliente/formulario/getMovPielesSfPeso');

  // MovCanalCalienSfCFrio
  public getMovCanalCalienSfCFrio = () =>
    this.instance.get('/canalcaliente/formulario/getMovCanalCalienSfCFrio');

  // MovCanalCaluno
  public getMovCanalCaluno = (auton: number) =>
    this.instance.get(`/canalcaliente/formulario/getMovCanalCaluno/${auton}`);
  public getCuartosFrios = () =>
    this.instance.get('/canalcaliente/formulario/getCuartoFrio');

  // SubDetRelaCCaDia
  public getSubDetRelaCCanDia = () =>
    this.instance.get('/canalcaliente/formulario/getSubDetRelaCCanDia');

  // Menu
  public getMenu1 = () => this.instance.get('/canalcaliente/menu/getTMenu1/');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/canalcaliente/menu/getTMenu2/${tipo}`);
  public getCofigurSacr = () =>
    this.instance.get('/canalcaliente/menu/cofigurSacr/');
  public putgetCofigSacr1 = (data: any) =>
    this.instance.put('/canalcaliente/menu/putConfigurSacr', data);

  // Formulario
  public minAuton = () =>
    this.instance.get('/canalcaliente/formulario/getByMinAuton');
  public comenzarProceso = (auton: number) =>
    this.instance.get(`/canalcaliente/formulario/getSacrificioDet2/${auton}`);

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
