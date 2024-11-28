<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Entrada vehiculos</h1>
        </div>

        <div class="md:w-1/3 px-5 mb-6 md:mb-0 mt-5">
          <p class="text-andrea font-bold text-2xl">
            {{ validateAnualdo(dcControlVehMod.anulado) }}
          </p>
        </div>
      </div>

      <div class="flex-wrap">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <Select
                :isItems="search"
                v-model="id"
                :value="id"
                @changed="dcControlVehIdPesaje(id)"
                >Busqueda ID entrada No:</Select
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="modifyRegister">
            Modificar registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="updateVehMod">Guardar</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />

      <input type="radio" name="tab" id="datos_salida" class="hidden" />

      <input type="radio" name="tab" id="pedidos" class="hidden" />

      <input type="radio" name="tab" id="imprimir" class="hidden" />

      <input type="radio" name="tab" id="anular" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos vehiculo
          </span>
        </label>

        <label for="datos_salida">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos salida
          </span>
        </label>

        <label for="pedidos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Pedidos relacionados
          </span>
        </label>

        <label for="imprimir">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Imprimir
          </span>
        </label>

        <label for="anular">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada Vehiculo No:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehMod.idPesaje"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              ref="documentRef"
              v-model="dcControlVehMod.document"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input
              type="date"
              class="input"
              v-model="dcControlVehMod.fechaPes"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehMod.placaVeh"
              :readonly="readonly"
            />
          </div>

          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="label">Usuario:</label>
            <div class="flex gap-4">
              <div class="flex gap-4 w-1/2">
                <PaginatedSelect
                  class="flex-1"
                  v-model="dcControlVehMod.clienteUs"
                  :fetch="itemClienteUs"
                />
                <PaginatedSelect
                  class="flex-1"
                  v-model="dcControlVehMod.clienteUs"
                  :fetch="itemClienteUsCod"
                />
              </div>
              <PaginatedSelect
                class="w-1/2"
                v-model="dcControlVehMod.clienteUs"
                :fetch="itemClienteUsName"
              />
            </div>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo vehiculo</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVehMod.tipoVeh"
            >
              <option
                v-for="(tipoVeh, index) in itemTypeVeh"
                :value="tipoVeh.id"
                :key="index"
              >
                {{ tipoVeh.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo transporte</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVehMod.tipoTranspPoFs"
            >
              <option
                v-for="(transporte, index) in itemTypeTransport"
                :value="transporte.id"
                :key="index"
              >
                {{ transporte.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehMod.transportador"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Destino</label>
            <PaginatedSelect
              v-model="dcControlVehMod.ciudadDes"
              :fetch="ciudades"
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <div class="flex gap-4 w-full" @change="afterUpdteDrivers">
              <PaginatedSelect
                class="flex-1"
                @change="afterUpdteDrivers"
                v-model="dcControlVehMod.conductorV"
                :fetch="driverVeh"
              />
              <PaginatedSelect
                class="flex-1"
                @change="afterUpdteDrivers"
                v-model="dcControlVehMod.conductorV"
                :fetch="driverVeh2"
              />
            </div>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Quien lo programo:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehMod.persProgramo"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Producto</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVehMod.tipoProdu"
            >
              <option
                v-for="(tipoProduc, index) in itemTypeProduct"
                :key="index"
                :value="tipoProduc.id"
              >
                {{ tipoProduc.item }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex-wrap">
          <div class="flex flex-row flex-wrap mb-3">
            <div class="flex flex-row flex-wrap p-3 w-full justify-center">
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base"
                  >Fecha y hora entrada pesaje</label
                >
                <input
                  type="datetime-local"
                  class="input p-1 text-base"
                  v-model="dcControlVehMod.fechaHoraE"
                  :readonly="readonly"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Peso entrada</label>
                <input
                  type="text"
                  class="input p-1 text-base"
                  v-model="pesoEntr"
                  :readonly="readonly"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Estado</label>
                <select
                  class="bg-white border py-1 pr-2 select text-base"
                  v-model="dcControlVehMod.estadoV"
                >
                  <option
                    v-for="(estado, index) in itemState"
                    :value="estado.id"
                    :key="index"
                  >
                    {{ estado.item }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-salida">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada vehiculo No:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehMod.idPesaje"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehMod.placaVeh"
              readonly
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <div class="flex gap-4 w-full">
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVehMod.conductorV"
                @change="afterUpdteDrivers"
                :fetch="driverVeh"
              />
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVehMod.conductorV"
                @change="afterUpdteDrivers"
                :fetch="driverVeh2"
              />
            </div>
          </div>
        </div>
        <div class="flex-wrap">
          <div class="flex flex-row flex-wrap mb-3">
            <div class="flex flex-row flex-wrap p-3 w-full justify-center">
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base"
                  >Fecha y hora salida pesaje</label
                >
                <input
                  type="datetime-local"
                  class="input p-1 text-base"
                  v-model="dcControlVehMod.fechaHoraS"
                  :readonly="readonly"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Peso Salida</label>
                <input
                  type="text"
                  class="input p-1 text-base"
                  v-model="pesoSali"
                  :readonly="readonly"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Estado</label>
                <select
                  class="bg-white border py-1 pr-2 select text-base"
                  v-model="dcControlVehMod.estadoV"
                >
                  <option
                    v-for="(estado, index) in itemState"
                    :value="estado.id"
                    :key="index"
                  >
                    {{ estado.item }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-pedidos">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label"
                >Por favor escoja en la tabla el pedido que desea asociar y
                luego haga click en el botón Adicionar pedido</label
              >
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save': readonly,
                }"
                @click="addPedido"
                :disabled="readonly"
              >
                Adicionar Pedido
              </button>
            </div>

            <div class="card-table">
              <table class="table-fixed w-full text-xs">
                <thead>
                  <tr
                    class="border-b border-gray-500 text-white bg-andrea font-bold"
                  >
                    <th style="visibility: collapse; display: none">
                      Id pesaje
                    </th>
                    <th>Pedido</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-gray-500"
                    v-for="(item, index) in dcControlVehDPedIdPesaje"
                    :key="index"
                    @click="selectVehPad(item.idPesaje, item.idPedido)"
                  >
                    <td
                      style="visibility: collapse; display: none"
                      class="text-center"
                    ></td>
                    <td class="text-center">
                      <PaginatedSelect
                        v-model="item.idPedido"
                        :initData="itemIdPedido"
                        :fetch="vehIdpedido"
                        @change="tableVehPadUpdata"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.observac"
                        :disabled="readonly"
                        @change="tableVehPadUpdata(item)"
                      />
                    </td>
                  </tr>
                  <tr class="border-b border-gray-500">
                    <td
                      style="visibility: collapse; display: none"
                      class="text-center"
                    >
                      {{ dcControlVehDPed.idPesaje }}
                    </td>
                    <td class="text-center">
                      <PaginatedSelect
                        v-model="dcControlVehDPed.idPedido"
                        :fetch="vehIdpedido"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="dcControlVehDPed.observac"
                        :readonly="readonly"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-imprimir">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Realizo</label>
              <input
                type="text"
                class="input"
                v-model="dcControlVehMod.realizo"
                :readonly="readonly"
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <label class="label">Observaciones</label>
              <input
                type="text"
                class="input"
                v-model="dcControlVehMod.observacion"
                :readonly="readonly"
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <button class="btn-save" @click="print">Imprimir</button>
              <button class="btn-primary" v-if="false" @click="viewModalPrint">
                Imprimir definitiva
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label px-2">
                <input type="checkbox" class="checkBox" v-model="anula" />
                Anular
              </label>
            </div>
            <div class="md:w-full px-3 py-2 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input type="text" class="input" v-model="MotivoAnul1" />
            </div>
            <div class="w-full"></div>
            <div class="md:w-1/2 px-3 py-2 ml-6 mb-6 md:mb-0">
              <button class="btn-save p-2" @click="viewModalAnular">
                Anular
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Anualar Veh -->
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
      <!-- End Modal Anualar Veh -->
    </div>

    <!-- Modal print definitivo -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalPrint"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta Seguro de Confirmar la Impresion del ID Entrada No
              {{ dcControlVehSalid.idPesaje }}</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalPrint()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalPrint()">
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
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment/moment';
import Select from '@/components/reusable/select.vue';
import { IDcControlVeh } from '@/remote/api/guia_sacrificio/type/dcControlVeh';
import { IDcControlVehDPed } from '@/remote/api/guia_sacrificio/type';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import IPagination from '@/types/IPagination';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import { Conductores } from '@/remote/api/guia_sacrificio/type/Conductor';
import { Ciudades } from '@/remote/api/guia_sacrificio/type/Ciudad';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
    Select,
  },
  name: 'DCControlVehMod',
})
export default class DCControlVehMod extends Vue {
  @Ref('documentRef') public readonly documentRef: HTMLInputElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private modalAnular: boolean = false;
  private readonly: boolean = false;
  private modalPrint: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private anula: boolean = false;
  private MotivoAnul1: string = '';
  private idPesaje: number = 0;
  private idPedido: number = 0;
  private id: number = 0;
  private pesoEntr: string = '0';
  private pesoSali: string = '0';

  private search: IInterfaceSelect[] = [];
  private itemTypeVeh: IInterfaceSelect[] = [];
  private itemTypeProduct: IInterfaceSelect[] = [];
  private itemTypeTransport: IInterfaceSelect[] = [];
  private itemState: IInterfaceSelect[] = [];
  private itemIdPedido: IInterfaceSelect[] = [];
  private dcControlVehDPedIdPesaje: IDcControlVehDPed[] = [];
  private dcControlVehDPed: IDcControlVehDPed = {
    auton: 0,
    idPedido: 0,
    idPesaje: 0,
    observac: '',
  };
  private dcControlVehMod: IDcControlVeh = {
    anulado: false,
    ciudadDes: '',
    clienteUs: '',
    conductorV: '',
    document: '',
    estacion: '',
    estadoV: '',
    fechaG: '',
    fechaHoraE: '',
    fechaHoraS: '',
    fechaPes: '',
    idPesaje: 0,
    motiAnul: '',
    observacion: '',
    persProgramo: '',
    pesoEntr: 0,
    pesoSali: 0,
    placaVeh: '',
    procesado: false,
    realizo: '',
    tipoProdu: 0,
    tipoTranspPoFs: '',
    tipoVeh: 0,
    transportador: '',
    usuarioV: '',
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.openFrom();
    this.typeTranport();
    this.typeState();
    this.itemIdPedido = await this.vehIdpedido({ skip: 0, limit: 100 });
    await this.typeveh();
    await this.tipoProducto();
    await this.searchID();
  }

  private openFrom() {
    this.readonly = true;
    this.documentRef.focus();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private closeModalPrint() {
    this.modalPrint = false;
  }

  private viewModalPrint() {
    this.modalPrint = true;
  }

  private closeModalAnular() {
    this.modalAnular = false;
  }

  private viewModalAnular() {
    if (!this.anula) {
      this.showOutput(
        true,
        'Para anular el Documento debe hacer clik en anular',
      );
      return;
    }

    if (!this.MotivoAnul1 || this.MotivoAnul1 === null) {
      this.showOutput(true, 'Para anular el Documento debe digitar el motivo');
      return;
    }
    this.modalAnular = true;
  }

  private validateAnualdo(dato: boolean) {
    return dato ? 'Anualdo' : '';
  }

  private convertDateHours(date: string) {
    return moment(date).utc().format('YYYY-MM-DDThh:mm:ss');
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

  private modifyRegister() {
    this.readonly = false;

    this.documentRef.focus();
  }

  private afterUpdateVehMod() {
    if (
      !this.dcControlVehMod.placaVeh ||
      this.dcControlVehMod.placaVeh === null
    ) {
      this.showOutput(true, 'La Placa no Puede Ser Null');
      return true;
    }
    if (
      this.dcControlVehMod.fechaPes <
        this.$store.getters.getTConfinv1.fechaProc1 ||
      this.dcControlVehMod.fechaPes >
        this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    return false;
  }

  private async print() {
    await this.dcControlVehPdf(this.dcControlVehMod.idPesaje);
  }

  private async acceptModalPrint() {
    if (!this.dcControlVehMod.idPesaje || this.dcControlVehMod === null) {
      return;
    }
    this.dcControlVehMod.procesado = true;
    await this.dcControlVehPdf(this.dcControlVehMod.idPesaje);

    this.modalPrint = false;
  }

  private async updateVehMod() {
    if (this.afterUpdateVehMod()) {
      return;
    }
    this.dcControlVehMod.fechaG = moment().utc().format('YYYY-MM-DD');
    this.dcControlVehMod.fechaHoraS = '';
    this.dcControlVehMod.estacion = this.$store.getters.getUsuario;

    this.dcControlVehMod.pesoEntr = Number.parseFloat(this.pesoEntr);
    this.dcControlVehMod.pesoSali = Number.parseFloat(this.pesoSali);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putDCControlVehMod(
        this.dcControlVehMod.idPesaje,
        this.dcControlVehMod,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async acceptModalAnular() {
    if (
      !this.dcControlVehMod.idPesaje ||
      this.dcControlVehDPed.idPesaje === 0
    ) {
      this.showOutput(true, 'id Pesaje no puede ser cero');
      return;
    }

    this.dcControlVehMod.anulado = true;
    this.dcControlVehMod.motiAnul = this.MotivoAnul1;
    this.dcControlVehMod.estadoV = 'F';

    await this.dcControlVehModAnular(this.dcControlVehMod.idPesaje);
    this.modalAnular = false;
  }

  private async dcControlVehModAnular(idPesaje: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putAnularDCControlVehMod(
        idPesaje,
        this.dcControlVehMod,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async dcControlVehIdPesaje(idPesaje: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getDCControlVehMod(idPesaje);

      this.dcControlVehMod = response.data as IDcControlVeh;
      this.dcControlVehMod.fechaHoraE = this.convertDateHours(
        response.data.fechaHoraE,
      );
      this.dcControlVehMod.fechaHoraS = this.convertDateHours(
        response.data.fechaHoraS,
      );
      this.dcControlVehMod.fechaPes = this.convertDate(response.data.fechaPes);
      this.pesoEntr = this.convertToDecimal(response.data.pesoEntr);
      this.pesoSali = this.convertToDecimal(response.data.pesoSali);
      await this.vehPedIdPesaje(this.dcControlVehMod.idPesaje);
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addPedido() {
    if (!this.id || this.id === 0) {
      this.showOutput(true, 'Escoja el idPesaje');
      return;
    }

    if (
      !this.dcControlVehDPed.idPedido ||
      this.dcControlVehDPed.idPedido === 0
    ) {
      this.showOutput(true, 'Id pedido no puede ser cero');
      return;
    }

    this.dcControlVehDPed.idPesaje = this.id;
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.postDccontrolvehIdPesajeIdPedido(
          this.dcControlVehDPed,
        );
      await this.vehPedIdPesaje(this.id);
      this.dcControlVehDPed = {
        auton: 0,
        idPedido: 0,
        idPesaje: 0,
        observac: '',
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async selectVehPad(idPesaje: number, idPedido) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getDccontrolvehIdPesajeIdPedido(
          idPesaje,
          idPedido,
        );
      this.dcControlVehDPed = response.data as IDcControlVehDPed;
      this.idPesaje = idPesaje;
      this.idPedido = idPedido;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tableVehPadUpdata(item: IDcControlVehDPed) {
    this.dcControlVehDPed = item;
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.putDccontrolvehIdPesajeIdPedido(
          this.idPesaje,
          this.idPedido,
          this.dcControlVehDPed,
        );
      this.dcControlVehDPed = {
        auton: 0,
        idPedido: 0,
        idPesaje: 0,
        observac: '',
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async vehPedIdPesaje(idPesaje: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getDccontrolvehIdPesaje(idPesaje);
      this.dcControlVehDPedIdPesaje = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchID() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getBuscarClienteDcControlVehMod();
      this.search = response.data.map((e: any) => {
        return {
          id: e.idPesaje,
          item: `${e.idPesaje} - ${e.placaVeh} - ${e.anulado}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async typeveh() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoVehDcControlVeh();
      this.itemTypeVeh = response.data.map((e: any) => {
        return {
          id: e.idTipo,
          item: e.descripTipo,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterUpdteDrivers(nitCoductor: string) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getAfterCoductorDcControlVeh(nitCoductor);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tipoProducto() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoProducDcControlVeh();
      this.itemTypeProduct = response.data.map((e: any) => {
        return {
          id: e.idTipoProd,
          item: e.descTipoProd,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private typeTranport() {
    this.itemTypeTransport.push(
      { id: 'P', item: 'CLIENTE' },
      { id: 'F', item: 'FRIGOSINU' },
    );
  }

  private typeState() {
    this.itemState.push(
      { id: 'E', item: 'En Proceso' },
      { id: 'F', item: 'Finalizado' },
    );
  }

  private async itemClienteUs(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codiCliente: string;
        expr1: string;
        nitCliente: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getClienteUsDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitCliente,
          item: e.nitCliente,
        };
      });
    }
    response = await this.guiaSacrificioApi.getClienteUsDcControlVeh(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitCliente,
        item: e.nitCliente,
      };
    });
  }

  private async itemClienteUsCod(pag: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codiCliente: string;
        expr1: string;
        nitCliente: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getClienteUsDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitCliente,
          item: e.codiCliente,
        };
      });
    }

    response = await this.guiaSacrificioApi.getClienteUsDcControlVeh(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitCliente,
        item: e.codiCliente,
      };
    });
  }

  private async itemClienteUsName(pag: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codiCliente: string;
        expr1: string;
        nitCliente: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getClienteUsDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitCliente,
          item: e.expr1,
        };
      });
    }
    response = await this.guiaSacrificioApi.getClienteUsDcControlVeh(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitCliente,
        item: e.expr1,
      };
    });
  }

  private async driverVeh(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Conductores>;
    if (q.query) {
      response =
        await this.guiaSacrificioApi.getConductoresVDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitConduc,
          item: e.nitConduc,
        };
      });
    }
    response = await this.guiaSacrificioApi.getConductoresVDcControlVeh(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitConduc,
        item: e.nitConduc,
      };
    });
  }

  private async driverVeh2(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Conductores>;
    if (q.query) {
      response =
        await this.guiaSacrificioApi.getConductoresV2DcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitConduc,
          item: e.nombreCond,
        };
      });
    }
    response = await this.guiaSacrificioApi.getConductoresV2DcControlVeh(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitConduc,
        item: e.nombreCond,
      };
    });
  }

  private async ciudades(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Ciudades>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getCiudadDesDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.idCiudad,
          item: e.descripcionCiu,
        };
      });
    }
    response = await this.guiaSacrificioApi.getCiudadDesDcControlVeh(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.idCiudad,
        item: e.descripcionCiu,
      };
    });
  }

  private async vehIdpedido(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idAuton: string;
        pedido: string;
        prefijoPed: string;
        usuario: string;
        codigo: string;
        sucursal: string;
        fechaDoc: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getIdPedidoDetpedidoFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.idAuton,
          item: `${e.pedido} - ${e.prefijoPed} - ${e.usuario} - ${e.codigo} - ${
            e.sucursal
          } - ${this.convertDate(e.fechaDoc)}`,
        };
      });
    }
    response = await this.guiaSacrificioApi.getIdPedidoDetpedido(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.idAuton,
        item: `${e.pedido} - ${e.prefijoPed} - ${e.usuario} - ${e.codigo} - ${
          e.sucursal
        } - ${this.convertDate(e.fechaDoc)}`,
      };
    });
  }

  private async dcControlVehPdf(idPesaje: number) {
    try {
      this.isLoading = true;
      const pdf2 =
        await this.guiaSacrificioReports.getDCControlVehPDF(idPesaje);
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
