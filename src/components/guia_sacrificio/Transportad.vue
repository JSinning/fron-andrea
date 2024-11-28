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
          <h1 class="title">Transportador</h1>
        </div>

        <div class="md:w-1/5 mb-2 md:mb-0 mt-2 float-right">
          <button class="btn-save" @click="save">Guardar</button>
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
            @change="validateTansportad(idTransporta)"
          />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Descripcion</label>
          <input type="text" class="input" v-model="desctransport" />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Direccion</label>
          <input type="text" class="input" v-model="direcTranspor" />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <label class="label">Telefono</label>
          <input type="text" class="input" v-model="telTranspor" />
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
  name: 'Transportad',
})
export default class Transportad extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private modaldelete = false;
  private idTransporta: string;
  private desctransport: string;
  private direcTranspor: string;
  private telTranspor: string;
  private usuaCrea: string;
  private fechaCrea: string;

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

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

  private async save() {
    if (this.validation()) {
      return;
    }

    await this.addTansportad();
  }

  private validation() {
    if (this.idTransporta === '' || this.idTransporta === null) {
      this.showOutput(true, 'El código no puede ser vacío');
      return true;
    }

    if (this.desctransport === '' || this.desctransport == null) {
      this.showOutput(true, 'La descripción no puede estar vacía');
      return true;
    }

    return false;
  }

  private async addTansportad() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postTransportad({
        desctransport: this.desctransport,
        direcTranspor: this.direcTranspor,
        idTransporta: this.idTransporta,
        telTranspor: this.telTranspor,
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

  private async validateTansportad(id: string) {
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

  private async deleteTransportad(id: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.deleteTransportad(id);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar transportador');
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
