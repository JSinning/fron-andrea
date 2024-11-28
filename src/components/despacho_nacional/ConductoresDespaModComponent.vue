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
            <h1 class="title">Modificacion conductores</h1>
          </div>
          <div class="md:w-15 pl-64 mb-6 md:mb-0" v-if="RelaBusca">
            <label class="label">
              Busqueda:
              <select
                class="select"
                v-model="nitCon"
                @change="searchConductorByNit()"
              >
                <option
                  v-for="(item, index) in itemConduct"
                  :key="index"
                  :value="item.nitConduc"
                >
                  {{ item.nombreCond }}
                </option>
              </select>
            </label>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-save" @click="RelaBusca = !RelaBusca">
              Buscar
            </button>
            <button class="btn-save" @click="modificar()">Modificar</button>
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
                v-model="nitConduc"
                :readonly="readonly"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Expedidad:</label>
              <input
                type="text"
                class="input"
                v-model="expedida"
                :readonly="readonly"
              />
            </div>
          </div>

          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Nombre:</label>
              <input
                type="text"
                class="input"
                v-model="nombreCond"
                :readonly="readonly"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Placa:</label>
              <input
                type="text"
                class="input"
                v-model="placaV"
                :readonly="readonly"
              />
            </div>
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
              >&#x1f6c8; Esta seguro que desea eliminar el conductor?</strong
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
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import { Component, Vue } from 'vue-property-decorator';

import moment from 'moment';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ConductoresDespaMod',
})
export default class ConductoresDespaModComponent extends Vue {
  private RelaBusca: boolean = false;
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private readonly: boolean = false;
  private modaldelete = false;

  private nitCon: string = '';

  private idEmpresa: number = 0;
  private nitConduc: string = '';
  private expedida: string = '';
  private nombreCond: string = '';
  private placaV: string = '';
  private telefono1: number = 0;
  private telefono2: number = 0;
  private fecha: string = '';
  private usuario: string = '';

  private itemConduct: any = [];

  private despachoModConductApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.openFrom();
    this.searchConductor();
  }

  private openFrom() {
    this.readonly = true;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private viewModalDelete() {
    this.modaldelete = true;
  }

  private async buttonModalSi() {
    if (this.nitConduc === '' || this.nitConduc === null) {
      return;
    }

    await this.deleteConductor(this.nitConduc);
    this.modaldelete = false;
  }

  private async searchConductor() {
    this.isLoading = true;
    try {
      const response = await this.despachoModConductApi.getConductores();

      this.itemConduct = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar los conductores');
    } finally {
      this.isLoading = false;
    }
  }

  private async searchConductorByNit() {
    try {
      const response = await this.despachoModConductApi.getCConductor(
        this.nitCon,
      );

      this.idEmpresa = response.data.idEmpresa;
      this.nitConduc = response.data.nitConduc;
      this.expedida = response.data.expedida;
      this.nombreCond = response.data.nombreCond;
      this.placaV = response.data.placaV;
      this.telefono1 = response.data.telefono1;
      this.telefono2 = response.data.telefono2;
      this.fecha = moment(response.data.fecha).utc().format('YYYY-MM-DD');
      this.usuario = response.data.usuario;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al byuscar los conductores');
    }
  }

  private modificar() {
    this.readonly = false;
  }

  private beforeUpdateConduc() {
    this.idEmpresa = this.$store.getters.getTConfinv1.idEmpresa;
    this.fecha = moment().utc().format('YYYY-MM-DD');
  }

  private async guardar() {
    this.beforeUpdateConduc();
    if (this.validation()) {
      return;
    }
    await this.updateConduc(this.nitConduc);
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

  private async updateConduc(nitConduc: string) {
    this.isLoading = true;
    try {
      const response = await this.despachoModConductApi.putConduct(nitConduc, {
        expedida: this.expedida,
        fecha: this.fecha,
        idEmpresa: this.idEmpresa,
        nitConduc: this.nitConduc,
        nombreCond: this.nombreCond,
        placaV: this.placaV,
        telefono1: this.telefono1,
        telefono2: this.telefono2,
        usuario: this.$store.getters.getUsuario,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar datos del conductor');
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteConductor(nitConduct: string) {
    this.isLoading = true;
    try {
      const response =
        await this.despachoModConductApi.deleteConduct(nitConduct);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
      }

      this.itemConduct = [];
      await this.searchConductor();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar conductor');
    } finally {
      this.isLoading = false;
    }
  }

  private clearData() {
    this.idEmpresa = 0;
    this.expedida = '';
    this.nitConduc = '';
    this.nombreCond = '';
    this.placaV = '';
    this.telefono1 = 0;
    this.telefono2 = 0;
    this.fecha = '';
  }
}
</script>
