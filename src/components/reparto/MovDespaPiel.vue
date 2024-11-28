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
          <h1 class="title">Relacion Pieles Frescas</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2 pr-48">
          <button class="btn-save" @click="consoliPoduc">
            Consolidado Productos
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addRegistor">
            Adicionar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-delete" @click="viewModalDelete = true">
            Eliminar
          </button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-Clientes-reparto"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="detallesP1-reparto" class="hidden" />
      <input type="radio" name="tab" id="detallesP2-reparto" class="hidden" />
      <input type="radio" name="tab" id="imprimir-reparto" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos-Clientes-reparto">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos Cliente
          </span>
        </label>

        <label for="detallesP1-reparto">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles Despacho Caja
          </span>
        </label>
        <label for="detallesP2-reparto">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Otros Pesos Vehiculo
          </span>
        </label>
        <label for="imprimir-reparto">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Imprimir
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-Cliente-reparto">
        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-1/2">
            <label class="label">Tipos de movimiento:</label>
            <PaginatedSelect
              v-model="movDespaPiel.tipoMov"
              :fetch="fetchTipoMov"
              @change="afterTipoMov"
              :disabled="readonly"
            />
          </div>
          <div class="w-1/2"></div>
          <div class="px-3 mb-6 md:mb-0 md:w-1/2">
            <label class="label">Despacho Pieles No:</label>
            <input
              type="text"
              class="input"
              v-model="movDespaPiel.nDespacho"
              disabled
              maxlength="35"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-10/12">
            <label class="label">Tercero Piel:</label>
            <PaginatedSelect
              v-model="movDespaPiel.codPiel"
              :fetch="fetchCodigoPiel"
              @change="afterCodiPiel"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 md:w-10/12">
            <label class="label">Tercero Destino:</label>
            <PaginatedSelect
              v-model="movDespaPiel.codPielEv"
              :fetch="fetchCodigoPiel"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label"> Transportador: </label>
            <input
              type="text"
              class="input"
              v-model="movDespaPiel.transportador"
              :disabled="readonly"
              maxlength="35"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-10/12">
            <label class="label">Ciudad Envio:</label>
            <PaginatedSelect
              v-model="movDespaPiel.ciudadEnvio"
              :fetch="fetchCiudad"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-10/12">
            <label class="label">Pais Envio:</label>
            <PaginatedSelect
              v-model="movDespaPiel.paisEnvio"
              :fetch="fetchPaises"
              :disabled="readonly"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="movDespaPiel.fechaMov"
              :disabled="readonly"
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Placa Vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="movDespaPiel.placaVeh"
              :disabled="readonly"
              maxlength="8"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-56">
            <label class="label">Conductor: </label>
            <PaginatedSelect
              v-model="movDespaPiel.ccConduct"
              :fetch="fetchCConductoresNit"
              @change="afterConductores"
              :disabled="readonly"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect
              class="mt-4 px-3"
              v-model="movDespaPiel.ccConduct"
              :fetch="fetchCConductoresName"
              @change="afterConductores"
              :disabled="readonly"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detallesP1-reparto">
        <div class="flex flex-row flex-wrap justify-center">
          <div class="mb-6 md:mb-0 mt-2">
            <MovDespaPielGuia
              :key="movDespaPiel.idNDespacho"
              :idNDespacho="movDespaPiel.idNDespacho"
              :readonly="readonly"
              :viewAddRegistro="viewAddRegistro"
            />
          </div>
        </div>
        <div class="flex flex-row flex-wrap justify-center">
          <div class="mb-6 md:mb-0 mt-2">
            <MovDespaPielDt1
              :key="movDespaPiel.idNDespacho"
              :idNDespacho="movDespaPiel.idNDespacho"
              :readonly="readonly"
              :viewAddRegistro="viewAddRegistro"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detallesP2-reparto">
        <MovDespaPielDt2
          :key="movDespaPiel.idNDespacho"
          :idNDespacho="movDespaPiel.idNDespacho"
          :readonly="readonly"
          :viewAddRegistro="viewAddRegistro"
        />
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-imprimir-reparto">
        <div class="flex flex-row flex-wrap w-1/2">
          <div class="flex flex-col flex-wrap">
            <input
              type="number"
              class="input border-red-500 text-red-500"
              placeholder="0"
              maxlength="8"
            />
            <div class="px-3 mb-6 md:mb-0 inline-block relative">
              <label class="label">Despacho:</label>
              <input
                type="text"
                class="input"
                v-model="movDespaPiel.elaboro"
                :disabled="readonly"
                maxlength="4"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Observaciónes:</label>
              <input
                type="text"
                class="input"
                v-model="movDespaPiel.observacion"
                :disabled="readonly"
                maxlength="4"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row flex-wrap w-1/2">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Total Unidades y Kilos: </label>
            <input
              type="text"
              class="input"
              :disabled="readonly"
              maxlength="8"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <input
              type="text"
              class="input mt-4 px-3"
              :disabled="readonly"
              maxlength="8"
            />
          </div>
          <div class="pr-24"></div>
          <button class="btn-save" @click="printMovDespaPiel">
            Reimprimir
          </button>
        </div>

        <div class="pt-4"></div>
        <div class="pt-4"></div>
      </div>

      <hr />
    </div>

    <ModalPDFPreview
      :pdfData="rptReprocesoPdfBase64"
      @close="rptReprocesoPdfBase64 = ''"
      v-if="rptReprocesoPdfBase64.length > 0"
    />

    <!-- Modal Delete conductores -->
    <Modals
      :open-modal="viewModalDelete"
      @Ok="aceptarEliminacion"
      @close="viewModalDelete = false"
    >
      &#x1f6c8; Esta seguro que desea eliminar la Relacion de Pieles Frescas?
    </Modals>
    <!-- end Modal Delete -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import '../../assets/tab.css';
import MovDespaPielGuia from '@/components/reparto/MovDespaPielGuia.vue';
import MovDespaPielDt1 from '@/components/reparto/MovDespaPielDt1.vue';
import MovDespaPielDt2 from '@/components/reparto/MovDespaPielDt2.vue';
import {
  ICodigoPielDespa,
  IMovDespaPiel,
  ITipoMoviento,
} from '@/remote/api/reparto/types';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
import { captureException } from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import moment from 'moment';
import convertDate from '@/utils/convertDate';
import Modals from '@/components/reusable/Modals.vue';
import ReportesRepartoAPI from '@/remote/api/reparto/reportesRepartoAPI';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Modals,
    MovDespaPielDt1,
    MovDespaPielDt2,
    MovDespaPielGuia,
    PaginatedSelect,
  },
  name: 'MovDespaPiel',
})
export default class MovDespaPiel extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewPrintDefinitive: boolean = false;
  private readonly: boolean = true;
  private viewAddRegistro: boolean = true;
  private viewModalDelete: boolean = false;

  private movDespaPiel: IMovDespaPiel = {
    anulado: false,
    fechaMov: '',
    idNDespacho: 0,
    nDespacho: 0,
    tipoMov: 0,
  };

  private duplicaI: string = '';
  private rptReprocesoPdfBase64: string = '';
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

  private consoliPoduc() {
    // TODO: this button about to MovDespaPiel Consolidado Producto
  }

  private addRegistor() {
    this.readonly = false;
    this.viewAddRegistro = false;
  }

  private async printMovDespaPiel() {
    if (!this.movDespaPiel.codPiel) {
      this.showOutput(true, 'Debe Escoger un Tercero Piel');
      return;
    }
    if (!this.movDespaPiel.codPielEv) {
      this.showOutput(true, 'Debe Escoger un Tercero Destino');
      return;
    }
    if (!this.movDespaPiel.fechaMov) {
      this.showOutput(true, 'Debe Digitar la Fecha');
      return;
    }
    if (this.movDespaPiel.anulado) {
      this.duplicaI = 'ANULADA';
      return;
    }
    this.duplicaI = '';
    this.movDespaPiel.imprime = 'S';
    await this.onPrint();
  }

  private async save() {
    if (
      convertDate(this.movDespaPiel.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.movDespaPiel.fechaMov) >
        this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }
    if (this.validateData()) {
      return;
    }
    this.movDespaPiel.fecha = moment().utc().format('YYYY-MM-DD');
    this.movDespaPiel.estacion = this.$store.getters.getUsuario;

    await this.addMovDespaPiel();
  }

  private async aceptarEliminacion() {
    if (!this.movDespaPiel.idNDespacho) {
      this.showOutput(true, 'No hay dato selecionado para eliminar');
      return;
    }
    await this.deleteMovDespaPiel();
    this.viewModalDelete = false;
  }

  private async deleteMovDespaPiel() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDepaPiel.deleteMovDespaPiel(
        this.movDespaPiel.idNDespacho,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.movDespaPiel = {
        anulado: false,
        fechaMov: '',
        idNDespacho: 0,
        nDespacho: 0,
        tipoMov: 0,
      };
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addMovDespaPiel() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDepaPiel.postMovDespaPiel({
        ...this.movDespaPiel,
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

  private async afterConductores() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDepaPiel.getAfterConcuctores(
        this.movDespaPiel.ccConduct,
      );

      if (!this.movDespaPiel.placaVeh) {
        this.movDespaPiel.placaVeh = response.data;
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterCodiPiel() {
    this.movDespaPiel.codPielEv = this.movDespaPiel.codPiel;
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDepaPiel.getAfterCliPiel(
        this.movDespaPiel.codPiel,
      );
      // TODO: this endpoint get on data on table MovDespaPielGuia
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterTipoMov() {
    if (!this.movDespaPiel.tipoMov) {
      return;
    }
    await this.getAfterTipoMov(this.movDespaPiel.tipoMov);
  }

  private async getAfterTipoMov(tipoMov: number) {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movDepaPiel.getAfterTipoMov(tipoMov);
      this.movDespaPiel.idNDespacho = response.data;
      this.movDespaPiel.nDespacho = response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchTipoMov(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.movDepaPiel.getTipoMovOptions(p);
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

  private async fetchCodigoPiel(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.movDepaPiel.getCodigoPiel(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ICodigoPielDespa, 'codiCliente' | 'expr2'>) => ({
          id: e.codiCliente,
          item: e.expr2,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchCiudad(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.movDepaPiel.getCiudad(p);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.idCiudad,
        item: e.descripcionCiu,
      }));
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchPaises(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.movDepaPiel.getPaises(p);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.idPais,
        item: e.descripcionPais,
      }));
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchCConductoresNit(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.movDepaPiel.getcConductores(p);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.nitConduc,
        item: e.nitConduc,
      }));
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetchCConductoresName(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.movDepaPiel.getcConductores(p);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.nitConduc,
        item: e.nombreCond,
      }));
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async onPrint() {
    this.isLoading = true;
    try {
      const rptReproceso = await this.reporteRepartoApi.getRepartoDespaNac(
        this.movDespaPiel.idNDespacho,
      );
      this.rptReprocesoPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private validateData(): boolean {
    if (!this.movDespaPiel.codPiel) {
      this.showOutput(true, 'Debe Escoger un Tercero Piel');
      return true;
    }
    if (!this.movDespaPiel.codPielEv) {
      this.showOutput(true, 'Debe Escoger un Tercero Destino');
      return true;
    }
    if (!this.movDespaPiel.tipoMov) {
      this.showOutput(
        true,
        'Relacion Pieles Frescas no puede ser Cero, Escoja Tipo de Movimiento y Presione Enter',
      );
      return true;
    }
    return false;
  }
}
</script>
