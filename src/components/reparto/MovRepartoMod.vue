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
          <button class="btn-save" @click="search = !search">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="modificar">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anualdo">Anular</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="cambEstado">Cambiar Estado</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="rePrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-basicos-movR"
        class="hidden"
        checked
        ref="datosBasicos"
      />
      <input type="radio" name="tab" id="detalles-movR" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anualar-movR"
        class="hidden"
        v-if="pgAnualado"
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
            v-if="pgAnualado"
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
              v-model="ImovRepartoMod.tipoMov"
              :fetch="fetchTipoMov"
              :disabled="readonly"
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
                v-model="ImovRepartoMod.prefijo"
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
              @change="ativeRegister"
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
              v-model="ImovRepartoMod.fechaMov"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Elaboro:</label>
            <input
              type="text"
              class="input"
              maxlength="30"
              v-model="ImovRepartoMod.elaboro"
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
              v-model="ImovRepartoMod.observacion"
              :disabled="readonly"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/3">
            <label class="label">N-Anim</label>
            <input
              type="text"
              class="input"
              v-model="nAnim"
              disabled
              maxlength="12"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-movR">
        <SubReparto
          :key="nReparto"
          :nReparto="nReparto"
          :nGuia="ImovRepartoMod.nGuia"
          :nAnimal="nAnim"
          :readonly="readonly"
          :viewAddRegistro="viewAddRegistro"
        />
      </div>

      <div
        class="card mt-0 pt-3 px-10 hidden tab-anualar-movR"
        v-if="pgAnualado"
      >
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input
                class="checkBox"
                type="checkbox"
                maxlength="1"
                v-model="anular"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                maxlength="30"
                v-model="motivoAnul1"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <button class="btn-save" @click="anula">Anular</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-estado-movR" v-if="pgEstado">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Estado:</label>
              <select class="select" v-model="estado1">
                <option v-for="d in itemsEstado" :key="d.id" :value="d.id">
                  {{ d.item }}
                </option>
              </select>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo Estado:</label>
              <input type="text" class="input" v-model="motivoEstado1" />
            </div>
            <div class="md:w-full md:ml-0 px-3 mb-6 md:mb-0">
              <button class="btn-save p-2" @click="estado">
                Cambiar Estado
              </button>
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
      @close="pdfData = ''"
      v-if="pdfData.length > 0"
    />
    <!-- Modal Anualar -->
    <Modals
      :open-modal="viewModalAnula"
      @Ok="aceptarAnaular"
      @close="viewModalAnula = false"
    >
      Va Anular este Documento este proceso es irreversible
    </Modals>
    <!-- end Modal Anualar -->
    <!-- Modal Estado -->
    <Modals
      :open-modal="viewModalEstado"
      @Ok="aceptarEstados"
      @close="viewModalEstado = false"
    >
      Va a Cambiar el Estado del Documento
    </Modals>
    <!-- end Modal Estado -->
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import SubReparto from '@/components/reparto/SubReparto.vue';
import '../../assets/tab.css';
import {
  IBuscarClientesMod,
  INGuiaOptions,
  INitoCod,
  IRpReparto,
  ITipoMoviento,
} from '@/remote/api/reparto/types';
import IPagination from '@/types/IPagination';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import convertDate from '@/utils/convertDate';
import { captureException } from '@sentry/browser';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import Modals from '@/components/reusable/Modals.vue';
import moment from 'moment';
import ReportesRepartoAPI from '@/remote/api/reparto/reportesRepartoAPI';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Modals,
    PaginatedSelect,
    SubReparto,
  },
  name: 'MovRepartoMod',
})
export default class MovRepartoMod extends Vue {
  @Ref('datosBasicos') public datosBasicos: HTMLInputElement;
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private search: boolean = false;
  private readonly: boolean = true;
  private viewAddRegistro: boolean = true;
  private pgAnualado: boolean = false;
  private pgEstado: boolean = false;
  private viewModalAnula: boolean = false;
  private viewModalEstado: boolean = false;

  private nReparto: number = 0;
  private duplicaI: string = '';
  private anular: boolean = false;
  private motivoAnul1: string = '';
  private estado1: string = '';
  private motivoEstado1: string = '';
  private loteNo: string = '';
  private nitoCC: string = '';
  private nitoCCod: string = '';
  private nitoCCPP: string = '';
  private nAnim: number = 0;
  private nGuia: string = '';
  private pdfData: string = '';
  private query: IQuery = {
    query: '',
  };

  private itemsEstado: IInterfaceSelect[] = [];

  private ImovRepartoMod: IRpReparto = {
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

  private mounted() {
    this.fetchEstado();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private get status() {
    return this.ImovRepartoMod.anulado ? 'ANULADO' : '';
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

  private cambEstado() {
    if (
      convertDate(this.ImovRepartoMod.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.ImovRepartoMod.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (this.ImovRepartoMod.anulado) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }

    this.pgEstado = true;
    this.estado1 = this.ImovRepartoMod.estado;
    this.motivoEstado1 = this.ImovRepartoMod.motivoEstado;
  }

  private anualdo() {
    if (
      convertDate(this.ImovRepartoMod.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.ImovRepartoMod.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (this.ImovRepartoMod.anulado) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }

    this.pgAnualado = true;
    this.anular = false;
  }

  private async rePrint() {
    if (this.ImovRepartoMod.anulado) {
      this.duplicaI = 'ANULADO';
      return;
    }
    this.duplicaI = 'DUPLICADO';

    await this.reportReparto();
  }

  private async aceptarAnaular() {
    this.ImovRepartoMod.anulado = true;
    this.ImovRepartoMod.motivoAnul = this.motivoAnul1;
    this.ImovRepartoMod.estado = '9';
    this.ImovRepartoMod.motivoEstado = this.motivoAnul1;
    this.ImovRepartoMod.usuario = this.$store.getters.getUsuario;
    this.ImovRepartoMod.imprime = 'S';
    this.ImovRepartoMod.fecha = moment().utc().format('YYYY-MM-DD');
    await this.updateMovRepartoMod();
    this.viewModalAnula = false;
    this.pgAnualado = false;
    this.datosBasicos.click();
  }

  private async aceptarEstados() {
    this.ImovRepartoMod.estado = this.estado1;
    this.ImovRepartoMod.motivoEstado = this.motivoEstado1;
    this.ImovRepartoMod.usuario = this.$store.getters.getUsuario;
    this.ImovRepartoMod.fecha = moment().utc().format('YYYY-MM-DD');
    await this.updateMovRepartoMod();
    this.viewModalEstado = false;
    this.pgEstado = false;
    this.datosBasicos.click();
  }

  private estado() {
    if (!this.estado1) {
      this.showOutput(true, 'Para Cambiar el Estado debe escoger uno');
      return;
    }
    if (!this.motivoEstado1) {
      this.showOutput(true, 'Para Cambiar el Estado debe digitar el motivo');
      return;
    }

    this.viewModalEstado = true;
  }

  private anula() {
    if (!this.anular) {
      this.showOutput(
        true,
        'Para anular el Documento debe hacer clik en anular',
      );
      return;
    }
    if (!this.motivoAnul1) {
      this.showOutput(true, 'Para anular el Documento debe digitar el motivo');
      return;
    }
    this.viewModalAnula = true;
  }

  private modificar() {
    if (
      convertDate(this.ImovRepartoMod.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.ImovRepartoMod.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }
    if (this.ImovRepartoMod.anulado) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }
    if (this.ImovRepartoMod.procesado) {
      this.showOutput(true, 'Documento Confirmado');
      return;
    }
    this.readonly = false;
    this.ImovRepartoMod.imprime = 'N';
  }

  private afterNGuia() {
    let datos = this.nGuia.split(' - ');
    this.ImovRepartoMod.nGuia = parseInt(datos[0], 10);
    this.loteNo = datos[1];
    this.nitoCC = datos[2];
    this.nitoCCod = datos[2];
    this.nitoCCPP = datos[2];
    this.nAnim = parseInt(datos[3], 10);
  }

  private async ativeRegister() {
    this.afterNGuia();
    if (this.ImovRepartoMod.nGuia) {
      if ((await this.countAnim()) > this.nAnim) {
        this.showOutput(true, 'Ya se ingresaron todos los animales');
        return;
      }
    }
  }

  private async countAnim(): Promise<number> {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movRepartoMod.getCountAnim(
        this.ImovRepartoMod.nGuia,
      );

      return response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async save() {
    if (this.validateData(this.ImovRepartoMod)) {
      return;
    }

    this.ImovRepartoMod.fecha = moment().utc().format('YYYY-MM-DD');

    await this.updateMovRepartoMod();
  }

  private async updateMovRepartoMod() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movRepartoMod.putMovRepartoMod(
        { ...this.ImovRepartoMod },
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

  private async afterBuscarCliente(id: number) {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movRepartoMod.getAfterBuscarCliente(id);
      if (response.data.anulado) {
        this.showOutput(true, 'Movimiento Anulado');
        return;
      }
      this.ImovRepartoMod = response.data;
      this.ImovRepartoMod.fechaMov = convertDate(this.ImovRepartoMod.fechaMov);
      this.search = false;
      this.pgEstado = false;
      this.pgAnualado = false;
      this.datosBasicos.click();
      await this.findNGuia();
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async findNGuia() {
    this.query.query = this.ImovRepartoMod.nGuia.toString();

    const response = await this.repartoApi.repartoMov.getNGuiaOptionsFind(
      this.query,
    );

    this.nGuia = [
      response.data[0].nGuia,
      response.data[0].nLote,
      response.data[0].nitTercero,
      response.data[0].noAnimales,
    ].join(' - ');
    await this.afterNGuia();
  }

  private async buscarcliente(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IBuscarClientesMod, 'nReparto' | 'expr1' | 'fechaMov'>>
      >;
      if (q.query) {
        response = await this.repartoApi.movRepartoMod.getBuscarClientesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IBuscarClientesMod, 'nReparto' | 'expr1' | 'fechaMov'>) => ({
            id: e.nReparto,
            item: `${e.nReparto} - ${e.expr1} - ${convertDate(e.fechaMov)}`,
          }),
        );
      }
      response = await this.repartoApi.movRepartoMod.getBuscarClientes(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IBuscarClientesMod, 'nReparto' | 'expr1' | 'fechaMov'>) => ({
          id: e.nReparto,
          item: `${e.nReparto} - ${e.expr1} - ${convertDate(e.fechaMov)}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
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
    const numbre: string[] = q.query.split(' - ');
    q.query = numbre[0];
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

  private async reportReparto() {
    if (!this.nReparto) {
      this.showOutput(true, 'Debe escoger un reparto para imprimir');
      return;
    }
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
}
</script>
