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
          <h1 class="title">Historico de Reparto</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">{{ status }}</p>
          </div>
        </div>
      </div>

      <div class="flex-wrap">
        <div v-if="search" class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Busqueda:</label>
              <PaginatedSelect
                v-model="nReparto"
                :fetch="buscarcliente"
                @change="afterBuscarCliente(nReparto)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="search = !search">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-basicos-movR"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="detalles-movR" class="hidden" />
      <input type="radio" name="tab" id="anualar-movR" class="hidden" />
      <input type="radio" name="tab" id="estado-movR" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos-basicos-movR">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos Basicos
          </span>
        </label>

        <label for="detalles-movR">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles
          </span>
        </label>
        <label for="anualar-movR">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Anulado
          </span>
        </label>
        <label for="estado-movR">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Estado
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-basicos-movR">
        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-1/2"></div>
          <div class="px-3 mb-6 md:mb-0 md:w-1/2">
            <label class="label">Tipos de Movimiento::</label>
            <PaginatedSelect
              v-model="ImovRepartoHist.tipoMov"
              :fetch="fetchTipoMov"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-2/6">
            <label class="label">Reparto Nº:</label>
            <div class="mb-6 md:mb-0 inline-block relative md:w-1/3">
              <input
                type="text"
                class="input"
                maxlength="3"
                v-model="ImovRepartoHist.prefijo"
                disabled
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-40">
              <input
                type="text"
                class="input"
                maxlength="4"
                v-model="ImovRepartoHist.nReparto"
                disabled
              />
            </div>
          </div>
          <div class="px-3 mb-6 md:mb-0 md:w-2/6">
            <label class="label">No Guia:</label>
            <PaginatedSelect
              v-model="ImovRepartoHist.nGuia"
              :fetch="fetchNGuia"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 md:w-1/3">
            <label class="label">Lote:</label>
            <input type="text" class="input" maxlength="4" disabled />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
            <label class="label">Codigo C.C. ó Nit: </label>
            <input type="text" class="input" disabled />
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-1/3">
            <label class="label">Codigo C.C. ó Nit: </label>
            <PaginatedSelect :fetch="fetchNitoCod" disabled />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect :fetch="fetchNitoCod" class="mt-4 px-3" disabled />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ImovRepartoHist.fechaMov"
              disabled
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Elaboro:</label>
            <input
              type="text"
              class="input"
              v-model="ImovRepartoHist.elaboro"
              disabled
              maxlength="30"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-8/12">
            <label class="label">Observaciones:</label>
            <input
              type="text"
              class="input"
              v-model="ImovRepartoHist.observacion"
              disabled
              maxlength="50"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/3">
            <label class="label">N-Anim</label>
            <input type="text" class="input" disabled maxlength="12" />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-movR">
        <SubRepartoHt :key="nReparto" :nReparto="nReparto" />
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anualar-movR">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input
                class="checkBox"
                type="checkbox"
                v-model="ImovRepartoHist.anulado"
                disabled
                maxlength="1"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                v-model="ImovRepartoHist.motivoAnul"
                disabled
                maxlength="30"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-estado-movR">
        <div class="flex flex-row flex-wrap w-1/2">
          <div class="flex flex-col flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative">
              <label class="label">Estado:</label>
              <select class="select" v-model="ImovRepartoHist.estado" disabled>
                <option v-for="d in itemsEstado" :key="d.id" :value="d.id">
                  {{ d.item }}
                </option>
              </select>
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Motivo Estado:</label>
              <input
                type="text"
                class="input"
                v-model="ImovRepartoHist.motivoEstado"
                disabled
                maxlength="50"
              />
            </div>
          </div>
        </div>

        <div class="pt-4"></div>
        <div class="pt-4"></div>
      </div>

      <hr />
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import '../../assets/tab.css';
import SubRepartoHt from '@/components/reparto/SubRepartoHt.vue';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
import { captureException } from '@sentry/browser';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import {
  IBuscarClientesHist,
  INGuiaOptions,
  INitoCod,
  IRpReparto,
  ITipoMoviento,
} from '@/remote/api/reparto/types';
import { BaseResponse } from '@/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import convertDate from '@/utils/convertDate';
import ReportesRepartoAPI from '@/remote/api/reparto/reportesRepartoAPI';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    SubRepartoHt,
  },
  name: 'MovRepartoHist',
})
export default class MovRepartoHist extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private search: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private nReparto: number = 0;
  private duplicaI: string = '';
  private ImovRepartoHist: IRpReparto = {
    anulado: false,
    estado: '',
    fechaMov: '',
    mCodResUsua: false,
    nGuia: 0,
    nReparto: 0,
    procesado: false,
    tipoMov: 0,
  };

  private itemsEstado: IInterfaceSelect[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);
  private reporteRepartoApi = new ReportesRepartoAPI(
    this.$store.getters.getAuthToken,
  );

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private mounted() {
    this.fetchEstado();
  }

  private get status() {
    return this.ImovRepartoHist.anulado ? 'ANULADO' : '';
  }

  private fetchEstado() {
    this.itemsEstado.push(
      { id: '1', item: 'GENERADA' },
      { id: '2', item: 'EN ESPERA' },
      { id: '3', item: 'APLAZADA' },
      { id: '4', item: 'CUMPLIDA' },
      { id: '9', item: 'ANULADA' },
    );
  }

  private async rePrint() {
    if (this.ImovRepartoHist.imprime === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }

    if (this.ImovRepartoHist.anulado) {
      this.duplicaI = 'ANULADO';
      return;
    }
    this.duplicaI = 'DUPLICADO';
    await this.reportHist();
  }

  private async afterBuscarCliente(id: number) {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movRepartoHist.getAfterBuscarCliente(id);
      this.ImovRepartoHist = response.data;
      this.ImovRepartoHist.fechaMov = convertDate(
        this.ImovRepartoHist.fechaMov,
      );
    } catch (e) {
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async buscarcliente(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IBuscarClientesHist, 'nReparto' | 'fechaMov'>>
      >;
      if (q.query) {
        response =
          await this.repartoApi.movRepartoHist.getBuscarClientesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IBuscarClientesHist, 'nReparto' | 'fechaMov'>) => ({
            id: e.nReparto,
            item: `${e.nReparto} - ${convertDate(e.fechaMov)}`,
          }),
        );
      }
      response = await this.repartoApi.movRepartoHist.getBuscarClientes(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IBuscarClientesHist, 'nReparto' | 'fechaMov'>) => ({
          id: e.nReparto,
          item: `${e.nReparto} - ${convertDate(e.fechaMov)}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchNitoCod(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<INitoCod, 'codProveedor' | 'expr1'>>
      >;
      if (q.query) {
        response = await this.repartoApi.repartoMov.getNitoCodOptionsFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<INitoCod, 'codProveedor' | 'expr1'>) => ({
            id: e.codProveedor,
            item: e.expr1,
          }),
        );
      }
      response = await this.repartoApi.repartoMov.getNitoCodOptions(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<INitoCod, 'codProveedor' | 'expr1'>) => ({
          id: e.codProveedor,
          item: e.expr1,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchNGuia(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<INGuiaOptions, 'nGuia' | 'tercero'>>
      >;
      if (q.query) {
        response = await this.repartoApi.repartoMov.getNGuiaOptionsFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<INGuiaOptions, 'nGuia' | 'tercero'>) => ({
            id: e.nGuia,
            item: e.tercero,
          }),
        );
      }
      response = await this.repartoApi.repartoMov.getNGuiaOptions(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<INGuiaOptions, 'nGuia' | 'tercero'>) => ({
          id: e.nGuia,
          item: e.tercero,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchTipoMov(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.repartoMov.getTipoMovOptions(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ITipoMoviento, 'idMovimiento' | 'expr1'>) => ({
          id: e.idMovimiento,
          item: e.expr1,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async reportHist() {
    try {
      this.isLoading = true;
      const pdf2 = await this.reporteRepartoApi.getRepartoHistPdf(
        this.nReparto,
      );
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
