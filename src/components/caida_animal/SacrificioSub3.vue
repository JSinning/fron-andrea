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

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="flex-col min-w-full">
      <h1 class="title">Consolidado</h1>
      <div class="flex flex-row flex-wrap mb-3 justify-center">
        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Tipo</th>
                <th>Tercero</th>
                <th>NGuia</th>
                <th>NAnim</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in ListSacriSub2" :key="index">
              <tr>
                <td>{{ item.tipo }}</td>
                <td>{{ item.tercero }}</td>
                <td>{{ item.nGuia }}</td>
                <td>{{ item.noAnim }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovCaidaAniApi from '@/remote/api/MovCaidaAnimal/MovCaidaAniApi';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'frmSacrificoSub3',
})
export default class SacrificioSub2 extends Vue {
  private ListSacriSub2: any = [];

  private isError: boolean = false;
  private output: string = '';

  private isLoading: boolean = false;

  private MovCaidaApi = new MovCaidaAniApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.sacricioSub2List();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async sacricioSub2List() {
    this.isLoading = true;
    try {
      const response = await this.MovCaidaApi.getPadConsole();
      this.ListSacriSub2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
