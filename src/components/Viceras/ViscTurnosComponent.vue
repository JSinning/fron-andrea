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
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">TURNOS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2 justify-end">
        <div class="pr-24 mt-2 md:mb-0">
          <button class="btn-save" @click="adicuionarTurnos()">
            Adicionar Turno
          </button>
          <button class="btn-save" @click="modificarTurno()">
            Modificar Turno
          </button>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">ID:</label>
            <input
              type="text"
              class="input"
              v-model="ID"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Descripcion:</label>
            <input type="text" class="input" v-model="Descripcion" />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Valor Destajo:</label>
            <input type="text" class="input" v-model="ValorDesta" />
          </div>
        </div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Hora1:</label>
            <input type="datetime-local" class="input" v-model="FechaHora" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Hora2:</label>
            <input type="datetime-local" class="input" v-model="FechaHora2" />
          </div>
        </div>

        <hr />
        <!-- table -->
        <div class="flex flex-row flex-wrap mb-3">
          <div class="card-table">
            <table class="table-fixed w-full text-xs" id="tablaB">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>ID</th>
                  <th>Descripcion</th>
                  <th>Valor Destajo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody
                class="text-center"
                v-for="(item, index) in Turnos"
                :key="index"
              >
                <tr>
                  <td>{{ item.turnoS }}</td>
                  <td>{{ item.descripTurn }}</td>
                  <td>{{ item.valorDest }}</td>
                  <td>
                    <button
                      class="btn-save mb-2"
                      @click="editTurno(item.turnoS)"
                    >
                      Editar
                    </button>
                    <button
                      class="btn-delete mb-2"
                      @click="viewModalDelete(item.turnoS)"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal delete TipoPes -->
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
                >&#x1f6c8; Esta seguro que desea eliminar este campo ?</strong
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
      <!-- End Modal delete TipoPes -->
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ViscTurnosComponent',
})
export default class ViscTurnosComponent extends Vue {
  private output = '';
  private isError: boolean = false;

  private readonly: boolean = false;
  private modaldelete: boolean = false;

  private Turnos: any = [];

  private ID: string = '';
  private Descripcion: string = '';
  private ValorDesta: number = 0;
  private FechaHora: string = '';
  private FechaHora2: string = '';

  private isLoading: boolean = false;

  private ViscTurnosApi = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.turnos();
  }

  private async turnos() {
    this.isLoading = true;
    try {
      const response = await this.ViscTurnosApi.getTurnos();
      this.Turnos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async adicuionarTurnos() {
    if (this.validation()) {
      return;
    }
    try {
      const response = await this.ViscTurnosApi.postTurnos({
        descripTurn: this.Descripcion,
        hora1: moment(this.FechaHora).utc().format('YYYY-MM-DD HH:mm'),
        hora2: moment(this.FechaHora2).utc().format('YYYY-MM-DD HH:mm'),
        turnoS: this.ID,
        valorDest: this.ValorDesta,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }

      await this.turnos();
      this.clearForm();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async editTurno(IDTurno: string) {
    this.isLoading = true;
    try {
      const response = await this.ViscTurnosApi.getTurnosId(IDTurno);
      this.ID = response.data.turnoS;
      this.Descripcion = response.data.descripTurn;
      this.ValorDesta = response.data.valorDest;
      this.FechaHora = moment(response.data.hora1).format('YYYY-MM-DDTHH:mm');
      this.FechaHora2 = moment(response.data.hora2).format('YYYY-MM-DDTHH:mm');
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
      this.readonly = false;
    }
  }

  private async modificarTurno() {
    if (this.validation()) {
      return;
    }
    try {
      const response = await this.ViscTurnosApi.putTurnos(this.ID, {
        descripTurn: this.Descripcion,
        hora1: moment(this.FechaHora).utc().format('YYYY-MM-DD HH:mm'),
        hora2: moment(this.FechaHora2).utc().format('YYYY-MM-DD HH:mm'),
        turnoS: this.ID,
        valorDest: this.ValorDesta,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      await this.turnos();
      this.clearForm();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private validation() {
    if (this.ID === null || this.ID === '') {
      this.showOutput(true, 'El ID no pudes ser Vacio');
      return true;
    }

    if (this.Descripcion === null || this.Descripcion === '') {
      this.showOutput(true, 'La DESCRIPCON no Pude ser vacio');
      return true;
    }

    if (this.ValorDesta === 0) {
      this.showOutput(true, 'EL valor no puede ser cero');
      return true;
    }

    if (this.FechaHora === null || this.FechaHora === '') {
      this.showOutput(true, 'La Hora1 no pude ser Vacio');
      return true;
    }
    if (this.FechaHora2 === null || this.FechaHora2 === '') {
      this.showOutput(true, 'La Hora2 no pude ser Vacio');
      return true;
    }
    return false;
  }

  private async eleinarReguitroTurno(idTurno: string) {
    try {
      const response = await this.ViscTurnosApi.deleteTurnos(idTurno);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      await this.turnos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private clearForm() {
    this.ID = '';
    this.Descripcion = '';
    this.ValorDesta = 0;
    this.FechaHora = '';
    this.FechaHora2 = '';
  }

  private async buttonModalSi() {
    if (this.ID === '') {
      return;
    }
    await this.eleinarReguitroTurno(this.ID);
    this.modaldelete = false;
    this.ID = '';
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private viewModalDelete(id: string) {
    this.ID = id;
    this.modaldelete = true;
  }
}
</script>

<style scoped></style>
