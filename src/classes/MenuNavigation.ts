/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import MenuApi from '@/remote/api/MenuApi';
import { AxiosResponse } from 'axios';

import * as Sentry from '@sentry/browser';

export default class MenuNavigation {
  private menu: MenuApi;

  constructor(menu: MenuApi) {
    this.menu = menu;
  }

  public async updatePieles(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaPieles(username);
      await this.menu.fechaPieles({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
      return true;
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateCanalCaliente(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaCanalCaliente(username);
      await this.menu.fechaCanalCaliente({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateSacrificio(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaSacrifio(username);
      await this.menu.fechaScarifico({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateVisceras(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaVisceras(username);
      await this.menu.fechaVisceras({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateDNacial(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaDNacional(username);
      await this.menu.fechaDNacional({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateGuiaSacrificio(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaGuia(username);
      await this.menu.fechaGuia({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateCuarteo(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaCuarteo(username);
      await this.menu.fechaCuarteo({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateRelacionCanales(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaRCanal(username);
      await this.menu.fechaRCanal({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateDepachoLocal(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaDLocal(username);
      await this.menu.fechaDLocal({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateDepachoCaja(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaDCaja(username);
      await this.menu.fechaDCaja({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateReparto(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaReparto(username);
      await this.menu.fechaReparto({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }

  public async updateReporte(
    username: string,
    fechaProc: string,
    idEmpre: number,
  ): Promise<boolean | AxiosResponse> {
    try {
      await this.menu.deleteFechaReporte(username);
      await this.menu.fechaReporte({
        estacion: username,
        fechaProceso: fechaProc,
        idEmpresa: idEmpre,
      });
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  }
}
