<!--
  */
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 /*
 -->
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
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-2/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Despacho Local</h1>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="adicionarRegistro">
            Adicionar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="save">Guardar</button>
          <button class="btn-delete" @click="viewModalDelete = true">
            Eliminar
          </button>
        </div>
      </div>
      <div class="p-2"></div>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">ID Despacho:</label>
            <input type="text" class="input" v-model="idDespachoLoc" disabled />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Placa Vehiculo:</label>
            <input type="text" class="input" v-model="IdLDespachoLc.placaVeh" />
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-2/6">
            <label class="label"> Conductor: </label>
            <PaginatedSelect
              v-model="IdLDespachoLc.conductorVeh"
              :fetch="conductoresNit"
              @change="afterUpdateConductores(IdLDespachoLc.conductorVeh)"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-2/6">
            <PaginatedSelect
              v-model="IdLDespachoLc.conductorVeh"
              :fetch="conducturesName"
              @change="afterUpdateConductores(IdLDespachoLc.conductorVeh)"
              class="mt-4 px-3"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha Despacho:</label>
            <input type="date" class="input" v-model="IdLDespachoLc.fechaDL" />
          </div>
        </div>

        <div class="p-4"></div>
        <div class="p-4"></div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">Detalles Canales...</label>
          </div>

          <DLDespachoLcDet2
            :idDespachoLoc="idDespachoLoc"
            :key="idDespachoLoc"
            :cuartoS="0"
            :viewAddRegistro="viewAddRegistro"
          />
        </div>

        <div class="p-4"></div>
        <div class="p-4"></div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">Otros Detalles...</label>
          </div>

          <DLDespachoLcDet1
            :idDespachoLoc="idDespachoLoc"
            :key="idDespachoLoc"
            :viewAddRegistro="viewAddRegistro"
          />
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-10/12">
            <label class="label">Observacion:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.observacion"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Realizo:</label>
            <input type="text" class="input" v-model="IdLDespachoLc.realizo" />
          </div>

          <div class="md:w-2/12 px-3 mb-6 md:mb-0"></div>

          <div class="px-1 mb-6 md:mb-0 w-1/5">
            <button class="btn-save p-1" @click="onPrint">
              Imprimir Documento
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Anular -->
    <Modals
      :open-modal="viewModalDelete"
      @Ok="aceptarDelete"
      @close="viewModalDelete = false"
    >
      Esta Seguro desea Eliminar reproceso Canal?
    </Modals>
    <!-- Modal view Pdf -->
    <ModalPDFPreview
      :pdfData="rptDespachoLocalPdfBase64"
      @close="rptDespachoLocalPdfBase64 = ''"
      v-if="rptDespachoLocalPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import DLDespachoLcDet2 from '@/components/despacho_local/DLDespachoLcDet2.vue';
import DLDespachoLcDet1 from '@/components/despacho_local/DLDespachoLcDet1.vue';
import IPagination from '@/types/IPagination';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import { IConductores, IDLDespachoLc } from '@/remote/api/despacho_local/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import convertDate from '@/utils/convertDate';
import moment from 'moment';
import Modals from '@/components/reusable/Modals.vue';
import ReportesDespachosLocalApi from '@/remote/api/despacho_local/reportesDespachosLocal';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    DLDespachoLcDet1,
    DLDespachoLcDet2,
    Loader,
    ModalPDFPreview,
    Modals,
    PaginatedSelect,
  },
  name: 'DLDespachoLc',
})
export default class DLDespachoLc extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewAddRegistro: boolean = true;
  private viewModalDelete: boolean = false;
  private addNewRegistre: boolean = false;

  private idDespachoLoc: number = 0;
  private rptDespachoLocalPdfBase64: string = '';

  private IdLDespachoLc: IDLDespachoLc = {
    anulado: false,
    conductorVeh: '',
    fechaDL: '',
    fechaUs: '',
    idDespachoLoc: 0,
    imprime: 'N',
    motivoAnul: '',
    observacion: '',
    placaVeh: '',
    realizo: '',
    usuario: '',
  };

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private despachoLocalRerportesApi = new ReportesDespachosLocalApi(
    this.$store.getters.getAuthToken,
  );

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async aceptarDelete() {
    if (!this.idDespachoLoc) {
      this.showOutput(true, 'No hay datos que eliminar');
      return;
    }

    await this.deleteDespachoLocal();
    this.clearData();
    this.viewAddRegistro = true;
    this.viewModalDelete = false;
    this.idDespachoLoc = 0;
  }

  private async save() {
    this.IdLDespachoLc.idDespachoLoc = this.idDespachoLoc;
    if (this.validateBeforeUpadate(this.IdLDespachoLc)) {
      return;
    }

    if (!this.addNewRegistre) {
      await this.addDespachoLocal();
      return;
    }
    await this.updatedDespachoLocal();
  }

  private async onPrint() {
    if (!this.idDespachoLoc) {
      this.showOutput(true, 'Debe Digitar idDespachoLoc');
      return;
    }
    this.IdLDespachoLc.imprime = 'S';
    await this.updatedDespachoLocal();
    this.isLoading = true;
    try {
      const rptReproceso =
        await this.despachoLocalRerportesApi.rptDespachoLocalpdf(
          this.idDespachoLoc,
        );
      this.rptDespachoLocalPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteDespachoLocal() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocal.delete(
        this.idDespachoLoc,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addDespachoLocal() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocal.post({
        ...this.IdLDespachoLc,
        fechaDL: convertDate(this.IdLDespachoLc.fechaDL),
        fechaUs: moment().utc().format('YYYY-MM-DD'),
      });
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      await this.despachoLocal();
      this.addNewRegistre = true;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updatedDespachoLocal() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocal.put(
        {
          ...this.IdLDespachoLc,
          fechaDL: convertDate(this.IdLDespachoLc.fechaDL),
          fechaUs: convertDate(this.IdLDespachoLc.fechaUs),
        },
        this.idDespachoLoc,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async despachoLocal() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocal.get(
        this.idDespachoLoc,
      );
      this.IdLDespachoLc = response.data;
      this.IdLDespachoLc.fechaUs = convertDate(this.IdLDespachoLc.fechaUs);
      this.IdLDespachoLc.fechaDL = convertDate(this.IdLDespachoLc.fechaDL);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterUpdateConductores(nit: string) {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.getAfterUpdateConductore(nit);
      this.IdLDespachoLc.placaVeh = response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async adicionarRegistro() {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.despachoLocal.getIdMaxDespachoLocal();
      this.idDespachoLoc = response.data;
      this.viewAddRegistro = false;
      this.addNewRegistre = false;
      this.clearData();
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async conductoresNit(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>
      >;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductores, 'nitConduc'>) => ({
            id: e.nitConduc,
            item: e.nitConduc,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalConductores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductores, 'nitConduc'>) => ({
          id: e.nitConduc,
          item: e.nitConduc,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async conducturesName(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>
      >;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductores, 'nitConduc' | 'nombreCond'>) => ({
            id: e.nitConduc,
            item: e.nombreCond,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalConductores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductores, 'nitConduc' | 'nombreCond'>) => ({
          id: e.nitConduc,
          item: e.nombreCond,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private validateBeforeUpadate(data: IDLDespachoLc): boolean {
    if (
      convertDate(this.IdLDespachoLc.fechaDL) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.IdLDespachoLc.fechaDL) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    if (!data.idDespachoLoc) {
      this.showOutput(true, 'No tiene ningun despacho seleccionado');
      return true;
    }
    if (!data.placaVeh) {
      this.showOutput(true, 'Digite la placa del vehiculo');
      return true;
    }
    if (!data.fechaDL) {
      this.showOutput(true, 'No hay niguna fecha seleccionada ');
      return true;
    }
    return false;
  }

  private clearData() {
    this.IdLDespachoLc = {
      anulado: false,
      conductorVeh: '',
      fechaDL: '',
      fechaUs: '',
      idDespachoLoc: 0,
      imprime: 'N',
      motivoAnul: '',
      observacion: '',
      placaVeh: '',
      realizo: '',
      usuario: '',
    };
  }
}
</script>
