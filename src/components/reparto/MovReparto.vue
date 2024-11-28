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
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addRegister">
            Adicionar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-delete">Eliminar</button>
        </div>
      </div>

      <div class="p-4"></div>

      <div class="card mt-0 pt-3 px-10">
        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-1/2"></div>
          <div class="px-3 mb-6 md:mb-0 md:w-1/2">
            <label class="label">Tipos de Movimiento::</label>
            <PaginatedSelect
              v-model="ImovReparto.tipoMov"
              :fetch="fetchTipoMov"
              :disabled="readonly"
              @change="onExitTipoMov"
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
                v-model="ImovReparto.prefijo"
                disabled
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-40">
              <input
                type="text"
                class="input"
                maxlength="4"
                v-model="nReparto"
                disabled
              />
            </div>
          </div>
          <div class="px-3 mb-6 md:mb-0 md:w-2/6">
            <label class="label">No Guia:</label>
            <PaginatedSelect
              v-model="nGuia"
              :fetch="fetchNGuia"
              @change="afterNGuia"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 md:w-1/3">
            <label class="label">Lote:</label>
            <input
              type="text"
              class="input"
              maxlength="4"
              v-model="loteNo"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
            <label class="label">Codigo C.C. ó Nit: </label>
            <input type="text" class="input" v-model="nitoCC" disabled />
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/3">
            <label class="label">Codigo C.C. ó Nit: </label>
            <PaginatedSelect
              v-model="nitoCCod"
              :fetch="fetchNitoCod"
              disabled
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect
              v-model="nitoCCPP"
              :fetch="fetchNitoCodPP"
              class="mt-4 px-3"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              maxlength="4"
              v-model="ImovReparto.fechaMov"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Elaboro:</label>
            <input
              type="text"
              class="input"
              maxlength="30"
              v-model="ImovReparto.elaboro"
              :disabled="readonly"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-8/12">
            <label class="label">Observaciones:</label>
            <input
              type="text"
              class="input"
              maxlength="50"
              v-model="ImovReparto.observacion"
              :disabled="readonly"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/3">
            <label class="label">N-Anim</label>
            <input
              type="text"
              class="input"
              v-model="nAnim"
              maxlength="12"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="p-4"></div>

      <div class="flex flex-row flex-wrap w-full pt-3">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-8/12">
          <label class="label">Detalles:</label>
        </div>
      </div>

      <SubReparto
        :key="nReparto"
        :nReparto="nReparto"
        :nAnimal="nAnim"
        :nGuia="ImovReparto.nGuia"
        :viewAddRegistro="viewAddRegistro"
        :readonly="readonly"
      />
      <hr />

      <div class="flex flex-row flex-wrap w-full pt-3">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
          <button class="btn-save px-20" @click="printPreliminar">
            Documento Preliminar
          </button>
        </div>
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
          <button class="btn-save px-20" @click="printDefinitivo">
            Documento Definitivo
          </button>
        </div>
      </div>
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="pdfData = ''"
      v-if="pdfData.length > 0"
    />

    <Modals
      :open-modal="viewModalDefinitivo"
      @Ok="aceptarDefinitivo"
      @close="viewModalDefinitivo = false"
    >
      Esta Seguro de Confirmar el Reparto No {{ nReparto }}
    </Modals>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import SubReparto from '@/components/reparto/SubReparto.vue';
import { captureException } from '@sentry/browser';
import IPagination from '@/types/IPagination';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import {
  INGuiaOptions,
  INitoCod,
  IRpReparto,
  ITipoMoviento,
} from '@/remote/api/reparto/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import convertDate from '@/utils/convertDate';
import moment from 'moment';
import ReportesRepartoAPI from '@/remote/api/reparto/reportesRepartoAPI';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import Modals from '@/components/reusable/Modals.vue';
@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Modals,
    PaginatedSelect,
    SubReparto,
  },
  name: 'MovReparto',
})
export default class MovReparto extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewModalDefinitivo: boolean = false;
  private viewAddRegistro: boolean = true;
  private readonly: boolean = true;

  private nReparto: number = 0;
  private duplicaI: string = '';
  private loteNo: string = '';
  private nitoCC: string = '';
  private nitoCCod: string = '';
  private nitoCCPP: string = '';
  private nAnim: number = 0;
  private nGuia: string = '';
  private pdfData: string = '';

  private ImovReparto: IRpReparto = {
    anulado: false,
    estado: '',
    fechaMov: '',
    mCodResUsua: false,
    nGuia: 0,
    nReparto: 0,
    procesado: false,
    tipoMov: 0,
  };

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
  private addRegister() {
    this.nitoCC = '';
    this.nitoCCod = '';
    this.nitoCCPP = '';
    this.readonly = false;
    this.viewAddRegistro = false;
  }

  private async printPreliminar() {
    if (!this.nReparto) {
      this.showOutput(true, 'Debe escoger un reparto para imprimir');
      return;
    }
    if ((await this.countReparto()) >= 1) {
      this.showOutput(true, 'No se han Actualizado todos los Registros');
      return;
    }
    this.ImovReparto.imprime = 'S';
    await this.updateMovRepartoMod();
    await this.reportReparto();
  }

  private async printDefinitivo() {
    if (this.ImovReparto.procesado) {
      await this.reportReparto();
      return;
    }

    this.viewModalDefinitivo = true;
  }

  private async aceptarDefinitivo() {
    this.ImovReparto.procesado = true;
    await this.updateMovRepartoMod();
    await this.reportReparto();
    this.viewModalDefinitivo = false;
  }

  private async eliminarReparto() {
    if (this.ImovReparto.procesado) {
      this.showOutput(
        true,
        'No se permite Eliminar Registros Confirmados. Consulte con el Administrador del Sistema',
      );
      return;
    }

    await this.deleteMovReparto();
    this.nReparto = 0;
    this.nitoCC = '';
    this.nitoCCod = '';
    this.nitoCCPP = '';
    this.readonly = true;
    this.loteNo = '';
    this.nGuia = '';
    this.nAnim = 0;
    this.viewAddRegistro = true;
    this.ImovReparto = {
      anulado: false,
      estado: '',
      fechaMov: '',
      mCodResUsua: false,
      nGuia: 0,
      nReparto: 0,
      procesado: false,
      tipoMov: 0,
    };
  }

  private async save() {
    this.ImovReparto.nReparto = this.nReparto;
    if (this.validateData(this.ImovReparto)) {
      return;
    }
    this.ImovReparto.fecha = moment().utc().format('YYYY-MM-DD');

    await this.addMovReparto();
    await this.onAfterUpdate(this.ImovReparto.nReparto, this.ImovReparto.nGuia);
  }

  private async onAfterUpdate(nReparto: number, nGuia: number) {
    this.isLoading = true;
    try {
      await this.repartoApi.repartoMov.putOnAfterUpdateForm(nReparto, nGuia);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updateMovRepartoMod() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.repartoMov.putMovReparto(
        { ...this.ImovReparto },
        this.nReparto,
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

  private async addMovReparto() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.repartoMov.postMovReparto({
        ...this.ImovReparto,
      });

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

  private async afterNGuia() {
    let datos = this.nGuia.split(' - ');
    this.ImovReparto.nGuia = parseInt(datos[0], 10);
    this.loteNo = datos[1];
    this.nitoCC = datos[2];
    this.nitoCCod = datos[2];
    this.nitoCCPP = datos[2];
    this.nAnim = parseInt(datos[3], 10);

    if (this.ImovReparto.nGuia) {
      if ((await this.countAnim()) > this.nAnim) {
        this.showOutput(true, 'Ya se ingresaron todos los animales');
        return;
      }
    }
  }

  private async countAnim(): Promise<number> {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.repartoMov.getCountAnim(
        this.ImovReparto.nGuia,
      );

      return response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onExitTipoMov() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.repartoMov.getOnExitTipoMov(
        this.ImovReparto.tipoMov,
      );
      this.ImovReparto.prefijo = response.data.prefijo;
      this.nReparto = response.data.nReparto;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchNitoCodPP(p?: IPagination, q?: IQuery) {
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

  private async fetchNitoCod(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<INitoCod, 'codProveedor' | 'nitoCc'>>
      >;
      if (q.query) {
        response = await this.repartoApi.repartoMov.getNitoCodOptionsFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<INitoCod, 'codProveedor' | 'nitoCc'>) => ({
            id: e.codProveedor,
            item: e.nitoCc,
          }),
        );
      }
      response = await this.repartoApi.repartoMov.getNitoCodOptions(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<INitoCod, 'codProveedor' | 'nitoCc'>) => ({
          id: e.codProveedor,
          item: e.nitoCc,
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
        Array<
          Pick<INGuiaOptions, 'nGuia' | 'nLote' | 'nitTercero' | 'noAnimales'>
        >
      >;
      if (q.query) {
        response = await this.repartoApi.repartoMov.getNGuiaOptionsFind(q);
        return response.data.map<IInterfaceSelect>(
          (
            e: Pick<
              INGuiaOptions,
              'nGuia' | 'nLote' | 'nitTercero' | 'noAnimales'
            >,
          ) => ({
            id: [e.nGuia, e.nLote, e.nitTercero, e.noAnimales].join(' - '),
            item: e.nGuia,
          }),
        );
      }
      response = await this.repartoApi.repartoMov.getNGuiaOptions(p);
      return response.data.map<IInterfaceSelect>(
        (
          e: Pick<
            INGuiaOptions,
            'nGuia' | 'nLote' | 'nitTercero' | 'noAnimales'
          >,
        ) => ({
          id: [e.nGuia, e.nLote, e.nitTercero, e.noAnimales].join(' - '),
          item: e.nGuia,
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

  private async deleteMovReparto() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.repartoMov.deleteMovReparto(
        this.nReparto,
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

  private async countReparto(): Promise<number> {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.repartoMov.getCountOfNotUpdatedRecords(
          this.nReparto,
        );
      return response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async reportReparto() {
    this.isLoading = true;
    try {
      const pdf2 = await this.reporteRepartoApi.getReparto(this.nReparto);
      this.pdfData = pdf2.data;
      this.isLoading = false;
    } catch (e) {
      captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private validateData(data: IRpReparto): boolean {
    if (
      convertDate(data.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(data.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (!data.nReparto) {
      this.showOutput(
        true,
        'El Movimiento no puede ser Cero, Escoja Tipo de Movimiento y Presione Enter',
      );
      return true;
    }

    if (!data.nGuia) {
      this.showOutput(true, 'El No de Guia no puede ser Cero');
      return true;
    }
    return false;
  }
}
</script>
