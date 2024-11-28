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
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <!-- table -->
    <div class="flex flex-row flex-wrap mb-3">
      <div class="md:w-1/2 card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Kilos</th>
              <th>Canastilla</th>
              <th>#Empaq</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="md:w-1/2 card-table">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Kilos Productos:</label>
            <input type="text" class="input" />
            <div class="mt-4"></div>
            <label class="label">Canastilla No:</label>
            <input type="text" class="input" />
            <div class="mt-1"></div>
            <label class="label">Producto Emp No:</label>
            <input type="text" class="input" />
            <div class="mt-1"></div>
            <label class="label">Faltan:</label>
            <input type="text" class="input" />
            <div class="mt-1"></div>
            <label class="label">Kilos Canstilla:</label>
            <input type="text" class="input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
  },
  name: 'PesadoDet2Enc',

  props: {
    automNum: Number,
    codigoP: String,
    idConcecutivo: Number,
  },
})
export default class PesadoViscDet2EncCsComponent extends Vue {
  private output = '';
  private isError: boolean = false;

  private SubCarne: string = '';
  private suma: number = 0;
  private Pesos1: any = [];

  private tablaPesadoDet2: any = [];

  private PesadoDet2Api = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.pesodDet2(
      this.$props.idConcecutivo,
      this.$props.codigoP,
      this.$props.automNum,
    );
  }

  private coneverfecha(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async pesodDet2(
    idConcecutivo: number,
    codigoP: string,
    autoNum: number,
  ) {
    try {
      const response = await this.PesadoDet2Api.getPesadoVisDet2(
        idConcecutivo,
        codigoP,
        autoNum,
      );
      this.tablaPesadoDet2 = response.data;

      for (const i of response.data) {
        this.Pesos1.push(i.Peso1);
      }

      this.Pesos1.forEach((sum: number) => {
        this.suma += sum;
      });

      this.SubCarne = this.suma.toFixed(3);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>

<style scoped></style>
