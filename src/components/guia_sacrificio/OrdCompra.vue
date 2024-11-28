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
                @changed="ordenCopraID(id)"
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
          <button class="btn-primary" @click="modify">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" v-if="pgAnual" @click="anular">
            Anular
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="upDataOrdCompra">Guardar</button>
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
      <input type="radio" name="tab" id="anular" class="hidden" />

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
            <input
              type="text"
              class="input"
              v-model="ordCompra.document"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Lic. ICA:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompra.lIca"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-full px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompra.nitoCc"
              :disabled="readonly"
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
              :disabled="readonly"
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
              :disabled="readonly"
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
            <input
              type="date"
              class="input"
              v-model="fechaVenc"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompra.transportador"
              :disabled="readonly"
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
                        v-for="(idCodigo, index) in itemDescrip"
                        :key="index"
                        :value="idCodigo.id"
                      >
                        {{ idCodigo.item }}
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
            <input type="checkbox" class="checkbox" v-model="anula" />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-2">
            <label class="label">Motivo:</label>
            <input type="text" class="input" v-model="MotivoAnul1" />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-8 mt-4">
            <button class="btn-save" @click="viewModalAnular">Anular</button>
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

    <hr />

    <!-- Modal Anular -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalAnular"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Va Anular este Documento este proceso es
              irreversible</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalAnular()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalAnular()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal Anular -->
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
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import Select from '@/components/reusable/select.vue';
import moment from 'moment/moment';
import {
  IOrdCompra,
  IOrdCompraSubDt,
  IOrdCompraSubLote,
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
  name: 'OrdCompra',
})
export default class OrdCompra extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private search: boolean = false;
  private readonly: boolean = false;
  private readonlyEntrego: boolean = false;
  private pgAnual: boolean = false;
  private modalAnular: boolean = false;
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
  private anula: boolean = false;
  private MotivoAnul1: string = '';

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
    this.block();
    await this.typeMov();
    await this.nitCCUsers();
    await this.nitCCcodUsers();
    await this.nitCCppUsers();
    await this.nitCC22();
    await this.ordCompraClase();
    await this.ordCompraSubdtIdCodigo();
    await this.ordCompraSubdtIdCodigo1();
    await this.refuentes();
    await this.searchCustomer();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private viewModalAnular() {
    this.modalAnular = true;
  }

  private closeModalAnular() {
    this.modalAnular = false;
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

  private block() {
    this.readonly = true;
    this.readonlyEntrego = false;
  }

  private desBlock() {
    this.readonly = false;
    this.readonlyEntrego = true;
  }

  private validateAfterUpdate() {
    if (
      this.fechaMovi < this.$store.getters.getTConfinv1.fechaProc3 ||
      this.fechaMovi > this.$store.getters.getTConfinv1.fechaProc4
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    if (!this.ordCompra.nitoCc) {
      this.showOutput(true, 'La O.Compra no Tiene Tercero');
      return true;
    }
    return false;
  }

  private anular() {
    if (!this.ordCompra.anulada) {
      this.pgAnual = true;
      this.anula = true;
      return;
    }

    this.showOutput(true, 'Documento Anulado');
  }

  private async acceptModalAnular() {
    await this.anulada();
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

  private async upDataOrdCompra() {
    if (this.validateAfterUpdate()) {
      return;
    }
    this.ordCompra.fechaMov = this.convertDate(this.fechaMovi);
    this.ordCompra.fechaVenci = this.convertDate(this.fechaVenc);
    this.ordCompra.subtotal = Number.parseFloat(this.subTotalOrden);
    this.ordCompra.iva = Number.parseFloat(this.iva);
    this.ordCompra.totalVenta = Number.parseFloat(this.totalOrden);
    this.ordCompra.valProdDUsua = Number.parseFloat(this.valProdDUsua);
    this.ordCompra.valNetoRemi = Number.parseFloat(this.valNetoRemi);
    this.ordCompra.fecha = moment().utc().format('YYYY-MM-DD');
    this.ordCompra.estacion = this.$store.getters.getUsuario;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOrdCompra(
        this.ordCompra.idConcecutivo,
        this.ordCompra,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      this.block();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async modify() {
    if (
      this.fechaMovi < this.$store.getters.getTConfinv1.fechaProc3 ||
      this.fechaMovi > this.$store.getters.getTConfinv1.fechaProc4
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postModifyOrdCompra(
        this.ordCompra,
      );
      this.ordCompra = response.data.data;
      this.desBlock();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async print() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postPrintOrdCompra(
        this.ordCompra,
      );

      await this.infcxPdf(this.ordCompra.idConcecutivo);
      await this.comprocomprapdf(this.ordCompra.idConcecutivo);
      await this.ordcompraPdf(this.ordCompra.idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async anulada() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postAnualOrdCompra({
        anualda: this.anula,
        motivoAnul: this.MotivoAnul1,
        usuario: this.ordCompra.usuario,
      });
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
      const response = await this.guiaSacrificioApi.getBuscarClienteOrdCompra();
      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.idConcecutivo,
          item: `${e.consecTip} - ${e.tercero} - ${e.loteNo} - ${e.guiaSac}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async ordenCopraID(idConcecutivo: number) {
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
      this.block();
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

  private async ordCompraSubdtIdCodigo() {
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
