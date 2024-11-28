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
        <h1 class="ml-5 mb-3 title">OrdCompraSubDt</h1>
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
            </tr>
          </thead>
          <tbody v-for="(item, index) in ordenCompra" :key="index">
            <tr class="border-b border-gray-500">
              <td style="visibility: collapse; display: none">
                {{ item.idConcecutivo }}
              </td>
              <td class="text-center">
                <select class="appearance-none" v-model="item.idCodigo">
                  <option
                    v-for="(idCodigo, index) in itemCodigo"
                    :key="index"
                    :value="idCodigo.id"
                  >
                    {{ idCodigo.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">
                <select class="appearance-none" v-model="item.idCodigo">
                  <option
                    v-for="(idCodigo, index) in itemDescrip"
                    :key="index"
                    :value="idCodigo.id"
                  >
                    {{ idCodigo.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">{{ item.cantidadUn }}</td>
              <td class="text-center">{{ item.cantidad }}</td>
              <td class="text-center">{{ item.vrUnitario }}</td>
              <td class="text-center">{{ item.porcenIva }}</td>
              <td class="text-center">{{ item.subtDesc }}</td>
              <td style="visibility: collapse; display: none">
                {{ item.descuPf }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2">Subtotal</label>
            <input
              type="text"
              class="input"
              v-model="subTotal"
              :readonly="true"
            />
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
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IOrdCompraSubDt } from '@/remote/api/guia_sacrificio/type';
@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'OrdCompraSubDt',
})
export default class OrdCompraSubDt extends Vue {
  @Prop(Number) public idCosecutivo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private subTotal: string = '';

  private ordenCompra: IOrdCompraSubDt[] = [];
  private itemCodigo: IInterfaceSelect[] = [];
  private itemDescrip: IInterfaceSelect[] = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.ordenCompraSubDt(this.idCosecutivo);
    await this.OrdCompraSubdtIdCodigo();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertToDecimal(dato: number) {
    return Number(Math.round((dato + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  private async ordenCompraSubDt(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdcomprasubdtID(idConsecutivo);
      this.ordenCompra = response.data.data;
      this.subTotal = this.convertToDecimal(response.data.subtotal);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async OrdCompraSubdtIdCodigo() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraSubdtIdCodigo();
      this.itemCodigo = response.data.map((e: any) => {
        return { id: e.IdCodigo, item: e.IdCodigo };
      });
      this.itemDescrip = response.data.map((e: any) => {
        return { id: e.IdCodigo, item: e.DescripciónMer };
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
