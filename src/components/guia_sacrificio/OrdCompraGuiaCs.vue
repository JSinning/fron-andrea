<template>
  <div class="container mx-auto">
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Liquidacion compra de ganado</h1>
        </div>

        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ validateAnulado(ordCompraGuiaCs.anulada) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-wrap">
        <div v-if="search" class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <Select
                :isItems="customerSearch"
                v-model="id"
                :value="id"
                :usePagination="false"
                @changed="ordCompraGuiaCsID(id)"
                >Busqueda:</Select
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="search = !search">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />

      <input type="radio" name="tab" id="guias" class="hidden" />
      <input type="radio" name="tab" id="pagos" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anular"
        class="hidden"
        v-if="pgAnulada"
      />

      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos basicos
          </span>
        </label>

        <label for="guias">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Guias - Transporte
          </span>
        </label>

        <label for="pagos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Informacion pagos cheques
          </span>
        </label>

        <label for="anular">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgAnulada"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Consecutivo:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuiaCs.numeroDoc"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraGuiaCs.fechaMov"
              readonly
            />
          </div>

          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Liquida por Peso finca</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="ordCompraGuiaCs.liqPesoFinca"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. planilla pesaje:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuiaCs.docPlanillaPes"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. reses negociadas:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuiaCs.nResesNego"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Peso finca:</label>
            <input type="text" class="input" v-model="pesoPotreros" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Peso promedio</label>
            <input type="text" class="input" v-model="pesoProm" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Precio por kilo del ganado</label>
            <input type="text" class="input" v-model="precioKilo" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0 h-8">
            <label class="label">Observacion</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuiaCs.observacion"
              readonly
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-guias">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-5/6 mt-2 mb-6 md:mb-0">
            <label class="label">Liquidacion de precios</label>
          </div>
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    Id Consecutivo
                  </th>
                  <th>Guia No.</th>
                  <th>Tipo Retefuente</th>
                  <th>Precio por kilo del ganado</th>
                  <th>Valor flete</th>
                  <th>#Reses</th>
                  <th>Total Kilos</th>
                  <th>Clase</th>
                  <th>Tercero</th>
                  <th>Finca</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSub"
                  :key="index"
                >
                  <td style="visibility: collapse; display: none">
                    {{ item.idConsecutivo }}
                  </td>
                  <td class="text-center">
                    <select
                      class="appearance-none"
                      style="width: 40px"
                      v-model="item.nGuia"
                      disabled
                    >
                      <option
                        v-for="(item, index) in ordCompraSubNGuia"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    <select
                      class="appearance-none"
                      style="width: 15px"
                      v-model="item.retefApli"
                      disabled
                    >
                      <option
                        v-for="(item, index) in ordCompraSubReteApli"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.vlrKilo) }}
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.valorTrans) }}
                  </td>
                  <td class="text-center">{{ item.nAnim }}</td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.totalKilosP) }}
                  </td>
                  <td class="text-center">
                    {{ item.descripcionCla }}
                  </td>
                  <td class="text-center">{{ item.tercero }}</td>
                  <td class="text-center">
                    {{ item.descripcionFin }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex flex-row flex-wrap justify-end">
            <div class="mb-6 md:mb-0 mt-2">
              <label class="label">Datos estadisticos</label>
            </div>
          </div>
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    IdConsecutivo
                  </th>
                  <th>#Reses</th>
                  <th>Guia No.</th>
                  <th>Peso en F.S</th>
                  <th>Peso finca</th>
                  <th>Peso C. Caliente</th>
                  <th>Rend. C.Cte F.S</th>
                  <th>Rend. C.Cte Finca</th>
                  <th>Retef</th>
                  <th>Vr Kilo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSub2"
                  :key="index"
                >
                  <td style="visibility: collapse; display: none"></td>
                  <td>{{ item.nAnim }}</td>
                  <td>{{ item.nGuia }}</td>
                  <td>{{ item.totalKilosP }}</td>
                  <td>{{ item.pesoGuiaPot }}</td>
                  <td>{{ item.pesoCanal }}</td>
                  <td>{{ item.rendPotr }}</td>
                  <td>{{ item.rendPotr }}</td>
                  <td>{{ item.retefApli }}</td>
                  <td>{{ item.vlKiloRes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    IdConsecutivo
                  </th>
                  <th>Titulo</th>
                  <th>#Reses</th>
                  <th>Kilos</th>
                  <th>Prom. por Res</th>
                  <th>Porc. Merma</th>
                  <th>Merma Prom.por Animal</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSub3"
                  :key="index"
                >
                  <td style="visibility: collapse; display: none">
                    {{ item.idConsecutivo }}
                  </td>
                  <td class="text-center">{{ item.titul }}</td>
                  <td class="text-center">{{ item.nResesNego }}</td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.pesoPotreros) }}
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.pesoProm) }}
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.dif) }}
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(item.dif2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-pagos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Beneficiarios del pago</label>
          </div>
        </div>
        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th style="display: none">Id Consecutivo</th>
                <th>Guia No.</th>
                <th>Lote No.</th>
                <th>Tercero cheque</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b border-gray-500"
                v-for="(item, index) in tblOrdCompraSub5"
                :key="index"
              >
                <td style="visibility: collapse; display: none">
                  {{ item.idConsecutivo }}
                </td>
                <td class="text-center">{{ item.nGuia }}</td>
                <td class="text-center">{{ item.loteNo }}</td>
                <td class="text-center">{{ item.expr1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular px-10" v-if="pgAnulada">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Anular</label>
            <input type="checkbox" class="checkbox" v-model="anula" readonly />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-2">
            <label class="label">Motivo:</label>
            <input type="text" class="input" v-model="motivoAnul1" readonly />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-8 mt-4">
            <button class="btn-save">Anular</button>
          </div>
        </div>
      </div>

      <div class="mt-0 pt-3 px-10 flex flex-row flex-wrap">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label">Consecutivo No:</label>
          <input
            type="text"
            class="input"
            v-model="ordCompraGuiaCs.numeroDoc"
            readonly
          />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label">No. Reses Negociadas</label>
          <input
            type="text"
            class="input"
            v-model="ordCompraGuiaCs.nResesNego"
            readonly
          />
        </div>
      </div>
    </div>

    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import moment from 'moment';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import Select from '@/components/reusable/select.vue';
import {
  IOrdCompraGuia,
  IOrdCompraGuiaSub,
  IOrdCompraGuiaSub2,
  IOrdCompraGuiaSub3,
  IOrdCompraGuiaSub5,
} from '@/remote/api/guia_sacrificio/type';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import convertToDecimal from '@/utils/convertToDecimal';
@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Select,
  },
  name: 'OrdCompraGuiaCs',
})
export default class OrdCompraGuiaCs extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pgAnulada: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private search: boolean = false;
  private anula: boolean = false;
  private motivoAnul1: string = '';

  private id: number = null;
  private pesoProm: string = '';
  private pesoPotreros: string = '';
  private precioKilo: string = '';

  private customerSearch: IInterfaceSelect[] = [];
  private ordCompraSubNGuia: IInterfaceSelect[] = [];
  private ordCompraSubReteApli: IInterfaceSelect[] = [];
  private tblOrdCompraSub: IOrdCompraGuiaSub[] = [];
  private tblOrdCompraSub2: IOrdCompraGuiaSub2[] = [];
  private tblOrdCompraSub3: IOrdCompraGuiaSub3[] = [];
  private tblOrdCompraSub5: IOrdCompraGuiaSub5[] = [];
  private ordCompraGuiaCs: IOrdCompraGuia = {
    anulada: false,
    docPlanillaPes: '',
    estacion: '',
    fechaMov: '',
    fechaReg: '',
    finca: '',
    idConsecutivo: 0,
    imprim: 'N',
    liqPesoFinca: false,
    motivoAnu: '',
    nLoteUsua: '',
    nResesNego: 0,
    numeroDoc: 0,
    observacion: '',
    pesoPotreros: 0,
    pesoProm: 0,
    precioKilo: 0,
    transporProvFs: '',
    usuarioReg: '',
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.ordCompraSubNguia();
    await this.ordCompraSubRetefApli();
    await this.searchCustomer();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private validateAnulado(anulado: boolean) {
    return anulado ? 'Anulado' : '';
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertHoras(date: string) {
    return moment(date).utc().format('hh:mm:ss');
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private async rePrint() {
    if (this.ordCompraGuiaCs.imprim === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }

    await this.ordcompraguiaPdf(this.ordCompraGuiaCs.idConsecutivo);
  }

  private async ordCompraGuiaSub(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub(id);
      if (response.data === null) {
        return;
      }
      this.tblOrdCompraSub = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub2(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub2(id);
      this.tblOrdCompraSub2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub3(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub3(id);
      this.tblOrdCompraSub3 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub5(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub5(id);
      this.tblOrdCompraSub5 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchCustomer() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraGuiaCsBuscarClient();

      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.idConsecutivo,
          item: `${e.documento} - ${this.convertDate(e.fecha)} - ${
            e.lote !== null ? e.lote : ''
          } - ${e.reses} - ${e.pesoFinca} - ${e.promedio} - ${e.precioKilo}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaCsID(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaCs(id);
      this.ordCompraGuiaCs = response.data as IOrdCompraGuia;
      this.ordCompraGuiaCs.fechaMov = this.convertDate(
        this.ordCompraGuiaCs.fechaMov,
      );

      this.pesoProm = convertToDecimal(this.ordCompraGuiaCs.pesoProm);
      this.pesoPotreros = convertToDecimal(this.ordCompraGuiaCs.pesoPotreros);
      this.precioKilo = convertToDecimal(this.ordCompraGuiaCs.precioKilo);

      await this.ordCompraGuiaSub(this.ordCompraGuiaCs.idConsecutivo);
      await this.ordCompraGuiaSub2(this.ordCompraGuiaCs.idConsecutivo);
      await this.ordCompraGuiaSub3(this.ordCompraGuiaCs.idConsecutivo);
      await this.ordCompraGuiaSub5(this.ordCompraGuiaCs.idConsecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSubNguia() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSubNGuia();

      this.ordCompraSubNGuia = response.data.map((e: any) => {
        return {
          id: e.NGuia,
          item: `${e.NGuia} - ${e.NLote} - ${this.convertDate(e.FechaPes)} - ${
            e.Proveedor
          } - ${e.Reses} - ${e.Clase} - ${e.Peso}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSubRetefApli() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraGuiaSubRetefApli();

      this.ordCompraSubReteApli = response.data.map((e: any) => {
        return {
          id: e.idReteFu,
          item: `${e.idReteFu} - ${e.concepRete} - ${convertToDecimal(
            e.porRete,
          )}€`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordcompraguiaPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcompraguiaPDF(id);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
