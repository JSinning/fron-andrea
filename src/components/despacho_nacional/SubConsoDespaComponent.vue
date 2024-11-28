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
            <h1 class="title">Consolidado despacho</h1>
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
                <th>Codigo</th>
                <th>Unidad</th>
                <th>kilos</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in tableSubConsoDes"
              :key="index"
            >
              <tr>
                <td>{{ item.idCodigo }}</td>
                <td>{{ item.unidaC }}</td>
                <td>{{ item.pesoC }}</td>
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
import { Component, Prop, Vue } from 'vue-property-decorator';

import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'SubConsoDespa',
})
export default class SubConsoDespaComponent extends Vue {
  @Prop(Number) private readonly tipoMovS: number | undefined;
  @Prop(Number) private readonly concecTipS: number | undefined;
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private tableSubConsoDes: any = [];

  private despaNacApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.listTableSubConso(this.tipoMovS, this.concecTipS);
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async listTableSubConso(tipoMov: number, concecTip: number) {
    try {
      const response = await this.despaNacApi.getTableSubConso(
        tipoMov,
        concecTip,
      );
      if (response.data.length === 0) {
        this.showOutput(false, 'No se encontro informacion.');
        return;
      }
      this.tableSubConsoDes = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar productos');
    }
  }
}
</script>
