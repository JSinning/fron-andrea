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
        <h1 class="ml-5 mb-3 title">OrdComprasSLSubDt</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">
                Id Consecutivo
              </th>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Descrip. 2</th>
              <th>Unidad</th>
              <th>Kilos</th>
              <th>Vlr Unitario</th>
              <th>Iva</th>
              <th>Subtotal</th>
              <th style="visibility: collapse; display: none">DPF</th>
              <th style="visibility: collapse; display: none">TIva</th>
              <th style="visibility: collapse; display: none">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-gray-500"
              v-for="(item, index) in tblOrdCompraSLSubDt"
              :key="index"
            >
              <td style="visibility: collapse; display: none">
                {{ item.idConcecutivo }}
              </td>
              <td>
                <select
                  class="appearance-none"
                  v-model="item.idCodigo"
                  disabled
                >
                  <option
                    v-for="(item, index) in idCodigo"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.item }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  class="appearance-none"
                  v-model="item.idCodigo"
                  disabled
                >
                  <option
                    v-for="(item, index) in idCodigo1"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.item }}
                  </option>
                </select>
              </td>
              <td>{{ item.descripcionPro }}</td>
              <td class="text-center">
                {{ convertToDecimal(item.cantidadUn) }}
              </td>
              <td class="text-center">
                {{ convertToDecimal(item.cantidad) }}
              </td>
              <td class="text-center">
                {{ convertToDecimal(item.vrUnitario) }}
              </td>
              <td class="text-center">
                {{ convertToDecimal(item.porcenIva) }}
              </td>
              <td class="text-center">
                {{ convertToDecimal(item.subtDesc) }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ item.descuPf }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ item.tIva }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ item.total }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2">Subtotal</label>
            <input type="text" class="input" v-model="subtDesc" readonly />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-4"></label>
            <input type="text" class="input" v-model="total" readonly />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-4"></label>
            <input type="text" class="input" v-model="tIva" readonly />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/reusable/Loader.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import { IOrdCompraSLSubDt } from '@/remote/api/guia_sacrificio/type';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'OrdComprasSLSubDt',
})
export default class OrdComprasSLSubDt extends Vue {
  @Prop(Number) public idConcecutivo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private subtDesc: string = '';
  private tIva: string = '';
  private total: string = '';

  private idCodigo: IInterfaceSelect[] = [];
  private idCodigo1: IInterfaceSelect[] = [];

  private tblOrdCompraSLSubDt: IOrdCompraSLSubDt[] = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.idCodigosOrdCompraSLSubDt();
    await this.tableOrdCompraSLSubDt(this.idConcecutivo);
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertToDecimal(dato: number) {
    return new Intl.NumberFormat('en-GB', {
      currency: 'EUR',
      style: 'currency',
    })
      .format(dato)
      .replace(/[€]/g, '');
  }

  private async tableOrdCompraSLSubDt(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraSLSubDt(idConsecutivo);

      this.tblOrdCompraSLSubDt = response.data.data;
      this.subtDesc = this.convertToDecimal(response.data.subtotal.subtDesc);
      this.tIva = this.convertToDecimal(response.data.subtotal.tIva);
      this.total = this.convertToDecimal(response.data.subtotal.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async idCodigosOrdCompraSLSubDt() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getIdCodigoOrdCompraSLSubDt();
      this.idCodigo = response.data.map((e: any) => {
        return {
          id: e.idCodigo,
          item: e.idCodigo,
        };
      });
      this.idCodigo1 = response.data.map((e: any) => {
        return {
          id: e.idCodigo,
          item: e.descripcionMer,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
