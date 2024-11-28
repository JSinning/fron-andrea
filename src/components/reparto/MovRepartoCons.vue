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
          <h1 class="title">Reparto</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ status }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-wrap">
        <div v-if="search" class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Busqueda:</label>
              <PaginatedSelect
                v-model="busClient"
                :fetch="getBusClientOptions"
                @change="afterUpdateBusClient"
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
          <button class="btn-save" @click="print">Reimprimir</button>
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
      <input
        type="radio"
        name="tab"
        id="anualar-movR"
        class="hidden"
        v-if="pgAnulado"
      />
      <input
        type="radio"
        name="tab"
        id="estado-movR"
        class="hidden"
        v-if="pgEstado"
      />

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
            v-if="pgAnulado"
          >
            Anulado
          </span>
        </label>
        <label for="estado-movR">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgEstado"
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
              v-model="form.tipoMov"
              :fetch="getTipoMovOptions"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-1/2">
            <label class="label">Reparto Nº:</label>
            <div class="mb-6 md:mb-0 inline-block relative md:w-1/3">
              <input
                type="text"
                class="input"
                maxlength="3"
                disabled
                v-model="form.prefijo"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-1/3">
              <input
                type="text"
                class="input"
                maxlength="4"
                disabled
                v-model="busClient"
              />
            </div>
          </div>
          <div class="px-3 mb-6 md:mb-0 md:w-1/2">
            <label class="label">No Guia:</label>
            <PaginatedSelect
              v-model="form.nGuia"
              :fetch="getNGuiaOptions"
              disabled
            />
          </div>
          <div
            class="px-3 mb-6 md:mb-0 md:w-1/3"
            style="visibility: collapse; display: none"
          >
            <label class="label">Lote:</label>
            <input type="text" class="input" maxlength="4" />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
            <label class="label">Codigo C.C. ó Nit: </label>
            <PaginatedSelect :initData="[]" disabled />
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">Codigo C.C. ó Nit: </label>
            <PaginatedSelect :initData="[]" disabled />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-64">
            <PaginatedSelect :initData="[]" class="mt-4 px-3" disabled />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              disabled
              maxlength="4"
              v-model="form.fechaMov"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Elaboro:</label>
            <input
              type="text"
              class="input"
              disabled
              maxlength="30"
              v-model="form.elaboro"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-8/12">
            <label class="label">Observaciones:</label>
            <input
              type="text"
              class="input"
              disabled
              maxlength="50"
              v-model="form.observacion"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/3">
            <label class="label">N-Anim</label>
            <input type="text" class="input" disabled maxlength="12" />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-movR">
        <SubReparto
          :nReparto="busClient"
          :key="busClient"
          :viewAddRegistro="viewAddRegistro"
          :readonly="readonly"
        />
      </div>

      <div
        class="card mt-0 pt-3 px-10 hidden tab-anualar-movR"
        v-if="pgAnulado"
      >
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input
                class="checkBox"
                type="checkbox"
                disabled
                maxlength="1"
                v-model="form.anulado"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                disabled
                maxlength="30"
                v-model="form.motivoAnul"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-estado-movR" v-if="pgEstado">
        <div class="flex flex-row flex-wrap w-1/2">
          <div class="flex flex-col flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative">
              <label class="label">Estado:</label>
              <select disabled class="select" v-model="form.estado">
                <option value="1">GENERADA</option>
                <option value="2">EN ESPERA</option>
                <option value="3">APLAZADA</option>
                <option value="4">CUMPLIDA</option>
                <option value="9">ANULADA</option>
              </select>
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Motivo Estado:</label>
              <input
                type="text"
                class="input"
                disabled
                maxlength="50"
                v-model="form.motivoEstado"
              />
            </div>
          </div>
        </div>

        <div class="pt-4"></div>
        <div class="pt-4"></div>
      </div>

      <hr />
    </div>
    <PDFModal
      v-if="isPdfOpen"
      :pdfData="pdf"
      @close="isPdfOpen = false"
    ></PDFModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PDFModal from '@/components/reusable/ModalPdfPreview.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import '../../assets/tab.css';
import SubReparto from '@/components/reparto/SubReparto.vue';
import RepartoApi from '@/remote/api/reparto/repartoAPI';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import moment from 'moment';
import IPagination from '@/types/IPagination';
import { IRpReparto } from '@/remote/api/reparto/types/IRpReparto';
import * as Sentry from '@sentry/browser';
import convertDate from '@/utils/convertDate';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    PDFModal,
    PaginatedSelect,
    SubReparto,
  },
  name: 'MovRepartoCons',
})
export default class MovRepartoCons extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private search: boolean = false;
  private pgAnulado: boolean = false;
  private pgEstado: boolean = false;
  private viewAddRegistro: boolean = true;
  private readonly: boolean = true;
  private busClient: number = 0;
  private form: Partial<IRpReparto> = {};
  private isPdfOpen = false;
  private pdf = '';

  private repartoApi = new RepartoApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private get status() {
    return this.form.anulado ? 'ANULADO' : '';
  }

  private async getNGuiaOptions(p?: IPagination) {
    const res = await this.repartoApi.RepartoMov.getNGuiaOptions(p);
    return res.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nGuia,
        item: e.tercero,
      };
    });
  }

  private async getTipoMovOptions(p?: IPagination) {
    const res = await this.repartoApi.RepartoMov.getTipoMovOptions(p);
    return res.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.idMovimiento,
        item: e.expr1,
      };
    });
  }

  private async getBusClientOptions(p?: IPagination, q?: IQuery) {
    let res: BaseResponse<
      Array<{
        nReparto: number;
        expr1: string;
        fechaMov: string;
      }>
    >;
    if (q.query) {
      res = await this.repartoApi.RepartoMovCons.getBusClientOptionsByQuery(q);
      return res.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nReparto,
          item: [e.nReparto, e.expr1, convertDate(e.fechaMov)].join(' - '),
        };
      });
    }
    res = await this.repartoApi.RepartoMovCons.getBusClientOptions(p);
    return res.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nReparto,
        item: [e.nReparto, e.expr1, convertDate(e.fechaMov)].join(' - '),
      };
    });
  }

  private async afterUpdateBusClient() {
    try {
      const res = await this.repartoApi.RepartoMovCons.afterUpdateBusClient(
        this.busClient,
      );
      this.form = {
        ...res.data,
        fechaMov: convertDate(res.data.fechaMov),
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e?.message);
    }
  }

  private async print() {
    try {
      this.isLoading = true;
      const res = await this.repartoApi.RepartoReports.reparto(this.busClient);
      this.isPdfOpen = true;
      this.pdf = res.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e?.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
