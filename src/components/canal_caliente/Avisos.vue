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
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <!-- Modal delete Aviso -->
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
                  class="rounded bg-red-700 text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
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
    <!-- End Modal delete Aviso -->

    <!-- modal -->
    <div>
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="toggleModal"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <h1 class="ml-5 title">Avisos</h1>
            <div class="card">
              <!-- Cod Aviso -->
              <div class="flex flex-row flex-wrap">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="label">Cod Aviso:</label>
                  <input type="text" class="input" v-model="codAviso" />
                </div>
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="label">Numero Aviso:</label>
                  <input type="text" v-model="numeroAviso" class="input" />
                </div>
              </div>

              <!-- Mensaje -->
              <div class="flex flex-row flex-wrap">
                <div class="w-full px-3 mb-6 md:mb-0">
                  <label class="label">Mensaje</label>
                  <input type="text" class="input" v-model="mensajeAviso" />
                </div>
              </div>

              <!-- Fecha Aviso y Fecha Evento -->
              <div class="flex flex-row flex-wrap">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="label">Avisar a partir de:</label>
                  <input
                    type="date"
                    v-model="fechaAviso"
                    class="input"
                    @change="onChange()"
                  />
                </div>
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="label">fin del evento:</label>
                  <input type="date" v-model="fechaEvento" class="input" />
                </div>
              </div>

              <!-- Aviso Periodico -->
              <div class="flex flex-row flex-wrap mt-5">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="label">
                    <input
                      class="mr-2 leading-tight"
                      type="checkbox"
                      v-model="periodico"
                    />
                    Aviso Periodico
                  </label>
                </div>

                <div class="md:w-1/2 px-3 mb-6 md:mb-0" v-if="periodico">
                  <label class="label">Avisar Cada</label>
                  <input type="text" class="input" v-model="numeroPeriodos" />
                </div>
              </div>

              <div
                class="md:w-1/2 px-3 mb-6 md:mb-0"
                v-if="periodico"
                role="alert"
              >
                <div class="border rounded-t border-andrea text-dark px-2 py-2">
                  Periodicidad
                </div>
                <div
                  class="border-b border-l border-r rounded-b border-andrea px-4 py-2"
                >
                  <div>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio text-andrea"
                        name="radio-colors"
                        value="1"
                      />
                      <span class="ml-2">Dias</span>
                    </label>
                  </div>
                  <div>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio"
                        name="radio-colors"
                        value="2"
                        v-model="semana"
                      />
                      <span class="ml-2">Semanas</span>
                    </label>
                  </div>
                  <div>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio"
                        name="radio-colors"
                        value="3"
                        v-model="mes"
                      />
                      <span class="ml-2">Meses</span>
                    </label>
                  </div>
                  <div>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio"
                        name="radio-colors"
                        value="4"
                      />
                      <span class="ml-2">Años</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex flex-row flex-wrap mt-5" v-if="periodico">
                <div
                  class="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64"
                  v-show="semana"
                >
                  <label class="label">Dia Semana</label>
                  <select
                    class="appearance-none bg-white border px-4 py-2 pr-8 shadow leading-tight"
                    v-model="diaSemana"
                  >
                    <option>{{ diaSemana }}</option>
                    <option value="1">Lunes</option>
                    <option value="2">Martes</option>
                    <option value="3">Miercoles</option>
                    <option value="4">Jueves</option>
                    <option value="5">Viernes</option>
                  </select>
                </div>
                <div
                  class="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64"
                  v-show="mes"
                >
                  <label class="label">Dia Mes</label>
                  <select
                    class="appearance-none bg-white border px-4 py-2 pr-8 shadow leading-tight"
                    v-model="diaMes"
                  >
                    <option :value="diaMes">{{ diaMes }}</option>
                    <option v-for="i in 31" :value="i" :key="i">{{ i }}</option>
                  </select>
                </div>
              </div>

              <!-- Anticipar Aviso -->
              <div class="flex flex-row flex-wrap mt-5">
                <div class="md:w-1/3 px-3 mb-6 md:mb-0">
                  <label class="label">
                    <input
                      class="mr-2 leading-tight"
                      type="checkbox"
                      v-model="anticiparAviso"
                    />
                    Anticipar Aviso
                  </label>
                </div>
                <div>
                  <label class="label text-center">
                    Proximos Avisos Para este Mensaje
                    <div class="flex flex-row flex-wrap mt-3">
                      <div class="px-3 mb-6 md:mb-0" v-if="anticiparAviso">
                        <input type="date" class="input" v-model="anticipa1" />
                      </div>
                      <div class="px-3 mb-6 md:mb-0" v-if="anticiparAviso">
                        <input type="date" class="input" v-model="anticipa2" />
                      </div>
                      <div class="px-3 mb-6 md:mb-0">
                        <input
                          type="date"
                          v-model="proximoAviso"
                          class="input"
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div class="flex flex-row flex-wrap justify-center mt-1">
                <div>
                  <button @click="clearAviso()" class="btn-save">Nuevo</button>
                  <button @click="addAviso()" class="btn-save">Guardar</button>
                  <button @click="updateAviso()" class="btn-save">
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
            <button
              class="rounded btn-delete px-6 mt-1 py-2 w-3/12 m-auto mb-2"
              @click="closeModal()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <div class="main-div mb-2">
      <h1 class="title">Mantenimiento de Avisos</h1>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <button @click="toggleModal = !toggleModal" class="btn-save mb-2">
            Adicionar Registro
          </button>
        </div>
      </div>
      <div class="card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Codigo</th>
              <th>Mensaje</th>
              <th>Periodico</th>
              <th>Numero Periodos</th>
              <th>Fecha</th>
              <th>Fecha Evento</th>
              <th>Anticipar</th>
              <th>Avisar</th>
              <th>Numero</th>
              <th>Proximo</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th class="w-1/6 px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              class="border-b border-gray-500"
              v-for="data in valuesAvisos"
              v-bind:key="data.codAviso"
            >
              <td>{{ data.codAviso }}</td>
              <td>{{ data.mensajeAviso }}</td>
              <td>{{ convertBoolean(data.periodico) }}</td>
              <td>{{ data.numeroPeriodos }}</td>
              <td>{{ convertDate(data.fechaAviso) }}</td>
              <td>{{ convertDate(data.fechaEvento) }}</td>
              <td>{{ convertBoolean(data.anticiparAviso) }}</td>
              <td>{{ convertBoolean(data.avisar) }}</td>
              <td>{{ data.numeroAviso }}</td>
              <td>{{ convertDate(data.proximoAviso) }}</td>
              <td>{{ data.estado }}</td>
              <td>{{ data.usuario }}</td>
              <td>
                <button @click="loadAviso(data.codAviso)" class="btn-save mb-2">
                  Editar
                </button>
                <button
                  @click="viewModalDelete(data.codAviso)"
                  class="btn-delete mb-2"
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
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import CanalCaliente from '@/remote/api/CanalCaliente';

import Loader from '@/components/reusable/Loader.vue';

import * as Sentry from '@sentry/browser';

import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'Avisos',
})
export default class Avisos extends Vue {
  public anticipa1: string = '';
  public anticipa2: string = '';
  public anticiparAviso: boolean = false;
  public codAviso: number = 0;
  public diaSemana: number = 0;
  public diaMes: number = 0;
  public estado: string = '';
  public fechaAviso: string = '';
  public fechaEvento: string = '';
  public periodico: boolean = false;
  public mensajeAviso: string = '';
  public modaldelete: boolean = false;
  public mes: boolean = false;
  public numeroAviso: number = 0;
  public numeroPeriodos: number = 0;
  public output: string = '';
  public proximoAviso: string = '';
  public periodicidad: number = 0;
  public semana: boolean = false;
  public usuario: string = '';
  public valuesAvisos: any = [];
  public toggleModal: boolean = false;

  private selectedCodAviso: number = -1;
  private isError: boolean = false;

  private isLoading: boolean = false;

  private canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);

  public closeModal() {
    this.toggleModal = false;
    this.clearForm();
  }

  public mounted() {
    this.listAvisos();
  }

  public clearAviso() {
    this.clearForm();
  }

  public viewModalDelete(id: number) {
    this.selectedCodAviso = id;
    this.modaldelete = true;
  }

  // Metodo para eliminar aviso seleccionado por el usuario.
  public async buttonModalSi() {
    if (this.selectedCodAviso === 0) {
      return;
    }

    await this.deleteAviso(this.selectedCodAviso);
    this.modaldelete = false;
    this.selectedCodAviso = 0;
  }

  public closeModalDelete() {
    this.modaldelete = false;
  }

  public clearForm() {
    this.codAviso = 0;
    this.mensajeAviso = '';
    this.periodico = false;
    this.numeroPeriodos = 0;
    this.periodicidad = 0;
    this.fechaAviso = '';
    this.fechaEvento = '';
    this.diaSemana = 0;
    this.diaMes = 0;
    this.anticiparAviso = false;
    this.numeroAviso = 0;
    this.proximoAviso = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async listAvisos() {
    this.isLoading = true;
    try {
      const result = await this.canalCaliente.getAvisos();
      this.valuesAvisos = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar avisos.');
    } finally {
      this.isLoading = false;
    }
  }

  private clearOutput() {
    this.output = '';
  }

  private onChange() {
    this.proximoAviso = moment(this.fechaAviso).format('YYYY-MM-DD');
    this.anticipa1 = moment(this.proximoAviso)
      .subtract(6, 'd')
      .format('YYYY-MM-DD');
    this.anticipa2 = moment(this.proximoAviso)
      .subtract(3, 'd')
      .format('YYYY-MM-DD');
  }

  private async loadAviso(id: number) {
    try {
      const result = await this.canalCaliente.getByIdAvisos(id);
      const values = result.data;
      this.toggleModal = true;
      this.codAviso = values.codAviso;
      this.mensajeAviso = values.mensajeAviso;
      this.fechaAviso = moment.utc(values.fechaAviso).format('YYYY-MM-DD');
      this.fechaEvento = moment.utc(values.fechaEvento).format('YYYY-MM-DD');
      this.periodico = values.periodico;
      this.numeroPeriodos = values.numeroPeriodos;
      this.diaSemana = values.diaSemana;
      this.diaMes = values.diaMes;
      this.anticiparAviso = values.anticiparAviso;
      this.numeroAviso = values.numeroAviso;
      this.proximoAviso = moment.utc(values.proximoAviso).format('YYYY-MM-DD');
      this.periodicidad = values.periodicidad;
      this.anticipa1 = moment(values.proximoAviso)
        .subtract(6, 'd')
        .format('YYYY-MM-DD');
      this.anticipa2 = moment(values.proximoAviso)
        .subtract(3, 'd')
        .format('YYYY-MM-DD');
      this.usuario = values.usuario;
      this.estado = values.estado;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar informacion de avisos.');
    }
  }

  private async addAviso() {
    if (
      this.codAviso === 0 ||
      this.mensajeAviso === '' ||
      this.numeroAviso === 0
    ) {
      this.showOutput(
        false,
        'Por favor complete los campos para poder guardar correctamente.',
      );
      return;
    }
    try {
      this.isLoading = true;
      const result = await this.canalCaliente.postAvisos({
        anticiparAviso: this.anticiparAviso,
        avisar: 0,
        codAviso: this.codAviso,
        diaMes: this.diaMes,
        diaSemana: this.diaSemana,
        estado: 'Cumplido',
        fechaAviso: this.fechaAviso,
        fechaEvento: this.fechaEvento,
        mensajeAviso: this.mensajeAviso,
        numeroAviso: this.numeroAviso,
        numeroPeriodos: this.numeroPeriodos,
        periodicidad: this.periodicidad,
        periodico: this.periodico,
        proximoAviso: this.proximoAviso,
        usuario: this.$store.getters.getUsuario,
      });
      if (result.statusCode !== 201) {
        this.showOutput(true, 'Error al añadir el aviso.');
        return;
      }
      this.showOutput(false, result.message);
      this.clearForm();
      this.listAvisos();
      this.closeModal();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al añadir aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private async updateAviso() {
    const id = this.codAviso;
    if (
      this.codAviso === 0 ||
      this.mensajeAviso === '' ||
      this.numeroAviso === 0
    ) {
      this.showOutput(
        true,
        'Por favor complete los campos para poder guardar correctamente.',
      );
      return;
    }
    try {
      this.isLoading = true;
      const result = await this.canalCaliente.putAvisos(id, {
        anticiparAviso: this.anticiparAviso,
        avisar: 0,
        codAviso: this.codAviso,
        diaMes: this.diaMes,
        diaSemana: this.diaSemana,
        estado: this.estado,
        fechaAviso: this.fechaAviso,
        fechaEvento: this.fechaEvento,
        mensajeAviso: this.mensajeAviso,
        numeroAviso: this.numeroAviso,
        numeroPeriodos: this.numeroPeriodos,
        periodicidad: this.periodicidad,
        periodico: this.periodico,
        proximoAviso: this.proximoAviso,
        usuario: this.$store.getters.getUsuario,
      });
      if (result.statusCode !== 200) {
        this.showOutput(true, 'Error al actualizar aviso.');
        return;
      }
      this.showOutput(false, result.message);
      await this.listAvisos();
      this.clearForm();
      this.closeModal();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteAviso(id: number) {
    try {
      this.isLoading = true;
      const result = await this.canalCaliente.deleteAvisos(id);
      if (result.statusCode !== 200) {
        this.showOutput(true, 'Error al eliminar aviso.');
        return;
      }
      this.showOutput(false, result.message);
      this.listAvisos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private convertBoolean(anticipar: boolean) {
    return anticipar ? 'Si' : 'No';
  }

  private convertDate(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }
}
</script>
