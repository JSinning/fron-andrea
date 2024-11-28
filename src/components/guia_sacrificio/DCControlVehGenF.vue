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
      </div>

      <div class="flex-wrap">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <Select
                :isItems="search"
                v-model="id"
                :value="id"
                @changed="dcControlVehGenFIdPesaje(id)"
                >Busqueda ID entrada No:</Select
              >
            </div>
          </div>
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
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada Vehiculo No:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehGenF.idPesaje"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehGenF.document"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input
              type="date"
              class="input"
              v-model="dcControlVehGenF.fechaPes"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehGenF.placaVeh"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo vehiculo</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVehGenF.tipoVeh"
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
              v-model="dcControlVehGenF.tipoTranspPoFs"
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
              v-model="dcControlVehGenF.transportador"
              readonly
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <div class="flex gap-4 w-full">
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVehGenF.conductorV"
                :fetch="driverVeh"
              />
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVehGenF.conductorV"
                :fetch="driverVeh2"
              />
            </div>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Quien lo programo:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehGenF.persProgramo"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha y hora entrada pesaje</label>
            <input
              type="datetime-local"
              class="input p-1"
              v-model="dcControlVehGenF.fechaHoraE"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Peso entrada</label>
            <input type="text" class="input p-1" v-model="pesoEntr" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Estado</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVehGenF.estadoV"
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

      <div class="card mt-0 pt-3 px-10 hidden tab-salida">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada vehiculo No:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehGenF.idPesaje"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVehGenF.placaVeh"
              readonly
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <div class="flex gap-4 w-full">
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVehGenF.conductorV"
                :fetch="driverVeh"
              />
              <PaginatedSelect
                class="w-1/2"
                v-model="dcControlVehGenF.conductorV"
                :fetch="driverVeh2"
              />
            </div>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha y hora salida pesaje</label>
            <input
              type="datetime-local"
              class="input p-1"
              v-model="dcControlVehGenF.fechaHoraS"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Peso salida</label>
            <input type="text" class="input p-1" v-model="pesoSali" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Estado</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVehGenF.estadoV"
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

      <div class="card mt-0 pt-3 hidden tab-pedidos">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label"
                >Digite los pedidos asociados al vehiculo</label
              >
            </div>

            <div class="card-table">
              <table class="table-fixed w-full text-xs">
                <thead>
                  <tr
                    class="border-b border-gray-500 text-white bg-andrea font-bold"
                  >
                    <th
                      style="visibility: collapse; display: none"
                      class="text-center"
                    >
                      Id pesaje
                    </th>
                    <th>Pedido</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(item, index) in dcControlVehDPedIdPesaje"
                  :key="index"
                >
                  <tr class="border-b border-gray-500">
                    <td
                      style="visibility: collapse; display: none"
                      class="text-center"
                    >
                      {{ item.idPesaje }}
                    </td>
                    <td class="text-center">
                      <select class="appearance-none" v-model="item.idPedido">
                        <option
                          v-for="(idPedido, index) in itemIdPedido"
                          :key="index"
                          :value="idPedido.id"
                        >
                          {{ idPedido.item }}
                        </option>
                      </select>
                    </td>
                    <td class="text-center">{{ item.observac }}</td>
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
                v-model="dcControlVehGenF.realizo"
                readonly
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <label class="label">Observaciones</label>
              <input
                type="text"
                class="input"
                v-model="dcControlVehGenF.observacion"
                readonly
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <button class="btn-save" ref="addButton" @click="print">
                Imprimir
              </button>
            </div>
          </div>
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
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import Select from '@/components/reusable/select.vue';
import {
  IDcControlVehDPed,
  IDcControlVehGenF,
} from '@/remote/api/guia_sacrificio/type';
import moment from 'moment/moment';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import IPagination from '@/types/IPagination';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import convertToDecimal from '@/utils/convertToDecimal';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import { BaseResponse } from '@/types';
import { Conductores } from '@/remote/api/guia_sacrificio/type/Conductor';
import IQuery from '@/types/query';
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
  name: 'DCControlVehGenF',
})
export default class DCControlVehGenF extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private id: number = 0;
  private pesoEntr: string = '0';
  private pesoSali: string = '0';

  private search: IInterfaceSelect[] = [];
  private itemTypeVeh: IInterfaceSelect[] = [];
  private itemTypeTransport: IInterfaceSelect[] = [];
  private itemState: IInterfaceSelect[] = [];
  private itemIdPedido: IInterfaceSelect[] = [];
  private dcControlVehDPedIdPesaje: IDcControlVehDPed[] = [];
  private dcControlVehGenF: IDcControlVehGenF = {
    anulado: false,
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
    this.typeTranport();
    this.typeState();
    await this.typeveh();
    await this.vehIdpedido();
    await this.searchID();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertDateHours(date: string) {
    return moment(date).utc().format('YYYY-MM-DD HH:mm:ss');
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private async print() {
    await this.dcControlVehPdf(this.dcControlVehGenF.idPesaje);
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

  private async dcControlVehGenFIdPesaje(idPesaje: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getIdPesajeDcControlVehGenF(idPesaje);

      this.dcControlVehGenF = response.data as IDcControlVehGenF;
      this.dcControlVehGenF.fechaHoraE = this.convertDateHours(
        response.data.fechaHoraE,
      );
      this.dcControlVehGenF.fechaHoraS = this.convertDateHours(
        response.data.fechaHoraS,
      );
      this.dcControlVehGenF.fechaPes = this.convertDate(response.data.fechaPes);
      this.pesoEntr = convertToDecimal(response.data.pesoEntr);
      this.pesoSali = convertToDecimal(response.data.pesoSali);
      await this.vehPedIdPesaje(this.dcControlVehGenF.idPesaje);
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
        await this.guiaSacrificioApi.getBuscarIdPesajeDcControlVehGenF();
      this.search = response.data.map((e: any) => {
        return {
          id: e.IdPesaje,
          item: `${e.IdPesaje} - ${e.PlacaVeh} - ${e.Anulado}`,
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

  private async vehIdpedido() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getIdPedidoDetpedido();
      this.itemIdPedido = response.data.map((e: any) => {
        return {
          id: e.idAuton,
          item: `${e.pedido} - ${e.prefijoPed} - ${e.usuario} - ${e.codigo} - ${
            e.sucursal
          } - ${this.convertDate(e.fecha)}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
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
