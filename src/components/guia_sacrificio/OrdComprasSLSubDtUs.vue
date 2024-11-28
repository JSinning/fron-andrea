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
        <h1 class="ml-5 mb-3 title">OrdComprasSLSubDtUs</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">
                Id Consecutivo
              </th>
              <th>Codigo</th>
              <th>Descripcion</th>
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
              v-for="(item, index) in tblOrdCompraSLSubDtUs"
              :key="index"
            >
              <td style="visibility: collapse; display: none">
                {{ item.idConcecutivo }}
              </td>
              <td>
                <select
                  class="appearance-none"
                  v-model="item.idConcecutivo"
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
                <select class="appearance-none" v-model="item.idCodigo">
                  <option
                    v-for="(item, index) in idCodigo1"
                    disabled
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">{{ item.cantidadUn }}</td>
              <td class="text-center">
                {{ $convertToDecimal(item.cantidad) }}
              </td>
              <td class="text-center">
                {{ $convertToDecimal(item.vrUnitario) }}
              </td>
              <td class="text-center">
                {{ $convertToDecimal(item.porcenIva) }}
              </td>
              <td class="text-center">
                {{ $convertToDecimal(item.subtDesc) }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ $convertToDecimal(item.descuPf) }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ $convertToDecimal(item.tIva) }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ $convertToDecimal(item.total) }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2">Subtotal</label>
            <input type="text" class="input" v-model="subtDescUs" readonly />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-4"></label>
            <input type="text" class="input" v-model="totalUs" readonly />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IOrdCompraSLSubDtUs } from '@/remote/api/guia_sacrificio/type/ordCompraSLSubDtUs';
import * as Sentry from '@sentry/browser';
import convertToDecimal from '@/utils/convertToDecimal';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'OrdComprasSLSubDtUs',
})
export default class OrdComprasSLSubDtUs extends Vue {
  @Prop(Number) public idConcecutivo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private subtDescUs: string = '';
  private totalUs: string = '';

  private idCodigo: IInterfaceSelect[] = [];
  private idCodigo1: IInterfaceSelect[] = [];
  private tblOrdCompraSLSubDtUs: IOrdCompraSLSubDtUs[] = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.idCodigosOrdCompraSLSubDtUs();
    await this.tableOrdCompraSLSubDtUs(this.idConcecutivo);
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async tableOrdCompraSLSubDtUs(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraSLSubDtUs(idConsecutivo);

      this.tblOrdCompraSLSubDtUs = response.data.data;
      this.subtDescUs = convertToDecimal(response.data.subtotal.subtDesc);
      this.totalUs = convertToDecimal(response.data.subtotal.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async idCodigosOrdCompraSLSubDtUs() {
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
