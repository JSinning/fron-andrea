<template>
  <div class="main-div">
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex-col">
      <h1 class="title">Fecha de Proceso</h1>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Nueva Fecha Proceso:</label>
            <input type="date" class="input" v-model="fecha" />
          </div>
          <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
            <button class="btn-save" @click="changeDate()">Procesar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import { Component, Vue } from 'vue-property-decorator';

import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import moment from 'moment';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
  },
  name: 'CambfechDespa',
})
export default class CambfechDespaComponent extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private fecha: string = '';
  private auton: number;

  private despaNacApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  constructor() {
    super();
    this.auton = 0;
    this.fecha = '';
  }

  public setAuton(auton: number) {
    this.auton = auton;
  }

  public getAuton(): number {
    return this.auton;
  }

  public setCambiaFecha(camfe: string) {
    this.fecha = camfe;
  }

  public getCambiaFecha(): string {
    return this.fecha;
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
      const response = await this.despaNacApi.getCambFecha();
      for (const lisCamFe of response.data) {
        if (lisCamFe.estacion === this.$store.getters.getUsuario) {
          this.setAuton(lisCamFe.idAuto);
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async changeDate() {
    if (!this.validateCondition(this.getCambiaFecha())) {
      this.showOutput(true, 'Debe digitar fecha de proceso.');
      return;
    }
    try {
      const response = await this.despaNacApi.putCamFecha({
        fechaProceso: moment(this.getCambiaFecha()).format('YYYY-MM-DD'),
      });
      if (response.statusCode === 200) {
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

  private validateCondition(fecha: string): boolean {
    if (fecha !== '') {
      return true;
    }
    return false;
  }
}
</script>
