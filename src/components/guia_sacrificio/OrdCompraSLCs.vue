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
          <h1 class="title">Ordenes de compra</h1>
        </div>

        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ validateAnulado(ordCompraSLCs.anulada) }}
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
                :enablePrev="readonlyPrev"
                :enableNext="readonlyNext"
                :usePagination="true"
                @changed="ordCompraSLCsID(id)"
                @prev="prev"
                @next="next"
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
          <button class="btn-primary" v-if="false">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anular" v-if="pgAnulada">
            Anular
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" v-if="false">Guardar</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />

      <input type="radio" name="tab" id="detalles" class="hidden" />
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
            Datos basicos O. compra
          </span>
        </label>

        <label for="detalles">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles O. compra
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
            <label class="label">Tipos de movimiento:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLCs.tipoMov"
              disabled
            >
              <option
                v-for="(item, index) in typeMov"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Orden de compra:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSLCs.consecTip"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. compra usuario</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSLCs.documento"
              readonly
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLCs.nitoCc"
              disabled
            >
              <option
                v-for="(item, index) in nitCC"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLCs.nitoCc"
              disabled
            >
              <option
                v-for="(item, index) in nitCCcod"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLCs.nitoCc"
              disabled
            >
              <option
                v-for="(item, index) in nitCCpp"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraSLCs.fechaMov"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de vencimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraSLCs.fechaVenci"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSLCs.transportador"
              readonly
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles">
        <div class="flex flex-row flex-wrap">
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
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
                    {{ $convertToDecimal(item.cantidadUn) }}
                  </td>
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
          </div>

          <div class="md:w-full mb-6 md:mb-0">
            <label class="label">Decomisos</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="ordCompraSLCs.pDejxUsuario"
              readonly
            />
          </div>
          <div class="md:w-5/6 mt-2 mb-6 md:mb-0">
            <label class="label">Decomisos productos</label>
          </div>

          <div class="card-table flex-wrap w-7/12">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
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
                <input
                  type="text"
                  class="input"
                  v-model="subtDescUs"
                  readonly
                />
              </div>

              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label py-4"></label>
                <input type="text" class="input" v-model="totalUs" readonly />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap flex-col w-5/12">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Subtotal</label>
              <input type="text" class="input" v-model="subtotal" readonly />
            </div>

            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">IVA</label>
              <input type="text" class="input" v-model="iva" readonly />
            </div>

            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Total</label>
              <input type="text" class="input" v-model="totalVenta" readonly />
            </div>

            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Decomiso productos</label>
              <input
                type="text"
                class="input"
                v-model="valProdDUsua"
                readonly
              />
            </div>

            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Total menos descuentos</label>
              <input type="text" class="input" v-model="valNetoRemi" readonly />
            </div>

            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Tipo retefuente</label>
              <select
                class="bg-white border py-1 pr-2 select"
                disabled
                v-model="ordCompraSLCs.reteFu"
              >
                <option
                  v-for="(item, index) in reteFue"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.item }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-row flex-wrap md:w-full">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Observacion:</label>
              <input
                type="text"
                class="input"
                v-model="ordCompraSLCs.observaciones"
                readonly
              />
            </div>

            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Elaboro:</label>
              <input
                type="text"
                class="input"
                v-model="ordCompraSLCs.entrego"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular px-10" v-if="pgAnulada">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Anular</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="anula"
              ref="anuladoRef"
            />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-2">
            <label class="label">Motivo:</label>
            <input type="text" class="input" v-model="motivoAnul1" />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-8 mt-4">
            <button class="btn-save">Anular</button>
          </div>
        </div>
      </div>

      <div class="mt-0 pt-3 px-10 flex flex-row flex-wrap">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label py-2">Compra No:</label>
          <input
            type="text"
            class="input"
            v-model="ordCompraSLCs.consecTip"
            readonly
          />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label py-4"></label>
          <select
            class="bg-white border select"
            v-model="ordCompraSLCs.nitoCc"
            disabled
          >
            <option
              v-for="(item, index) in nitCC22"
              :key="index"
              :value="item.id"
            >
              {{ item.item }}
            </option>
          </select>
        </div>
      </div>
    </div>
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
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import Select from '@/components/reusable/select.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment/moment';
import {
  IOrdCompraSLCs,
  IOrdCompraSLSubDt,
  IOrdCompraSLSubDtUs,
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
  name: 'OrdCompraSLCS',
})
export default class OrdCompraSLCS extends Vue {
  @Ref('anuladoRef') public anuladoRef: HTMLInputElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private pdfData3: string = '';
  private showModalPDF: boolean = false;
  private showModal2PDF: boolean = false;
  private showModal3PDF: boolean = false;

  private pgAnulada: boolean = false;
  private skip: number = 0;
  private limt: number = 1000;
  private readonlyPrev: boolean = false;
  private readonlyNext: boolean = false;
  private anula: boolean = false;
  private motivoAnul1: string = '';

  private search: boolean = false;

  private id: number = null;
  private subtotal: string = '';
  private iva: string = '';
  private totalVenta: string = '';
  private valProdDUsua: string = '';
  private valNetoRemi: string = '';

  private subtDesc: string = '';
  private tIva: string = '';
  private total: string = '';
  private subtDescUs: string = '';
  private totalUs: string = '';

  private customerSearch: IInterfaceSelect[] = [];
  private typeMov: IInterfaceSelect[] = [];
  private reteFue: IInterfaceSelect[] = [];
  private nitCC: IInterfaceSelect[] = [];
  private nitCCcod: IInterfaceSelect[] = [];
  private nitCCpp: IInterfaceSelect[] = [];
  private nitCC22: IInterfaceSelect[] = [];
  private idCodigo: IInterfaceSelect[] = [];
  private idCodigo1: IInterfaceSelect[] = [];
  private tblOrdCompraSLSubDt: IOrdCompraSLSubDt[] = [];
  private tblOrdCompraSLSubDtUs: IOrdCompraSLSubDtUs[] = [];
  private ordCompraSLCs: IOrdCompraSLCs = {
    anulada: false,
    cambioM: 0,
    concFactur: 0,
    consecTip: 0,
    descuento: 0,
    document: '',
    documento: '',
    entrego: '',
    estacion: '',
    fecha: '',
    fechaMov: '',
    fechaProc: '',
    fechaVenci: '',
    guiaSac: 0,
    idConcecutivo: 0,
    idEmpresa: 0,
    idMoneda: 0,
    imprim: 'N',
    iva: 0,
    lIca: '',
    liqPesoFinca: false,
    loteNo: 0,
    motivoAnul: '',
    nitoCc: '',
    observaciones: '',
    observaciones2: '',
    pDejxUsuario: false,
    plazoDia: 0,
    prefijo: '',
    procesado: false,
    reteFu: '',
    subtotal: 0,
    tipoMov: 0,
    tipoTransac: 0,
    totalVenta: 0,
    transportador: '',
    usuario: '',
    valNetoRemi: 0,
    valProdDUsua: 0,
    vrFondo: 0,
    vrRetefuente: 0,
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.typeMovs();
    await this.nitoCC();
    await this.nitoCCcod();
    await this.nitoCCpp();
    await this.nitoCC22();
    await this.reteFuente();
    await this.idCodigosOrdCompraSLSubDt();
    await this.searchCustomer(this.skip, this.limt);
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

  private closeModal2PDF() {
    this.showModal2PDF = false;
  }

  private closeModal3PDF() {
    this.showModal3PDF = false;
  }

  private async prev() {
    if (this.skip <= 0) {
      this.readonlyPrev = true;
      return;
    }
    this.readonlyNext = false;
    this.skip = this.skip - this.limt;
    await this.searchCustomer(this.skip, this.limt);
  }

  private async next() {
    this.readonlyPrev = false;
    this.skip = this.skip + this.limt;
    await this.searchCustomer(this.skip, this.limt);
  }

  private async rePrint() {
    if (this.ordCompraSLCs.imprim === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }
    await this.infcxPdf(this.ordCompraSLCs.idConcecutivo);
    await this.comprocompraSLpdf(this.ordCompraSLCs.idConcecutivo);
    await this.ordcompraSLPdf(this.ordCompraSLCs.idConcecutivo);
  }

  private anular() {
    if (!this.ordCompraSLCs.anulada) {
      this.pgAnulada = true;
      this.anula = false;
      this.anuladoRef.focus();
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private async searchCustomer(skip: number, limt: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getBuscarClienteOrdCompraSLCs(skip, limt);
      if (response.data.length === 0 || response.data === null) {
        this.showOutput(true, 'no hay mas datos');
        this.readonlyNext = true;
      }
      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.IdConcecutivo,
          item: `${e.ConsecTip} - ${e.Tercero} -${this.convertDate(
            e.FechaMov,
          )}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSLSubDtUs(idConsecutivo: number) {
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

  private async ordCompraSLSubDt(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraSLSubDt(idConsecutivo);

      this.tblOrdCompraSLSubDt = response.data.data;
      this.subtDesc = convertToDecimal(response.data.subtotal.subtDesc);
      this.tIva = convertToDecimal(response.data.subtotal.tIva);
      this.total = convertToDecimal(response.data.subtotal.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSLCsID(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraSLCs(id);
      this.ordCompraSLCs = response.data as IOrdCompraSLCs;
      this.subtotal = convertToDecimal(response.data.subtotal);
      this.iva = convertToDecimal(response.data.iva);
      this.totalVenta = convertToDecimal(response.data.totalVenta);
      this.valProdDUsua = convertToDecimal(response.data.valProdDUsua);
      this.valNetoRemi = convertToDecimal(response.data.valNetoRemi);
      this.ordCompraSLCs.fechaMov = this.convertDate(response.data.fechaMov);
      this.ordCompraSLCs.fechaVenci = this.convertDate(
        response.data.fechaVenci,
      );

      await this.ordCompraSLSubDt(this.ordCompraSLCs.idConcecutivo);
      await this.ordCompraSLSubDtUs(this.ordCompraSLCs.idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async typeMovs() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoMovOrdCompraSLCs();
      this.typeMov = response.data.map((e: any) => {
        return { id: e.idMovimiento, item: e.descripcion };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitoCC() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCcOrdCompraSLCs();
      this.nitCC = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.codProveedor };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitoCCcod() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCodOrdCompraSLCs();
      this.nitCCcod = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.nitoCC };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitoCCpp() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCPPOrdCompraSLCs();
      this.nitCCpp = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitoCC22() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCC22OrdCompraSLCs();
      this.nitCC22 = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async reteFuente() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getReteFuenteOrdCompraSLCs();
      this.reteFue = response.data.map((e: any) => {
        return {
          id: e.IdReteFu,
          item: `${e.IdReteFu} - ${e.ConcepRete} - ${convertToDecimal(
            e.PorRete,
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

  private async infcxPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getinfcxPDF(id);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async comprocompraSLpdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptcomprocompraslPDF(id);
      this.pdfData2 = pdf2.data;
      this.showModal2PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
  private async ordcompraSLPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcompraslPDF(id);
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
