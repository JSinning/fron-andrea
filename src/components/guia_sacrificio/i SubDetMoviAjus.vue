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
        <h1 class="ml-5 mb-3 title">i SubDetMoviAjus</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">Lote No.</th>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Kilo</th>
              <th>Unidad</th>
              <th>Vlr Unitario</th>
              <th>IVA</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in iSubDetMoviAjus" :key="index">
            <tr class="border-b border-gray-500">
              <td style="visibility: collapse; display: none"></td>
              <td class="text-center">
                <select class="select" v-model="item.idCodigo">
                  <option
                    v-for="(idCodigo, index) in itemCodigo1"
                    :key="index"
                    :value="idCodigo.id"
                  >
                    {{ idCodigo.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">
                <select class="select" v-model="item.idCodigo2">
                  <option
                    v-for="(idCodigo1, index) in itemCodigo1"
                    :key="index"
                    :value="idCodigo1.id"
                  >
                    {{ idCodigo1.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">{{ item.cantidad }}</td>
              <td class="text-center">{{ item.cantidadUn }}</td>
              <td class="text-center">{{ item.vrUnitario }}</td>
              <td class="text-center">{{ item.porcenIva }}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input type="number" class="input" v-model="cantidad" />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input type="number" class="input" v-model="total" />
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
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { ISubDetMoviAjustes } from '@/remote/api/guia_sacrificio/type';
@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ISubDetMoviAjus',
})
export default class ISubDetMoviAjus extends Vue {
  @Prop(Number) public idConsecutivo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private cantidad: number = 0;
  private total: string = '';

  private iSubDetMoviAjus: ISubDetMoviAjustes[] = [];
  private itemCodigo1: IInterfaceSelect[] = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.iSubDetMoviAjuste(this.idConsecutivo);
    await this.iSubDetMoviAjusIdCodigo1();
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

  private async iSubDetMoviAjuste(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getSubDetMoviajus(idConsecutivo);

      this.iSubDetMoviAjus = response.data.data;
      this.cantidad = response.data.sub.cantidad;
      this.total = this.convertToDecimal(response.data.sub.totalCantidad);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async iSubDetMoviAjusIdCodigo1() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getSubDetMoviajusIdCodigo1();
      this.itemCodigo1 = response.data.map((e: any) => {
        return { id: e.idCodigo, item: e.descripcionMer };
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
