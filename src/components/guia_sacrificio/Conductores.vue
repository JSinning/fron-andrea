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
          <button class="btn-delete" @click="viewModalDelete">Eliminar</button>
        </div>
      </div>

      <div class="card mt-5 pt-3">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Cedula:</label>
            <input
              type="number"
              class="input"
              v-model="nitConduc"
              @change="validateDriver(nitConduc)"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Expedida:</label>
            <input type="text" class="input p-1" v-model="expedida" />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Nombre:</label>
            <input type="text" class="input p-1" v-model="nombreCond" />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Placa:</label>
            <input type="text" class="input p-1" v-model="placaV" />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal delete Conductor -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modaldelete"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta seguro que desea eliminar Al conductor?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalDelete()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalDelete()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal delete Conductor -->
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'Conductores',
})
export default class Conductores extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private modaldelete = false;
  private idEmpresa: number = 0;
  private expedida: string = '';
  private nitConduc: string = '';
  private nombreCond: string = '';
  private placaV: string = '';
  private telefono1: number = 0;
  private telefono2: number = 0;

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private viewModalDelete() {
    this.modaldelete = true;
  }

  private beforeUpdateDriver() {
    this.idEmpresa = this.$store.getters.getTConfinv1.idEmpresa;
  }

  private async acceptModalDelete() {
    if (this.nitConduc === '' || this.nitConduc === null) {
      return;
    }

    await this.deleteDriver(this.nitConduc);
    this.modaldelete = false;
  }

  private async save() {
    this.beforeUpdateDriver();
    if (this.validation()) {
      return;
    }

    await this.addDriver();
  }

  private validation() {
    if (this.nitConduc === '' || this.nitConduc === null) {
      this.showOutput(true, 'La cedula no puede ser vacia');
      return true;
    }

    if (this.nombreCond === '' || this.nombreCond == null) {
      this.showOutput(true, 'El nombre no puede estar vacio');
      return true;
    }

    return false;
  }

  private async addDriver() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postConductores({
        expedida: this.expedida,
        idEmpresa: this.idEmpresa,
        nitConduc: this.nitConduc,
        nombreCond: this.nombreCond,
        placaV: this.placaV,
        telefono1: '',
        telefono2: '',
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
        this.clearData();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private async validateDriver(nitContador: string) {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.getConductores(nitContador);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteDriver(nitConduct: string) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.deleteConductores(nitConduct);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar conductor');
    } finally {
      this.isLoading = false;
    }
  }

  private clearData() {
    this.idEmpresa = 0;
    this.nitConduc = '';
    this.expedida = '';
    this.nombreCond = '';
    this.placaV = '';
    this.telefono1 = 0;
    this.telefono2 = 0;
  }
}
</script>
