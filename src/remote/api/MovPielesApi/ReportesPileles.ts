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

  public getPesoPiles = () =>
    this.instance.get('/movpieles/informes/peso_piel');
  public getPesoPilesSub = () =>
    this.instance.get('/movpieles/informes/peso_piel_sub');
  public getSticPiel = () =>
    this.instance.get('/movpieles/informes/stic_pieles');
  public getSticPielAuton = (Auton: number) =>
    this.instance.get(`/movpieles/informes/stic_pieles/${Auton}`);
  public getSticPielPie = () =>
    this.instance.get('/movpieles/informes/stic_pieles_pie');

  public getPesoPielesPDF = () =>
    this.instance.get('/movpieles/informes/pdf_peso_piel');
  public getSticPielPDF = (auton: number) =>
    this.instance.get(`/movpieles/informes/pdf_stic_piel/${auton}`);
  public getSticPielMdPDF = (auton: number) =>
    this.instance.get(`/movpieles/informes/pdf_stic_piel_md/${auton}`);
  public getSticPielPiePDF = () =>
    this.instance.get(`/movpieles/informes/pdf_stic_piel_pie/`);

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
