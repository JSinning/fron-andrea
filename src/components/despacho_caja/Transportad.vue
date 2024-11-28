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
        <div class="px-3 md:w-1/3 mt-2 mb-6 md:mb-0">
          <h1 class="title">Transportador</h1>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-delete" @click="viewModalDelete = true">
            Eliminar
          </button>
        </div>
      </div>

      <div class="card mt-5 pt-3">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Codigo:</label>
            <input
              type="text"
              class="input"
              v-model="transportad.idTransporta"
              @change="afterUpdateTransportad"
              ref="idTransporta"
              maxlength="15"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Descripcion:</label>
            <input
              type="text"
              class="input p-1"
              v-model="transportad.desctransport"
              maxlength="50"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Direccion:</label>
            <input
              type="text"
              class="input p-1"
              v-model="transportad.direcTranspor"
              maxlength="50"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Telefono:</label>
            <input
              type="text"
              class="input p-1"
              v-model="transportad.telTranspor"
              maxlength="12"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Delete conductores -->
    <Modals
      :open-modal="viewModalDelete"
      @Ok="aceptarEliminacion"
      @close="viewModalDelete = false"
    >
      &#x1f6c8; Esta seguro que desea eliminar Al Transportador?
    </Modals>
    <!-- end Modal Delete -->
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import Modals from '@/components/reusable/Modals.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import { ITransportad } from '@/remote/api/despacho_caja/types';
import { captureException } from '@sentry/browser';
import moment from 'moment';
@Component({
  components: {
    AlertBox,
    Loader,
    Modals,
  },
  name: 'Transportad',
})
export default class Transportad extends Vue {
  @Ref('idTransporta') public readonly idTransporta: HTMLInputElement;
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewModalDelete: boolean = false;

  private transportad: ITransportad = {
    desctransport: '',
    direcTranspor: '',
    idTransporta: '',
    telTranspor: '',
  };

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async aceptarEliminacion() {
    if (!this.transportad.idTransporta) {
      this.showOutput(true, 'Debe digitar el id del Transportador a eliminar');
      return;
    }
    await this.deleteTransportad();
    this.viewModalDelete = false;
    this.clearData();
  }

  private async save() {
    if (this.validateData()) {
      return;
    }
    this.transportad.usuaCrea = this.$store.getters.getUsuario;
    this.transportad.fechaCrea = moment.utc().format('YYYY-MM-DD');
    await this.addTransportad();
  }

  private async deleteTransportad() {
    try {
      const response = await this.despachoCajaApi.deleteTransportad(
        this.transportad,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
      this.idTransporta.focus();
    }
  }

  private async addTransportad() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.postTransportad(
        this.transportad,
      );

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterUpdateTransportad() {
    try {
      await this.despachoCajaApi.getAfterUpdateTransportad(this.transportad);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
      this.idTransporta.focus();
    }
  }

  private clearOutput() {
    this.output = '';
  }

  private validateData(): boolean {
    if (!this.transportad.idTransporta) {
      this.showOutput(true, 'El codigo no puede ser vacia');
      return true;
    }

    if (!this.transportad.desctransport) {
      this.showOutput(true, 'La descripcion no puede estar vacio');
      return true;
    }

    if (!this.transportad.direcTranspor) {
      this.showOutput(true, 'La direccion no puede estar vacio');
      return true;
    }

    if (!this.transportad.telTranspor) {
      this.showOutput(true, 'El telefono no puede estar vacio');
      return true;
    }

    return false;
  }

  private clearData() {
    this.transportad = {
      desctransport: '',
      direcTranspor: '',
      idTransporta: '',
      telTranspor: '',
    };
  }
}
</script>
