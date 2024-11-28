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
    <AlertBox
      :output="output"
      :isError="isError"
      @empty="clearOutput"
      class="mx-8"
    />
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="card-table">
        <h1 class="ml-5 mb-3 title">Canales en Cuartos Frios</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Cuarto Frio</th>
              <th>N Medida</th>
              <th>Peso Guia</th>
              <th>Capacidad Canal</th>
              <th>Faltan</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              class="border-b border-gray-500"
              v-for="data in valuesMovSfCFrioEnc"
              v-bind:key="data.CuartoFr"
            >
              <td>{{ data.CuartoFr }}</td>
              <td>{{ data.NMedi }}</td>
              <td>{{ data.PesoGuia }}</td>
              <td>{{ data.CapacidCnal }}</td>
              <td>{{ data.Faltan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AlertBox from '@/components/reusable/AlertBox.vue';
import CanalCaliente from '@/remote/api/CanalCaliente';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'MovSfCFrioEnc',
})
export default class MovSfCFrioEnc extends Vue {
  private valuesMovSfCFrioEnc: any = [];
  private output: string = '';

  private isError: boolean = false;

  private isLoading: boolean = false;

  private canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);

  public created() {
    this.listData();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async listData() {
    this.isLoading = true;
    try {
      const result = await this.canalCaliente.getMovCanalCalienSfCFrio();
      this.valuesMovSfCFrioEnc = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
