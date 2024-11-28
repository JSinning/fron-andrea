<!-- */ Copyright (©) Andrea.com.co - All Rights Reserved * Unauthorized copying
of this file, via any medium is strictly prohibited. * Proprietary and
confidential. * Written and developed with ❤️ by Andrea.com.co * 2020 /* -->
<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox
        :output="output.message"
        :isError="output.isError"
        @empty="output.message = ''"
      />
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
              <label class="label">Buscar ID Entrada No:</label>
              <PaginatedSelect
                v-model="idPesaje"
                :fetch="fetchIdPesajes"
                @change="fetchFormData"
              />
            </div>
          </div>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-Vehiculo-DCJ"
        class="hidden"
        checked
      />

      <input type="radio" name="tab" id="datos-salida-DCJ" class="hidden" />

      <input type="radio" name="tab" id="pedidos-DCJ" class="hidden" />

      <input type="radio" name="tab" id="imprimir-DCJ" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos-Vehiculo-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos vehiculo
          </span>
        </label>

        <label for="datos-salida-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos salida
          </span>
        </label>

        <label for="pedidos-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Pedidos relacionados
          </span>
        </label>

        <label for="imprimir-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Imprimir
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-Vehiculo-DCJ">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada Vehiculo No:</label>
            <input type="text" class="input" readonly v-model="idPesaje" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              ref="documentRef"
              v-model="data.document"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input type="date" class="input" v-model="data.fechaPes" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo</label>
            <input type="text" class="input" v-model="data.placaVeh" readonly />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo vehiculo</label>
            <PaginatedSelect
              v-model="data.tipoVeh"
              :fetch="fetchTiposVehiculos"
              :disabled="true"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo transporte</label>
            <select class="select" v-model="data.tipoTranspPoFs" disabled>
              <option value="P">Cliente</option>
              <option value="F">Frigosinu</option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador</label>
            <input
              type="text"
              class="input"
              v-model="data.transportador"
              readonly
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <PaginatedSelectGroup
              class="flex gap-4 w-full"
              v-model="data.conductorV"
              :initPagination="{ skip: 0, limit: 5000 }"
            >
              <PaginatedSelectGroupItem
                class="flex-1"
                :fetch="fetchConductores1"
                :disabled="true"
              />
              <PaginatedSelectGroupItem
                class="flex-1"
                :fetch="fetchConductores2"
                :disabled="true"
              />
            </PaginatedSelectGroup>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Quien lo programo:</label>
            <input
              type="text"
              class="input"
              v-model="data.persProgramo"
              readonly
            />
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
                  v-model="data.fechaHoraE"
                  readonly
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Peso entrada</label>
                <input
                  type="text"
                  class="input p-1 text-base"
                  v-model="data.pesoEntr"
                  readonly
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Estado</label>
                <select
                  class="select text-base"
                  v-model="data.estadoV"
                  disabled
                >
                  <option value="E">En proceso</option>
                  <option value="F">Finalizado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-salida-DCJ">
        <div class="flex flex-row flex-wrap w-full">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada vehiculo No:</label>
            <input type="text" class="input" v-model="idPesaje" readonly />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo:</label>
            <input type="text" class="input" v-model="data.placaVeh" readonly />
          </div>

          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <PaginatedSelectGroup
              class="flex gap-4 w-full"
              v-model="data.conductorV"
              :initPagination="{ skip: 0, limit: 5000 }"
            >
              <PaginatedSelectGroupItem
                class="flex-1"
                :fetch="fetchConductores1"
                :disabled="true"
              />
              <PaginatedSelectGroupItem
                class="flex-1"
                :fetch="fetchConductores2"
                :disabled="true"
              />
            </PaginatedSelectGroup>
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
                  v-model="data.fechaHoraS"
                  readonly
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Peso salida</label>
                <input
                  type="text"
                  class="input p-1 text-base"
                  v-model="data.pesoSali"
                  readonly
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Estado</label>
                <select
                  class="select text-base"
                  v-model="data.estadoV"
                  disabled
                >
                  <option value="E">En proceso</option>
                  <option value="F">Finalizado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-pedidos-DCJ">
        <DCControlVehDPedCs :key="idPesaje" :idPesaje="idPesaje" />
      </div>

      <div class="card mt-0 pt-3 hidden tab-imprimir-DCJ">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <div class="px-3 mb-6 md:mb-0">
              <label class="label">Realizo</label>
              <input
                type="text"
                class="input"
                v-model="data.realizo"
                readonly
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <label class="label">Observaciones</label>
              <input
                type="text"
                class="input"
                v-model="data.observacion"
                readonly
              />
            </div>

            <div>
              <button class="btn-save" @click="fetchPdf">Imprimir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="showModalPDF = false"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import DCControlVehDPedCs from '@/components/despacho_caja/DCControlVehDPedCs.vue';
import '../../assets/tab.css';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import { captureException } from '@sentry/browser';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IFriDCjControlVMd3 } from '@/remote/api/despacho_caja/types/IFriDCjControlVMd3';
import moment from 'moment';
import ReportesDespachosCajasApi from '@/remote/api/despacho_caja/reportesDespachosCajas';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    DCControlVehDPedCs,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
  },
  name: 'DCControlVehGenF',
})
export default class DCControlVehGenF extends Vue {
  public idPesaje = 0;

  public isLoading: boolean = false;

  public showModalPDF = false;

  public output = {
    isError: false,
    message: '',
  };

  public pdfData = '';

  public data: IFriDCjControlVMd3 = {
    anulado: false,
    conductorV: '',
    document: '',
    estacion: '',
    estadoV: '',
    fechaG: '',
    fechaHoraE: '',
    fechaHoraS: '',
    fechaPes: '',
    idPesaje: this.idPesaje,
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

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private despachoCajasRerportesApi = new ReportesDespachosCajasApi(
    this.$store.getters.getAuthToken,
  );

  public async fetchIdPesajes(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<
      Array<{
        idPesaje: number;
        placaVeh: string;
        fechaPes: string;
        nombreCond: string;
        procesado: boolean;
        anulado: boolean;
      }>
    >;
    if (q.query) {
      res =
        await this.despachoCajaApi.ControlVehGenF.getFindIdPesajeDataFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.idPesaje,
        item: [
          d.idPesaje,
          d.placaVeh,
          d.procesado ? 'Verdadero' : 'Falso',
        ].join(' | '),
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getFindIdPesajeData(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.idPesaje,
      item: [d.idPesaje, d.placaVeh, d.procesado ? 'Verdadero' : 'Falso'].join(
        ' | ',
      ),
    }));
  }

  public async fetchFormData(): Promise<void> {
    try {
      this.isLoading = true;
      const res = await this.despachoCajaApi.ControlVehGenF.getFormData(
        this.idPesaje,
      );
      this.data = {
        ...res.data,
        fechaHoraE: moment(res.data.fechaHoraE)
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss'),
        fechaHoraS: moment(res.data.fechaHoraS)
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss'),
        fechaPes: moment(res.data.fechaPes).utc().format('YYYY-MM-DD'),
      };
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: 'Error al obtener datos de formulario',
      };
    } finally {
      this.isLoading = false;
    }
  }

  public async fetchTiposVehiculos(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<
      Array<{
        idTipo: number;
        descripTipo: string;
        capacidadKil: number;
      }>
    >;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVehGenF.getTiposVehiculosFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.idTipo,
        item: d.descripTipo,
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getTiposVehiculos(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.idTipo,
      item: d.descripTipo,
    }));
  }

  public async fetchConductores1(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVehGenF.getConductoresFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nitConduc,
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getConductores(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nitConduc,
    }));
  }

  public async fetchConductores2(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVehGenF.getConductoresFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nombreCond,
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getConductores(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nombreCond,
    }));
  }

  public async fetchPdf() {
    try {
      this.isLoading = true;
      const res = await this.despachoCajasRerportesApi.getDCControlVeh(
        this.idPesaje,
      );
      this.pdfData = res.data;
      this.showModalPDF = true;
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: 'Error al obtener datos de reporte',
      };
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
