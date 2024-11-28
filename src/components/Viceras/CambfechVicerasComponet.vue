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
    <div class="flex-col">
      <h1 class="title">Fecha de Proceso</h1>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Nueva Fecha Proceso:</label>
            <input type="date" class="input" v-model="fecha" />
          </div>
          <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
            <button class="btn-save">Procesar</button>
            <button class="btn-save" @click="updateDate()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
  },
  name: 'CambfechViceras',
})
export default class CambfechVicerasComponet extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private fecha: string = '';

  private CambFechApi = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async updateDate() {
    if (this.fecha === '') {
      this.showOutput(true, 'Por favor introduzca una fecha para continuar.');
      return;
    }
    try {
      const result = await this.CambFechApi.putCamFecha({
        estacion: this.$store.getters.getUsuario,
        fechaProceso: this.fecha,
      });
      this.showOutput(false, result.message);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar fecha de proceso.');
    }
  }
}
</script>

<style scoped></style>
