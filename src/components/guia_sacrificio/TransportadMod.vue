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
        <div class="px-3 md:w-2/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Conductores</h1>
        </div>
        <div
          class="px-3 md:w-1/5 mt-2 mb-3 md:mb-0"
          style="margin-right: 3px"
          v-if="search"
        >
          <label class="label">Busqueda:</label>
          <select
            class="select-rounded w-full px-1 py-1"
            v-model="idTransporta"
            @change="searchTransportadId(idTransporta)"
          >
            <option
              v-for="(item, index) in transportadSearch"
              :key="index"
              :value="item.idTransporta"
            >
              {{ item.desctransport }} - {{ item.idTransporta }}
            </option>
          </select>
        </div>

        <div class="md:w-5/6 px-3 mb-3 md:mb-0 mt-2">
          <button class="btn-save" @click="search = !search">Buscar</button>
          <button class="btn-primary" @click="update">Modificar</button>
          <button class="btn-save" @click="updateTransportad">Guardar</button>
          <button class="btn-delete" @click="viewModalDelete">Eliminar</button>
        </div>
      </div>

      <div class="card mt-5 pt-3">
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Codigo</label>
          <input
            type="text"
            class="input"
            v-model="idTransporta"
            :readonly="readonly"
            @change="validateTanportad(idTransporta)"
          />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Descripcion</label>
          <input
            type="text"
            class="input"
            v-model="desctransport"
            :readonly="readonly"
          />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Direccion</label>
          <input
            type="text"
            class="input"
            v-model="direcTranspor"
            :readonly="readonly"
          />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Telefono</label>
          <input
            type="text"
            class="input"
            v-model="telTranspor"
            :readonly="readonly"
          />
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
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'TransportadMod',
})
export default class TransportadMod extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private modaldelete = false;
  private search: boolean = false;
  private readonly: boolean = false;
  private idTransporta: string;
  private desctransport: string;
  private direcTranspor: string;
  private telTranspor: string;
  private usuaCrea: string;
  private fechaCrea: string;

  private transportadSearch: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.searchTransportad();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private update() {
    this.readonly = !this.readonly;
  }

  private viewModalDelete() {
    this.modaldelete = true;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private async acceptModalDelete() {
    if (this.idTransporta === '' || this.idTransporta === null) {
      return;
    }

    await this.deleteTransportad(this.idTransporta);
    this.modaldelete = false;
  }

  private async searchTransportad() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getBuscarTransportad();
      this.transportadSearch = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchTransportadId(id: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getBuscarTransportadID(id);
      this.idTransporta = response.data.idTransporta;
      this.desctransport = response.data.desctransport;
      this.direcTranspor = response.data.direcTranspor;
      this.telTranspor = response.data.telTranspor;
      this.usuaCrea = response.data.usuaCrea;
      this.fechaCrea = response.data.fechaCrea;

      this.search = false;
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updateTransportad() {
    if (this.validation()) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putTransportad(
        this.idTransporta,
        {
          desctransport: this.desctransport,
          direcTranspor: this.direcTranspor,
          idTransporta: this.idTransporta,
          telTranspor: this.telTranspor,
        },
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
      }
      this.transportadSearch = [];
      this.searchTransportad();
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteTransportad(id: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.deleteTransportad(id);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
        this.transportadSearch = [];
        this.searchTransportad();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar transportador');
    } finally {
      this.isLoading = false;
    }
  }

  private validation() {
    if (this.idTransporta === '' || this.idTransporta === null) {
      this.showOutput(true, 'El código no puede estar vacío');
      return true;
    }

    if (this.desctransport === '' || this.desctransport == null) {
      this.showOutput(true, 'La descripción no puede estar vacía');
      return true;
    }

    return false;
  }

  private async validateTanportad(id: string) {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.getTransportad(id);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private clearData() {
    this.idTransporta = '';
    this.desctransport = '';
    this.direcTranspor = '';
    this.telTranspor = '';
    this.usuaCrea = '';
    this.fechaCrea = '';
  }
}
</script>
