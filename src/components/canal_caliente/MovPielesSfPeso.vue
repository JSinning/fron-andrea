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
        <h1 class="ml-5 mb-3 title">Peso Pieles</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>N Guia</th>
              <th>N Animal</th>
              <th>Peso Guia</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              class="border-b border-gray-500"
              v-for="data in valuesMovPielesSfPeso"
              v-bind:key="data.NGuia"
            >
              <td>{{ data.NGuia }}</td>
              <td>{{ data.NAnim }}</td>
              <td>{{ data.PesoGuia }}</td>
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
  name: 'MovPielesSfPeso',
})
export default class MovPielesSfPeso extends Vue {
  private valuesMovPielesSfPeso: any = [];
  private output: string = '';

  private isError: boolean = false;

  private isLoading: boolean = false;

  private canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);

  public created() {
    this.listData();
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async listData() {
    this.isLoading = true;
    try {
      const result = await this.canalCaliente.getMovPielesSfPeso();
      this.valuesMovPielesSfPeso = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
