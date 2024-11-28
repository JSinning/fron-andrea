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
    <div class="main-div mb-2">
      <div class="card">
        <div class="card-table">
          <table class="table-auto w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>N° Guia</th>
                <th>M Canales</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in ProxiGuia"
              :key="index"
            >
              <tr class="border-b border-gray-500">
                <td>{{ item.NGuia }}</td>
                <td>{{ item.NMedia }}</td>
                <td>{{ item.Expr1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MovPileApi from '@/remote/api/MovPielesApi/MovPileApi';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  name: 'movSkinsNextEnc',
})
export default class MovPielesSigEnc extends Vue {
  private output: string = '';
  private ProxiGuia = [];

  private isError: boolean = false;

  private MovApi = new MovPileApi(this.$store.getters.getAuthToken);

  public async mounted() {
    this.proximasGuias();
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async proximasGuias() {
    try {
      const response = await this.MovApi.getMovSigte();
      this.ProxiGuia = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener proximas guias.');
    }
  }
}
</script>
