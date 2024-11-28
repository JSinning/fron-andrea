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
          <h1 class="title">O. compra de lotes</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ validateAnulado(ordCompra.anulada) }}
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
                :usePagination="true"
                :enablePrev="readonlyPrev"
                :enableNext="readonlyNext"
                @prev="prev"
                @next="next"
                @changed="ordenCompraID(id)"
                >Busqueda ID entrada No:</Select
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
          <button class="btn-save" v-if="pgAnual">Anular</button>
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

      <input type="radio" name="tab" id="detalles" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anular"
        class="hidden"
        v-if="pgAnual"
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
            v-if="pgAnual"
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
              v-model="ordCompra.tipoMov"
            >
              <option
                v-for="(typeMovi, index) in itemTypeMov"
                :key="index"
                :value="typeMovi.id"
              >
                {{ typeMovi.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Orden de compra:</label>
            <input type="text" class="input" v-model="ordCompra.consecTip" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Inf. de recepcion No:</label>
            <input type="text" class="input" v-model="ordCompra.loteNo" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. compra usuario:</label>
            <input type="text" class="input" v-model="ordCompra.document" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Lic. ICA:</label>
            <input type="text" class="input" v-model="ordCompra.lIca" />
          </div>

          <div class="md:w-full px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompra.nitoCc"
              disabled
            >
              <option
                v-for="(nitCC, index) in itemNitCC"
                :key="index"
                :value="nitCC.id"
              >
                {{ nitCC.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompra.nitoCc"
              disabled
            >
              <option
                v-for="(nitCCod, index) in itemNitCCcod"
                :key="index"
                :value="nitCCod.id"
              >
                {{ nitCCod.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompra.nitoCc"
              disabled
            >
              <option
                v-for="(nitCCpp, index) in itemNitCCpp"
                :key="index"
                :value="nitCCpp.id"
              >
                {{ nitCCpp.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de movimiento:</label>
            <input type="date" class="input" v-model="fechaMovi" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de vencimiento:</label>
            <input type="date" class="input" v-model="fechaVenc" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompra.transportador"
            />
          </div>

          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">Lote No</th>
                  <th style="visibility: collapse; display: none">
                    Nit proveedor
                  </th>
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
                    <select
                      class="appearance-none"
                      v-model="ordeCompraLote.clase"
                    >
                      <option
                        v-for="(idClass, index) in itemClase"
                        :key="index"
                        :value="idClass.id"
                      >
                        {{ idClass.item }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(ordeCompraLote.totalKilosP) }}
                  </td>
                  <td class="text-center">
                    {{ $convertToDecimal(ordeCompraLote.vlrKilo) }}
                  </td>
                  <td class="text-center">{{ total }}</td>
                </tr>
              </tbody>
            </table>
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
                        v-for="(idCodigo1, index) in itemDescrip"
                        :key="index"
                        :value="idCodigo1.id"
                      >
                        {{ idCodigo1.item }}
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
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row flex-wrap">
              <div class="md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="label py-2">Subtotal</label>
                <input type="text" class="input" v-model="subTotal" disabled />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap flex-row w-full flex-row-reverse">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Subtotal</label>
              <input type="text" class="input" v-model="subTotalOrden" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">IVA</label>
              <input type="text" class="input" v-model="iva" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total</label>
              <input type="text" class="input" v-model="totalOrden" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0" v-if="false">
              <label class="label">Decomiso productos</label>
              <input type="text" class="input" v-model="valProdDUsua" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0" v-if="false">
              <label class="label">Total menos decomiso</label>
              <input type="text" class="input" v-model="valNetoRemi" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tipo retefuente</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="ordCompra.reteFu"
              >
                <option
                  v-for="(refuente, index) in itemRefuente"
                  :key="index"
                  :value="refuente.id"
                >
                  {{ refuente.item }}
                </option>
              </select>
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Observacion:</label>
              <input
                type="text"
                class="input"
                v-model="ordCompra.observaciones"
              />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Elaboro:</label>
              <input type="text" class="input" v-model="ordCompra.entrego" />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular px-10" v-if="pgAnual">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Anular</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="ordCompra.anulada"
            />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-2">
            <label class="label">Motivo:</label>
            <input type="text" class="input" v-model="ordCompra.motivoAnul" />
          </div>
        </div>
      </div>

      <div class="mt-0 pt-3 px-10 flex flex-row flex-wrap">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label py-2">Compra No:</label>
          <input type="text" class="input" v-model="ordCompra.consecTip" />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label py-4"></label>
          <select class="bg-white border select" v-model="ordCompra.nitoCc">
            <option
              v-for="(nitoCC22, index) in itemNitCC22"
              :key="index"
              :value="nitoCC22.id"
            >
              {{ nitoCC22.item }}
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
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import Select from '@/components/reusable/select.vue';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import {
  IOrdCompra,
  IOrdCompraSubDt,
  IOrdCompraSubLote,
} from '@/remote/api/guia_sacrificio/type';
import moment from 'moment/moment';
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
  name: 'OrdCompraCs',
})
export default class OrdCompraCs extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private search: boolean = false;
  private skip: number = 0;
  private limt: number = 1000;
  private readonlyPrev: boolean = false;
  private readonlyNext: boolean = false;
  private pgAnual: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private pdfData3: string = '';
  private showModalPDF: boolean = false;
  private showModal2PDF: boolean = false;
  private showModal3PDF: boolean = false;

  private id: number = 0;
  private fechaMovi: string = '';
  private fechaVenc: string = '';
  private total: string = '0';
  private subTotal: string = '';
  private subTotalOrden: string = '';
  private iva: string = '';
  private totalOrden: string = '';
  private valProdDUsua: string = '';
  private valNetoRemi: string = '';

  private ordenCompra: IOrdCompraSubDt[] = [];
  private itemCodigo: IInterfaceSelect[] = [];
  private itemDescrip: IInterfaceSelect[] = [];
  private customerSearch: IInterfaceSelect[] = [];
  private itemTypeMov: IInterfaceSelect[] = [];
  private itemNitCC: IInterfaceSelect[] = [];
  private itemNitCCcod: IInterfaceSelect[] = [];
  private itemNitCCpp: IInterfaceSelect[] = [];
  private itemNitCC22: IInterfaceSelect[] = [];
  private itemClase: IInterfaceSelect[] = [];
  private itemRefuente: IInterfaceSelect[] = [];
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

  private ordCompra: IOrdCompra = {
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
    await this.typeMov();
    await this.nitCCUsers();
    await this.nitCCcodUsers();
    await this.nitCCppUsers();
    await this.nitCC22();
    await this.ordCompraClase();
    await this.OrdCompraSubdtIdCodigo();
    await this.ordCompraSubdtIdCodigo1();
    await this.refuentes();
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
    if (this.ordCompra.imprim === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }

    await this.infcxPdf(this.ordCompra.idConcecutivo);
    await this.comprocomprapdf(this.ordCompra.idConcecutivo);
    await this.ordcompraPdf(this.ordCompra.idConcecutivo);
  }

  private async ordenCompraSubLote(lote: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraSubLote(lote);
      this.ordeCompraLote = response.data.data as IOrdCompraSubLote;
      this.total = convertToDecimal(response.data.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchCustomer(sikp: number, limit: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getBuscarClientOrdcompraCs(
        sikp,
        limit,
      );
      if (response.data.length === 0 || response.data === null) {
        this.showOutput(true, 'no hay mas datos');
        this.readonlyNext = true;
      }
      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.IdConcecutivo,
          item: `${e.ConsecTip} - ${e.Tercero} - ${e.LoteNo} - ${e.GuiaSac}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordenCompraID(idConcecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdenCompraID(idConcecutivo);

      this.ordCompra = response.data as IOrdCompra;
      this.fechaMovi = this.convertDate(this.ordCompra.fechaMov);
      this.fechaVenc = this.convertDate(this.ordCompra.fechaVenci);
      this.subTotalOrden = convertToDecimal(this.ordCompra.subtotal);
      this.iva = convertToDecimal(this.ordCompra.iva);
      this.totalOrden = convertToDecimal(this.ordCompra.totalVenta);
      this.valProdDUsua = convertToDecimal(this.ordCompra.valProdDUsua);
      this.valNetoRemi = convertToDecimal(this.ordCompra.valNetoRemi);
      await this.ordenCompraSubLote(this.ordCompra.loteNo);
      await this.ordenCompraSubDt(this.ordCompra.idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async typeMov() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoMovOrdCompra();
      this.itemTypeMov = response.data.map((e: any) => {
        return { id: e.idMovimiento, item: e.descripcion };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCOrdCompra();
      this.itemNitCC = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.codProveedor };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCcodUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCodOrdCompra();
      this.itemNitCCcod = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.nitoCc };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCppUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCppOrdCompra();
      this.itemNitCCpp = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCC22() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCC22OrdCompra();
      this.itemNitCC22 = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
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

  private async ordenCompraSubDt(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdcomprasubdtID(idConsecutivo);
      this.ordenCompra = response.data.data;
      this.subTotal = convertToDecimal(response.data.subtotal);
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
      const response =
        await this.guiaSacrificioApi.getOrdCompraSubdtIdCodigo1();
      this.itemCodigo = response.data.map((e: any) => {
        return { id: e.idCodigo, item: e.idCodigo };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSubdtIdCodigo1() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraSubdtIdCodigo1();
      this.itemDescrip = response.data.map((e: any) => {
        return { id: e.idCodigo, item: e.descripcionMer };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async refuentes() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getRefuenteOrdCompra();
      this.itemRefuente = response.data.map((e: any) => {
        return {
          id: e.idReteFu,
          item: `${e.idReteFu} - ${e.concepRete} - ${e.porRete}`,
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

  private async comprocomprapdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptcomprocompraPDF(id);
      this.pdfData2 = pdf2.data;
      this.showModal2PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
  private async ordcompraPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcompraPDF(id);
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
