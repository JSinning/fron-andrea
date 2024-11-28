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
              <input type="date" v-model="fecha" class="input" />
            </div>
            <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
              <button @click="updateDate()" class="btn-save">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import CanalCaliente from '@/remote/api/CanalCaliente';

import * as Sentry from '@sentry/browser';

@Component({
  name: 'CambFech',
})
export default class CambFech extends Vue {
  private output: string = '';
  private fecha: string = '';
  private isError: boolean = false;

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async updateDate() {
    const canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);

    if (this.fecha === '') {
      this.showOutput(true, 'Por favor introduzca una fecha para continuar.');
      return;
    }
    try {
      const result = await canalCaliente.putCambFech({
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
