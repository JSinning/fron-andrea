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
            <h1 class="title">SubDespaNacGuia3</h1>
          </div>
          <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table h-48">
          <table class="table-fixed w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Guia No</th>
                <th>Lote</th>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Unidad</th>
                <th>Kilos</th>
                <th>Provedor</th>
                <th>Lic. Ica</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in tblDespaNacGuia3"
              :key="index"
            >
              <tr>
                <td>{{ item }}</td>
                <td>{{ item }}</td>
                <td>{{ item }}</td>
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
          <button class="btn-primary w-full">Exportar Csv Datos Pesaje</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import { Component, Prop, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'SubDespaNacGuia3',
})
export default class SubDespaNacGuia3Component extends Vue {
  @Prop(Number) private readonly tipoMovS: number | undefined;
  @Prop(Number) private readonly concecTipS: number | undefined;
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private tblDespaNacGuia3: any = [];

  private despaNacGuia3Api = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.searchDespaNacGuia3(this.concecTipS, this.tipoMovS);
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async searchDespaNacGuia3(concepTip: number, tipoMov: number) {
    try {
      const response = await this.despaNacGuia3Api.getDespaNacGuia3(
        concepTip,
        tipoMov,
      );
      this.tblDespaNacGuia3 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar productos');
    }
  }
}
</script>

<style scoped></style>
