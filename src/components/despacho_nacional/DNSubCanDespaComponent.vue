<template>
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div">
      <div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
            <h1 class="title">DNSubCan</h1>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="card-table h-48">
            <table class="table-fixed w-full text-xs" id="tablaC">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Unidades</th>
                  <th>Kilos</th>
                </tr>
              </thead>
              <tbody
                class="text-center"
                v-for="(item, index) in tblSubCan"
                :key="index"
              >
                <tr>
                  <td>{{ item }}</td>
                  <td>{{ item }}</td>
                  <td>{{ item }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-3 -mt-4">
          <div class="md:w-full">
            <button class="btn-primary w-full">
              Exportar Csv Datos Pesaje
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'DNSubCanDespa',
})
export default class DNSubCanDespaComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private tblSubCan: any = [];

  private despaNacDNSubCanApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.searchSubCan();
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async searchSubCan() {
    try {
      const response = await this.despaNacDNSubCanApi.getSubCan();
      this.tblSubCan = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al Cargar DNSubCan');
    }
  }
}
</script>

<style scoped></style>
