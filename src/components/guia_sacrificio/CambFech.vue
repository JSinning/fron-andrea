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
  <div>
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="main-div">
      <div class="flex-col">
        <h1 class="title">Fecha de Proceso</h1>
        <div class="card">
          <div class="flex flex-row flex-wrap">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Nueva Fecha Proceso:</label>
              <input type="date" v-model="dateChanged" class="input" />
            </div>
            <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
              <button class="btn-save" @click="changeDate()">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import { Component, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
  },
  name: 'CambFech',
})
export default class CambFech extends Vue {
  private auton: number;
  private dateChanged: string = '';
  private output: string = '';
  private isError: boolean = false;

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  constructor() {
    super();
    this.auton = 0;
    this.dateChanged = '';
  }

  public setAuton(auton: number) {
    this.auton = auton;
  }

  public getAuton() {
    return this.auton;
  }

  public setChangeDate(camfe: string) {
    this.dateChanged = camfe;
  }

  public getChangeDate() {
    return this.dateChanged;
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
      const response = await this.guiaSacrificioApi.getChangeDate();

      for (const listDate of response.data) {
        if (listDate.estacion === this.$store.getters.getUsuario) {
          this.setAuton(listDate.idAuto);
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async changeDate() {
    try {
      const response = await this.guiaSacrificioApi.putChangeDate({
        fechaProceso: this.getChangeDate(),
      });
      if (response.statusCode === 200) {
        this.$store.dispatch(
          'addFechaProceso',
          moment(this.getChangeDate()).format('YYYY-MM-DD'),
        );
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>
