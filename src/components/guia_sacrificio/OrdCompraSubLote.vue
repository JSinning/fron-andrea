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
        <h1 class="ml-5 mb-3 title">OrdCompraSubLote</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">Lote No</th>
              <th style="visibility: collapse; display: none">Nit proveedor</th>
              <th>No Ani</th>
              <th>Clase</th>
              <th>Peso en pie</th>
              <th>Vlr Kilo</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-500">
              <td
                class="text-center"
                style="visibility: collapse; display: none"
              >
                {{ ordeCompraLote.loteNo }}
              </td>
              <td
                class="text-center"
                style="visibility: collapse; display: none"
              >
                {{ ordeCompraLote.nitProveedor }}
              </td>
              <td class="text-center">{{ ordeCompraLote.noAnimales }}</td>
              <td>
                <select class="appearance-none" v-model="ordeCompraLote.clase">
                  <option
                    v-for="(idClass, index) in itemClase"
                    :key="index"
                    :value="idClass.id"
                  >
                    {{ idClass.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">{{ ordeCompraLote.totalKilosP }}</td>
              <td class="text-center">{{ ordeCompraLote.vlrKilo }}</td>
              <td class="text-center">{{ total }}</td>
            </tr>
          </tbody>
        </table>
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
import * as Sentry from '@sentry/browser';
import { IOrdCompraSubLote } from '@/remote/api/guia_sacrificio/type';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'OrdCompraSubLote',
})
export default class OrdCompraSubLote extends Vue {
  @Prop(Number) public lote: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private total: string = '';
  private itemClase: IInterfaceSelect[] = [];
  private ordeCompraLote: IOrdCompraSubLote = {
    anulada: false,
    cOrdenCp: 0,
    clase: 0,
    confirma: false,
    destino: 0,
    docFlete: '',
    docum: '',
    elaboro: '',
    esCanal: false,
    estado: '',
    fecha: '',
    fechaPes: '',
    finca: '',
    horaPesaje: '',
    idConcecutiv: 0,
    imprime: 'N',
    lIca: '',
    liqPesoFinca: false,
    loteNo: 0,
    motivoAnula: '',
    motivoEstado: '',
    nDia: 0,
    nGuia: 0,
    nitProveedor: '',
    noAnimales: 0,
    observacion: '',
    pesoCanalC: 0,
    pesoPieles: 0,
    pesoProgram: 0,
    pesoPromedio: 0,
    procedencia: '',
    procesado: false,
    reteFu: '',
    sexo: 0,
    totalKilosP: 0,
    transportador: '',
    usuario: '',
    vlrFlete: 0,
    vlrKilo: 0,
    vlrKiloSug: 0,
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.ordCompraClase();
    await this.ordenCompraSubLote(this.lote);
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

  private async ordenCompraSubLote(lote: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraSubLote(lote);
      this.ordeCompraLote = response.data.data as IOrdCompraSubLote;
      this.total = this.convertToDecimal(response.data.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraClase() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdeCompraLoteClase();
      this.itemClase = response.data.map((e: any) => {
        return { id: e.idClase, item: e.descripcionCla };
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
