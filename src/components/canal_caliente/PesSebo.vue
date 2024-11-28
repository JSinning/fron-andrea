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
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="card">
        <div class="card-table">
          <table class="table-auto w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>N° Guia</th>
                <th>Codigo Individual</th>
                <th>Peso Sebo</th>
                <th>Fecha Seb</th>
                <th>Actualiza Seb</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr
                class="border-b border-gray-500"
                v-for="data in valuesPesSebo"
                v-bind:key="data.Auton"
              >
                <td>{{ data.NGuia }}</td>
                <td>{{ data.CodigoIndiv }}</td>
                <td>{{ data.PesoSeb }}</td>
                <td>{{ data.FechaSeb }}</td>
                <td>{{ convertBoolean(data.ActualizaSeb) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
  name: 'PesSebo',
})
export default class PesSebo extends Vue {
  private valuesPesSebo: any = [];
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

  private convertBoolean(anticipar: boolean) {
    return anticipar ? 'Si' : 'No';
  }

  private clearOutput() {
    this.output = '';
  }

  private async listData() {
    this.isLoading = true;
    try {
      const result = await this.canalCaliente.getPesSebo();
      if (result.statusCode !== 200) {
        this.showOutput(true, 'Error al cargar los datos correctamente.');
      } else if (result.NGuia === 0 && result.ActualizaSeb === false) {
        this.valuesPesSebo = result.data;
      } else {
        this.showOutput(false, 'No hay registros para mostrar.');
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
