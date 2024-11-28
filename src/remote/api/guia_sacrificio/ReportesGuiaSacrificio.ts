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

export default class ReportesGuiaSacrificio extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  // --- Reports
  public getGuiaSacrificoPDF = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/informes/rptguiasacrif/pdf/${nGuia}`);
  public getGuiaSacrificioTiquePesoPDF = (nGuia: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptguiasacriftiquetepeso/pdf/${nGuia}`,
    );
  public getGuiaSacrificioEtiPDF = (nGuia: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptguiasacrifeti/pdf/${nGuia}`,
    );

  public getDCControlVehPDF = (idPesaje: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptdccontrolveh/pdf/${idPesaje}`,
    );

  public getGeneraLotPDF = () =>
    this.instance.get(`/guia_sacrificio/informes/rptrendimilote/pdf`);
  public getGeneraLot2PDF = () =>
    this.instance.get(`/guia_sacrificio/informes/rptrendimilote2/pdf`);
  public getinfrecGanado2PDF = () =>
    this.instance.get(`/guia_sacrificio/informes/infrecganado2/pdf`);
  public getinfrecGanadoByLotePDF = (loteNo: number) =>
    this.instance.get(`/guia_sacrificio/informes/infrecganado/${loteNo}/pdf`);
  public getinfrecGanadoByIdConsecutuvPDF = (idConsecutiv: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/infrecganado/byId/${idConsecutiv}/pdf`,
    );

  public getinfcxprgPDF = () =>
    this.instance.get('/guia_sacrificio/informes/infcxprg/pdf');
  public getinfcxPDF = (concecuCpaLt: number) =>
    this.instance.get(`/guia_sacrificio/informes/infcxp/${concecuCpaLt}/pdf`);
  public getrptcomprocomprargPDF = () =>
    this.instance.get('/guia_sacrificio/informes/rptcomprocomprarg/pdf');
  public getrptcomprocompraPDF = (idConcecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptcomprocompra/pdf/${idConcecutivo}`,
    );
  public getrptordcomprargPDF = () =>
    this.instance.get('/guia_sacrificio/informes/rptordcomprarg/pdf');
  public getrptordcompraPDF = (idConcecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptordcompra/pdf/${idConcecutivo}`,
    );

  public getrptordcompraslPDF = (idConcecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptordcomprasl/pdf/${idConcecutivo}`,
    );
  public getrptcomprocompraslPDF = (idConcecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptcomprocomprasl/pdf/${idConcecutivo}`,
    );

  public getrptordcompraguiaPDF = (idConsecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/informes/rptordcompraguia/pdf/${idConsecutivo}`,
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
