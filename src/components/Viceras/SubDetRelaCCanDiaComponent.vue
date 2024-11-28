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
    <div class="card-table">
      <table class="table-auto w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th>NGuia</th>
            <th>Codigo Individual</th>
            <th>Peso Viscera</th>
            <th>Observacion</th>
            <th>Tiene Decomiso</th>
            <th>Anulada</th>
          </tr>
        </thead>
        <tbody
          class="text-center"
          v-for="(item, index) in MoviemientosDia"
          :key="index"
        >
          <tr class="border-b border-gray-500">
            <th>{{ item.nGuia }}</th>
            <th>{{ item.codigoIndiv }}</th>
            <th>{{ item.pesoViscera }}</th>
            <th>{{ item.observac }}</th>
            <th>{{ item.tieneDecom }}</th>
            <th>{{ item.anulado }}</th>
          </tr>
        </tbody>
      </table>
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
  name: 'SubDetCal',
})
export default class SubDetRelaCCanDiaComponent extends Vue {
  private output = '';
  private isError: boolean = false;

  private MoviemientosDia: any = [];

  private SubDetApi = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.movimientosDia();
  }

  private async movimientosDia() {
    try {
      const response = await this.SubDetApi.getMovDia();
      this.MoviemientosDia = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>

<style scoped></style>
