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

export default class MovViserasApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getDecoViscPDF = () =>
    this.instance.get('/viceras/informe_decovisc/pdf_decovisc');
  public getDecoVisc2PDF = () =>
    this.instance.get('/viceras/informe_decovisc/pdf_decovisc2');
  public getDecoVisc3PDF = () =>
    this.instance.get('/viceras/informe_decovisc/pdf_decovisc3');

  public getEtiqCanastPataPDF = (auton: number) =>
    this.instance.get(
      `/viceras/informe_etiqcanast_pata/pdf_etiqcanastpata/${auton}`,
    );
  public getEtiqCanastPata2PDF = (auton: number) =>
    this.instance.get(
      `/viceras/informe_etiqcanast_pata/pdf_etiqcanastpata2/${auton}`,
    );

  public getPesViscPDF = (idConse: number) =>
    this.instance.get(`/viceras/informe_pesvisc/pdf_pesvisc/${idConse}`);
  public getPesViscCanasPDF = (idConse: number) =>
    this.instance.get(`/viceras/informe_pesvisc/pdf_pesvisccanas/${idConse}`);

  public getStickMCan1PDF = (nGuia: number) =>
    this.instance.get(`/viceras/informe_stickm_can/pdf_stickmcan1/${nGuia}`);
  public getStickMCan2PDF = (nGuia: number) =>
    this.instance.get(`/viceras/informe_stickm_can/pdf_stickmcan2/${nGuia}`);

  public getPicViscPDF = (idConse: number) =>
    this.instance.get(`/viceras/informe_picvisc/pdf_picvisc/${idConse}`);

  public getPicViscSub2PDF = (idConse: number) =>
    this.instance.get(`/viceras/informe_picvisc/pdf_picviscsub2/${idConse}`);

  public getEtiqCanastVPDF = (data: any) =>
    this.instance.post(
      '/viceras/informe_etiqcanast_pata/pdf_etiqcanastv',
      data,
    );

  public getEtiqDesh1PDF = (data: any) =>
    this.instance.post('/viceras/informe_etiqcanast_pata/pdf_etiqdesh1', data);

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
