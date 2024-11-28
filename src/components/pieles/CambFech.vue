<!--
  */
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 /*
 -->
<template>
  <div class="main-div">
    <!-- output -->
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex-col">
      <h1 class="title">Fecha de Proceso</h1>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Nueva Fecha Proceso:</label>
            <input type="date" class="input" v-model="fechaCam" />
          </div>
          <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
            <button class="btn-save" @click="changeDate()">Procesar</button>
            <button class="btn-delete">Salir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AvisosApi from '@/remote/api/MovPielesApi/AvisosApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  name: 'cambfechSkins',
})
export default class CambFech extends Vue {
  private auton: number;
  private fechaCam: string;
  private output: string = '';

  private isError: boolean = false;

  private CamApi = new AvisosApi(this.$store.getters.getAuthToken);

  constructor() {
    super();
    this.auton = 0;
    this.fechaCam = '';
  }

  public setAuton(auton: number) {
    this.auton = auton;
  }

  public getAuton() {
    return this.auton;
  }

  public setCambiaFecha(camfe: string) {
    this.fechaCam = camfe;
  }

  public getCambiaFecha() {
    return this.fechaCam;
  }

  private async mounted() {
    await this.liscambFecha();
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async liscambFecha() {
    try {
      const response = await this.CamApi.getCambFecha();

      if (response.data[0].estacion === this.$store.getters.getUsuario) {
        this.setAuton(response.data[0].idAuto);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async changeDate() {
    if (!this.validarCoondicion(this.getCambiaFecha())) {
      this.showOutput(true, 'Debe digitar fecha de proceso.');
      return;
    }
    try {
      const response = await this.CamApi.putCamFecha(this.getAuton(), {
        fechaProceso: moment(this.getCambiaFecha()).format('YYYY-MM-DD'),
      });
      if (response.status === 200) {
        this.showOutput(false, 'Guardado correctamente.');
        this.$store.dispatch(
          'addFechaProceso',
          moment(this.getCambiaFecha()).format('YYYY-MM-DD'),
        );
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar fecha de proceso.');
    }
  }

  private validarCoondicion(fecha: string) {
    if (fecha !== '') {
      return true;
    }
    return false;
  }
}
</script>
