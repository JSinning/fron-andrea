<template>
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addGenOC">
            Adicionar registro
          </button>
        </div>
      </div>

      <div class="card-table">
        <table class="table-auto w-full text-base">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Lote No</th>
              <th>Guia No</th>
              <th>Valor Kl</th>
              <th>Retef</th>
              <th style="visibility: collapse; display: none">N. Dias</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-gray-500"
              v-for="(GenOC, index) in tableGenOC"
              :key="index"
              @click="selectTable(GenOC)"
            >
              <td>
                <select
                  class="select"
                  v-model="GenOC.lotes"
                  @change="afterLoteUpdate(GenOC.lotes, GenOC.valorKl)"
                >
                  <option
                    v-for="(item, index) in itemLote"
                    :key="index"
                    :value="item"
                  >
                    {{ item.Lote }} - {{ item.Guia }} - {{ item.Tercero }} -
                    {{ convertDate(item.FechaPes) }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="GenOC.guiaNo"
                  readonly
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="GenOC.valorKl"
                  @change="updateGenOC(nolote, GenOC.valorKl)"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="GenOC.retef"
                  readonly
                />
              </td>
              <td style="visibility: collapse; display: none">
                <input
                  type="text"
                  class="input"
                  v-model="GenOC.nDias"
                  readonly
                />
              </td>
            </tr>
            <tr class="border-b border-gray-500">
              <td>
                <select
                  class="select"
                  v-model="loteNo"
                  @change="afterLoteCreate(loteNo)"
                >
                  <option
                    v-for="(item, index) in itemLote"
                    :key="index"
                    :value="item"
                  >
                    {{ item.Lote }} - {{ item.Guia }} - {{ item.Tercero }} -
                    {{ convertDate(item.FechaPes) }},
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="createGenOC.guiaNo"
                  readonly
                />
              </td>
              <td><input type="text" class="input" v-model="valorKl" /></td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="createGenOC.retef"
                  readonly
                />
              </td>
              <td style="visibility: collapse; display: none">
                <input
                  type="text"
                  class="input"
                  v-model="createGenOC.nDias"
                  readonly
                />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card mt-0 pt-3 px-10 mt-4">
        <div class="flex flex-row flex-wrap grid grid-cols-3">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Tercero</label>
            <input
              type="text"
              class="input"
              v-model="IGenOCSub.terceG"
              readonly
            />
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha</label>
            <input
              type="date"
              class="input"
              v-model="IGenOCSub.fechaPes"
              readonly
            />
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <label class="label">No. animales</label>
            <input
              type="text"
              class="input"
              v-model="IGenOCSub.nAnimG"
              readonly
            />
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Peso en pie</label>
            <input type="text" class="input" v-model="totalKilosP" readonly />
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Peso canal</label>
            <input type="text" class="input" v-model="pesoCanal" readonly />
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <label class="label">% rendimiento</label>
            <input type="text" class="input" v-model="rendGuia" readonly />
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-center">
        <div class="mb-6 md:mb-0 mt-2 mr-4">
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:btn-save': readonlyGenera,
            }"
            :disabled="readonlyGenera"
            @click="viewModalGen"
          >
            Generar
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button
            class="btn-save"
            ref="imprimeRef"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:btn-save': readonlyPrint,
            }"
            :disabled="readonlyPrint"
            @click="print"
          >
            Reimprimir informes
          </button>
        </div>
      </div>

      <!-- Modal print definitivo -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalGen"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >&#x1f6c8; Genera las Ordenes de Compra?</strong
              >
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="acceptModalGen()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalGen()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Print Definitivo -->
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
      <ModalPDFPreview
        :pdfData="pdfData2"
        @close="closeModal2PDF"
        v-if="showModal2PDF"
      />
      <ModalPDFPreview
        :pdfData="pdfData3"
        @close="closeModal3PDF"
        v-if="showModal3PDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment';
import { IGenOC, IGenOCSub } from '@/remote/api/guia_sacrificio/type';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
  },
  name: 'GenOC',
})
export default class GenOC extends Vue {
  @Ref('imprimeRef') public readonly imprimeRef: HTMLButtonElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private modalGen: boolean = false;
  private readonlyPrint: boolean = true;
  private readonlyGenera: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private pdfData3: string = '';
  private showModalPDF: boolean = false;
  private showModal2PDF: boolean = false;
  private showModal3PDF: boolean = false;

  private nolote: number = 0;
  private totalKilosP: string = '0.0';
  private rendGuia: string = '0.0';
  private pesoCanal: string = '0.0';
  private valorKl: string = '0.0';

  private loteNo: any[] = [];
  private itemLote: any[] = [];
  private tableGenOC: any[] = [];
  private IGenOCSub: IGenOCSub = {
    fechaPes: '',
    nAnimG: 0,
    nGuia: 0,
    nLote: 0,
    pesoCanal: 0,
    rendGuia: 0,
    terceG: '',
    totalKilosP: 0,
  };
  private createGenOC: IGenOC = {
    guiaNo: 0,
    loteNo: 0,
    nDias: 0,
    retef: '',
    usuarioG: '',
    valorKl: 0,
  };
  private upDataGenOC: IGenOC = {
    guiaNo: 0,
    loteNo: 0,
    nDias: 0,
    retef: '',
    usuarioG: '',
    valorKl: 0,
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.openForm();
    await this.genOcLote();
    await this.genOC();
  }

  private closeModalGen() {
    this.modalGen = false;
  }

  private viewModalGen() {
    this.modalGen = true;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertToDecimal(dato: number) {
    return new Intl.NumberFormat('en-GB', {
      currency: 'EUR',
      style: 'currency',
    })
      .format(dato)
      .replace(/[€]/g, '');
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private closeModal2PDF() {
    this.showModal2PDF = false;
  }

  private closeModal3PDF() {
    this.showModal3PDF = false;
  }

  private async print() {
    await this.infcxprgPdf();
    await this.comprocomprargPdf();
    await this.ordcomprargPdf();
  }

  private async afterLoteCreate(item: any) {
    this.createGenOC.loteNo = item.Lote;
    this.createGenOC.guiaNo = item.Guia;
    this.createGenOC.retef = item.ReteFu;

    if (item.NDias !== 0) {
      this.createGenOC.nDias = item.PlazoPactado;
    }
    this.createGenOC.nDias = item.NDia;
  }

  private async afterLoteUpdate(item: any, valorKl: string) {
    this.upDataGenOC.loteNo = item.Lote;
    this.upDataGenOC.guiaNo = item.Guia;
    this.upDataGenOC.retef = item.ReteFu;

    if (item.NDias !== 0) {
      this.upDataGenOC.nDias = item.PlazoPactado;
    }
    this.upDataGenOC.nDias = item.NDia;

    await this.updateGenOC(this.nolote, valorKl);
  }

  private async openForm() {
    await this.onLoad();
  }

  private async acceptModalGen() {
    await this.genera();
    this.closeModalGen();
    await this.infcxprgPdf();
    await this.comprocomprargPdf();
    await this.ordcomprargPdf();
  }

  private async updateGenOC(loteNo: number, valorKl: string) {
    this.upDataGenOC.valorKl = Number.parseFloat(valorKl.replace(',', ''));
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putGenOC(
        loteNo,
        this.upDataGenOC,
      );
      this.tableGenOC = [];
      await this.genOC();
      this.upDataGenOC = {
        guiaNo: 0,
        loteNo: 0,
        nDias: 0,
        retef: '',
        usuarioG: '',
        valorKl: 0,
      };
      this.nolote = 0;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addGenOC() {
    this.createGenOC.valorKl = Number.parseFloat(this.valorKl);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postGenOC(this.createGenOC);
      this.loteNo = [];
      this.tableGenOC = [];
      await this.genOC();
      this.createGenOC = {
        guiaNo: 0,
        loteNo: 0,
        nDias: 0,
        retef: '',
        usuarioG: '',
        valorKl: 0,
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async genera() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putGeneraGenOC({
        fecPInv: this.$store.getters.getFechaProceso,
      });

      this.showOutput(false, 'Proceso Concluido con Exito');
      this.readonlyGenera = true;
      this.readonlyPrint = false;
      this.imprimeRef.focus();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async genOCSub(nLote: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGenOCSub(nLote);
      if (response.data === null) {
        return;
      }
      this.IGenOCSub = response.data as IGenOCSub;
      this.IGenOCSub.fechaPes = response.data.fechaPes;
      this.totalKilosP = this.convertToDecimal(response.data.totalKilosP);
      this.rendGuia = this.convertToDecimal(response.data.rendGuia);
      this.pesoCanal = this.convertToDecimal(response.data.pesoCanal);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async selectTable(item: any) {
    this.nolote = item.lotes.Lote;
    await this.genOCID(item.lotes.Lote);
    await this.genOCSub(item.lotes.Lote);
  }

  private async genOCID(loteNo: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGenOCID(loteNo);
      this.upDataGenOC = response.data as IGenOC;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async genOC() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGenOC();
      for (const dataTable of response.data) {
        for (const lotesItem of this.itemLote) {
          if (dataTable.loteNo === lotesItem.Lote) {
            this.tableGenOC.push({
              guiaNo: dataTable.guiaNo,
              loteNo: dataTable.loteNo,
              lotes: lotesItem,
              nDias: dataTable.nDias,
              retef: dataTable.retef,
              usuarioG: dataTable.usuarioG,
              valorKl: this.convertToDecimal(dataTable.valorKl),
            });
          }
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onLoad() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOnLoadGenOC();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async genOcLote() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getLoteGenOc();

      this.itemLote = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async infcxprgPdf() {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getinfcxprgPDF();
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async comprocomprargPdf() {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptcomprocomprargPDF();
      this.pdfData2 = pdf2.data;
      this.showModal2PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
  private async ordcomprargPdf() {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcomprargPDF();
      this.pdfData3 = pdf2.data;
      this.showModal3PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
