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
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex-col min-w-full">
      <h1 class="title">Fecha de proceso</h1>
      <div class="flex flex-wrap mx-auto justify-center p-2">
        <div class="card mt-2">
          <div class="flex flex-wrap justify-center p-1 w-3/2">
            <label class="label">Nueva fecha de proceso:</label>
            <input type="date" v-model="fechaCam" class="input" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col flex-wrap mx-auto text-sm md:text-base text-white"
    >
      <button class="flex-row">
        <button @click="changeDate()" class="btn-save">Procesar</button>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import AvisosApi from '@/remote/api/MovPielesApi/AvisosApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  name: 'CamFechaCaidaAni',
})
export default class CambFech extends Vue {
  private CamApi = new AvisosApi(this.$store.getters.getAuthToken);
  private auton: number;
  private fechaCam: string;
  private isError: boolean = false;
  private output: string = '';

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
    await this.listChangeDate();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async listChangeDate() {
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
    if (!this.validateCondition(this.getCambiaFecha())) {
      alert('Debe Digitar Fecha Proceso');
      return;
    }
    try {
      const response = await this.CamApi.putCamFecha(this.getAuton(), {
        fechaProceso: moment(this.getCambiaFecha()).format('YYYY-MM-DD'),
      });
      if (response.status === 200) {
        alert('Guardado corectamente');
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar fecha de proceso.');
    }
  }

  private validateCondition(fecha: string) {
    if (fecha !== '') {
      return true;
    }
    return false;
  }
}
</script>
