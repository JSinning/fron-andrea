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
      class="p-0 mx-8"
      :isError="isError"
      :output="output"
      @empty="clearOutput"
    />
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th>N° Guia</th>
            <th>Codigo Individual</th>
            <th>Peso Individual</th>
            <th>Mitad</th>
            <th>Cuarto Frio</th>
            <th>Fecha</th>
            <th>Observacion</th>
            <th>Posee Rabo</th>
            <th>Exportacion</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr
            class="border-b border-gray-500"
            v-for="data in valueSubDetRelaCCanDia"
            v-bind:key="data.Auton"
          >
            <td>{{ data.NGuia }}</td>
            <td>{{ data.CodigoIndiv }}</td>
            <td>{{ data.PesoCanal }}</td>
            <td>{{ data.MitadAn }}</td>
            <td>{{ data.CuartoFr }}</td>
            <td>{{ convertDate(data.FechaMov) }}</td>
            <td>{{ data.Observac }}</td>
            <td>{{ convertBoolean(data.PoseeRab) }}</td>
            <td>{{ convertBoolean(data.Exportacion) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
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
  name: 'SubDetRelaCCanDia',
})
export default class SubDetRelaCCanDia extends Vue {
  private valueSubDetRelaCCanDia: any = [];
  private output: string = '';

  private isLoading: boolean = false;

  private canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);

  private isError: boolean = false;

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

  private convertBoolean(anticipar: boolean) {
    return anticipar ? 'Si' : 'No';
  }

  private convertDate(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async listData() {
    this.isLoading = true;
    try {
      const result = await this.canalCaliente.getSubDetRelaCCanDia();
      this.valueSubDetRelaCCanDia = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
