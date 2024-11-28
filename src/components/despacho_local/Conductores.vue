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
          <h1 class="title">Conductores</h1>
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
            <label class="label">Cedula:</label>
            <input
              type="text"
              class="input"
              v-model="Iconductores.nitConduc"
              @change="afterUpdateConductores"
              ref="nitConduc"
              maxlength="15"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Expedida:</label>
            <input
              type="text"
              class="input p-1"
              v-model="Iconductores.expedida"
              maxlength="15"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Nombre:</label>
            <input
              type="text"
              class="input p-1"
              v-model="Iconductores.nombreCond"
              maxlength="35"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Placa:</label>
            <input
              type="text"
              class="input p-1"
              v-model="Iconductores.placaV"
              maxlength="8"
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
      &#x1f6c8; Esta seguro que desea eliminar Al conductor?
    </Modals>
    <!-- end Modal Delete -->
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import { IConductores } from '@/remote/api/despacho_local/types';
import { captureException } from '@sentry/browser';
import moment from 'moment';
import Modals from '@/components/reusable/Modals.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    Modals,
  },
  name: 'Conductores',
})
export default class Conductores extends Vue {
  @Ref('nitConduc') public readonly nitConduc: HTMLInputElement;
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewModalDelete: boolean = false;

  private Iconductores: IConductores = {
    expedida: '',
    fecha: '',
    idEmpresa: 0,
    nitConduc: '',
    nombreCond: '',
    placaV: '',
    usuario: '',
  };

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private clearOutput() {
    this.output = '';
  }

  private async aceptarEliminacion() {
    if (!this.Iconductores.nitConduc) {
      this.showOutput(true, 'Debe digitar el nit del conductor a eliminar');
      return;
    }
    await this.deleteConductores();
    this.viewModalDelete = false;
    this.clearData();
  }

  private async save() {
    if (this.validation()) {
      return;
    }
    this.Iconductores.idEmpresa = this.$store.getters.getTConfinv1.idEmpresa;
    this.Iconductores.usuario = this.$store.getters.getUsuario;
    this.Iconductores.fecha = moment().utc().format('YYYY-MM-DD');
    await this.addConductores();
  }

  private async addConductores() {
    try {
      const response = await this.despachoLocalApi.postConductores(
        this.Iconductores,
      );
      if (response.statusCode) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async deleteConductores() {
    try {
      const response = await this.despachoLocalApi.deleteConductores(
        this.Iconductores,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
      this.nitConduc.focus();
    }
  }

  private async afterUpdateConductores() {
    try {
      await this.despachoLocalApi.postAfterUpdateConductores(this.Iconductores);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
      this.nitConduc.focus();
    }
  }

  private validation(): boolean {
    if (!this.Iconductores.nitConduc) {
      this.showOutput(true, 'La cedula no puede ser vacia');
      return true;
    }

    if (!this.Iconductores.nombreCond) {
      this.showOutput(true, 'El nombre no puede estar vacio');
      return true;
    }

    return false;
  }

  private clearData() {
    this.Iconductores = {
      expedida: '',
      fecha: '',
      idEmpresa: 0,
      nitConduc: '',
      nombreCond: '',
      placaV: '',
      usuario: '',
    };
  }
}
</script>
