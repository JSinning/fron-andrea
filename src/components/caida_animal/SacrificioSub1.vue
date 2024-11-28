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
      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <table class="table-auto w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>N°Guia</th>
                <th>Animal</th>
                <th>Fecha</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in ListSacriOne" :key="index">
              <tr>
                <td>{{ item.nGuia }}</td>
                <td>{{ item.codigoIndiv }}</td>
                <td>{{ convertirFecha(item.fechaMov) }}</td>
                <td>{{ item.pesoP }}</td>
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
  private ListSacriOne: any = [];
  private NGhia: number = 0;
  private Animal: number = 0;
  private isError: boolean = false;
  private output: string = '';

  private isLoading: boolean = false;

  private MovCaidaApi = new MovCaidaAniApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.listData();
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
      const SacrificeOne = await this.MovCaidaApi.gettSacridio1();
      this.ListSacriOne = SacrificeOne.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
