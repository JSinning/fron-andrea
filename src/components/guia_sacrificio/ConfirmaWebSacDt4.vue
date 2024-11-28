<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">Detalle Decomisos</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <div class="overflow-x-hidden">
            <table class="table-fixed w-full text-sm" id="tableA">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>#Guia</th>
                  <th>Codigo</th>
                  <th>Producto</th>
                  <th>Unid</th>
                  <th>Causal</th>
                  <th>Dictamen</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                </tr>
              </thead>
              <tbody
                class="text-center"
                v-for="(item, index) in tblDetalles"
                :key="index"
              >
                <tr>
                  <td>{{ item.nGuia }}</td>
                  <td>{{ item.codigoIndiv }}</td>
                  <td>{{ item.codProduc }}</td>
                  <td>{{ item.cantiProd }}</td>
                  <td>{{ item.descripCau }}</td>
                  <td>{{ item.descripDic }}</td>
                  <td>{{ convertdate(item.fechaProc) }}</td>
                  <td>{{ convertHours(item.fechaMov) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="mb-6 md:mb-0 mt-2">
          <label class="label"> Totales ...</label>
        </div>
        <div class="px-3 mb-6 md:mb-0 mt-2">
          <input type="number" class="input" v-model="cantidad" readonly />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ConfirmaWebSacDt4',
})
export default class ConfirmaWebSacDt4 extends Vue {
  @Prop(Number) public nGuia: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private cantidad: number = 0;

  private tblDetalles: any = [];
  private tblTotales: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.confirmaWebSacD4(this.nGuia);
    this.datainfo();
  }

  private convertdate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertHours(data: string) {
    return moment(data).utc().utc().format('HH:MM:SS');
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private datainfo() {
    this.cantidad = this.tblTotales.cant;
  }

  private async confirmaWebSacD4(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConfirmaWebSacD4(nGuia);
      this.tblDetalles = response.data.details;
      this.tblTotales = response.data.total;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
