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

    <div class="card-table">
      <table class="table">
        <thead>
          <tr class="table-tr">
            <th>NGuia</th>
            <th>Cod.Indvidual</th>
            <th>Peso Piel</th>
            <th>Fecha</th>
            <th>Observacion</th>
          </tr>
        </thead>
        <tbody class="text-center" v-for="(item, index) in movDia" :key="index">
          <tr class="border-b border-gray-500">
            <td>{{ item.NGuia }}</td>
            <td>{{ item.CodigoIndiv }}</td>
            <td>{{ item.Pesopiel }}</td>
            <td>{{ convertirFecha(item.FechaMov) }}</td>
            <td>{{ item.Observac }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import MovPileApi from '@/remote/api/MovPielesApi/MovPileApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import AlertBox from '@/components/reusable/AlertBox.vue';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'SubDetRealSkinsDay',
})
export default class MovPielesUno extends Vue {
  private isError: boolean = false;
  private output: string = '';
  private movDia: any = [];

  private isLoading: boolean = false;

  private MovApi = new MovPileApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.movimientosDia();
  }

  private convertirFecha(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async movimientosDia() {
    try {
      this.isLoading = true;
      const response = await this.MovApi.getMovDia();
      this.movDia = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.isLoading = false;
      this.showOutput(true, 'Error al obtener movimiento del dia.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
