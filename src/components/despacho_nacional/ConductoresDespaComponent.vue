<template>
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div">
      <div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
            <h1 class="title">Conductores</h1>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-primary" @click="clearData()">Nuevo</button>
            <button class="btn-primary" @click="guardar()">Guardar</button>
            <button class="btn-delete" @click="viewModalDelete()">
              Eliminar
            </button>
          </div>
        </div>

        <div class="card">
          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Cedula:</label>
              <input
                type="text"
                class="input"
                v-model="nitConduct"
                @change="contaNit()"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Expedida:</label>
              <input type="text" class="input" v-model="expedida" />
            </div>
          </div>

          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Nombre:</label>
              <input type="text" class="input" v-model="nombreCond" />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Placa:</label>
              <input type="text" class="input" v-model="placaV" />
            </div>
          </div>
        </div>
      </div>

      <hr />

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
                    <button class="btn-succes" @click="buttonModalSi()">
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
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';

import moment from 'moment';

import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ConductoresDespa',
})
export default class ConductoresDespaComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private modaldelete = false;

  private idEmpresa: number = 0;
  private nitConduct: string = '';
  private expedida: string = '';
  private nombreCond: string = '';
  private placaV: string = '';
  private telefono1: number = 0;
  private telefono2: number = 0;
  private fecha: string = '';

  private despaNacConductApi = new DespachoNacionalApi(
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

  private async contaNit() {
    const X: number = await this.nitConConta();

    if (X > 0) {
      this.showOutput(true, 'El Conductor ya Existe');
      this.nitConduct = '';
    }
  }

  private async nitConConta() {
    try {
      const response = await this.despaNacConductApi.getCConductor(
        this.nitConduct,
      );

      if (response.statusCode === 200) {
        return 1;
      }
    } catch (e) {
      Sentry.captureException(e);
      return -1;
    }
  }

  private beforeUpdateConduc() {
    this.idEmpresa = this.$store.getters.getTConfinv1.idEmpresa;
    this.fecha = moment().utc().format('YYYY-MM-DD');
  }

  private viewModalDelete() {
    this.modaldelete = true;
  }

  private async buttonModalSi() {
    if (this.nitConduct === '' || this.nitConduct === null) {
      return;
    }

    await this.deleteConductor(this.nitConduct);
    this.modaldelete = false;
  }

  private async guardar() {
    this.beforeUpdateConduc();
    if (this.validation()) {
      return;
    }

    await this.addConductor();
  }

  private validation() {
    if (this.nitConduct === '' || this.nitConduct === null) {
      this.showOutput(true, 'La cedula no puede ser vacia');
      return true;
    }

    if (this.nombreCond === '' || this.nombreCond == null) {
      this.showOutput(true, 'El nombre no puede estar vacio');
      return true;
    }

    return false;
  }

  private async addConductor() {
    this.isLoading = true;
    try {
      const response = await this.despaNacConductApi.postConduct({
        expedida: this.expedida,
        fecha: this.fecha,
        idEmpresa: this.idEmpresa,
        nitConduc: this.nitConduct,
        nombreCond: this.nombreCond,
        placaV: this.placaV,
        telefono1: this.telefono1,
        telefono2: this.telefono2,
        usuario: this.$store.getters.getUsuario,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
        this.clearData();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al Guardar Conductor');
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteConductor(nitConduct: string) {
    this.isLoading = true;
    try {
      const response = await this.despaNacConductApi.deleteConduct(nitConduct);

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
    this.nitConduct = '';
    this.expedida = '';
    this.nombreCond = '';
    this.placaV = '';
    this.telefono1 = 0;
    this.telefono2 = 0;
    this.fecha = '';
  }
}
</script>
