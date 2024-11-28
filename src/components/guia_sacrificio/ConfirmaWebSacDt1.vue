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
          <h1 class="title">Detalle Canal Caliente</h1>
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
                  <th>N°Guia</th>
                  <th>Codigo</th>
                  <th>Mitad</th>
                  <th>Peso</th>
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
                  <td>{{ item.mitadAn }}</td>
                  <td>{{ item.pesoCanal }}</td>
                  <td>{{ convertdate(item.fechaMov) }}</td>
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
        <div class="px-3 mb-6 md:mb-0 mt-2">
          <input type="number" class="input" v-model="total" readonly />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ConfirmaWebSacDt1',
})
export default class ConfirmaWebSacDt1 extends Vue {
  @Prop(Number) public nGuia: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private cantidad: number = 0;
  private total: number = 0;

  private tblDetalles: any = [];
  private tblTotales: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.confirmaWebSacD1(this.nGuia);
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
    this.total =
      Math.round((this.tblTotales.peso + Number.EPSILON) * 100) / 100;
  }

  private async confirmaWebSacD1(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConfirmaWebSacD1(nGuia);
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
