<template>
  <div>
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="card-table">
        <h1 class="ml-5 mb-3 title">FacBursag</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Proveedor</th>
              <th>Cedula</th>
              <th>Fecha compra</th>
              <th>Factura</th>
              <th>Ciudad</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Valor kg</th>
              <th>Valor total</th>
            </tr>
          </thead>
          <tbody
            class="text-center"
            v-for="(item, index) in tblFacBurga"
            :key="index"
          >
            <tr class="border-b border-gray-500">
              <td>{{ item.tercero }}</td>
              <td>{{ item.cedula }}</td>
              <td>{{ item.fechaCompra }}</td>
              <td>{{ item.factura }}</td>
              <td>{{ item.ciudad }}</td>
              <td>{{ item.noAnimales }} {{ item.descripcionCla }}</td>
              <td>{{ item.kilos }}</td>
              <td>{{ item.precio }}</td>
              <td>{{ item.valorTotal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'FacBursag',
})
export default class FacBursag extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private tblFacBurga: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.facBursag();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async facBursag() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getFacBursag();
      this.tblFacBurga = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
