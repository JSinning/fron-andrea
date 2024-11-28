<template>
  <div>
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <!-- modal -->
    <div v-show="isModalVisible" class="modal mt-3">
      <div class="modal-container">
        <div class="modal-body">
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
              <div class="md:w-1/5 px-3 mb-6 md:mb-0">
                <label class="label">
                  <input
                    class="mr-2 leading-tight"
                    type="checkbox"
                    v-model="periodico"
                  />
                  Aviso Periodico
                </label>
              </div>

              <div class="md:w-1/5 px-3 mb-6 md:mb-0" v-if="periodico">
                <label class="label">Avisar Cada</label>
                <input type="text" class="input" v-model="numeroPeriodos" />
              </div>

              <div
                class="md:w-1/3 px-3 mb-6 md:mb-0"
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

              <div class="md:w-1/5 px-3 mb-6 md:mb-0" v-if="periodico">
                <div
                  class="px-3 mb-6 md:mb-0 inline-block relative w-64"
                  v-show="semana"
                >
                  <label class="label">
                    Dia Semana
                    <select
                      v-model="diaSemana"
                      class="appearance-none bg-white border px-4 py-2 pr-8 shadow leading-tight"
                    >
                      <option :value="diaSemana">{{ diaSemana }}</option>
                      <option value="1">Lunes</option>
                      <option value="2">Martes</option>
                      <option value="3">Miercoles</option>
                      <option value="4">Jueves</option>
                      <option value="5">Viernes</option>
                    </select>
                  </label>
                </div>
                <div
                  class="px-3 mb-6 md:mb-0 inline-block relative w-64 mt-2"
                  v-show="mes"
                >
                  <label class="label">
                    Dia Mes
                    <select
                      class="appearance-none bg-white border px-4 py-2 pr-8 shadow leading-tight"
                      v-model="diaMes"
                    >
                      <option :value="diaMes">{{ diaMes }}</option>
                      <option v-for="i in 31" :value="i" :key="i">
                        {{ i }}
                      </option>
                    </select>
                  </label>
                </div>
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
                    <div
                      class="px-3 mb-6 md:mb-0"
                      v-if="anticiparAviso === true"
                    >
                      <input type="date" class="input" v-model="anticipa1" />
                    </div>
                    <div
                      class="px-3 mb-6 md:mb-0"
                      v-if="anticiparAviso === true"
                    >
                      <input type="date" class="input" v-model="anticipa2" />
                    </div>
                    <div class="px-3 mb-6 md:mb-0">
                      <input type="date" v-model="proximoAviso" class="input" />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div class="flex flex-row flex-wrap justify-center mt-1">
              <div>
                <button class="btn-save" @click="clearAviso()">Nuevo</button>
                <button class="btn-save" @click="createAviso()">Guardar</button>
                <button class="btn-save" @click="updateAviso()">
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer flex flex-row justify-center">
          <button
            @click="closeModal"
            class="flex justify-center btn-delete w-32"
            name="footer"
          >
            Cerrar
          </button>
        </div>
      </div>
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
    <!-- End Modal delete Aviso -->

    <div class="main-div mb-2">
      <h1 class="title">Mantenimiento de Avisos</h1>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <button @click="viewModal()" class="btn-save mb-2">
            Adicionar Registro
          </button>
        </div>
      </div>
      <div class="card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Cada</th>
              <th>Periodo</th>
              <th>Fecha</th>
              <th>DiasS</th>
              <th>DiaM</th>
              <th>Anticip.</th>
              <th class="w-1/6 px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              class="border-b border-gray-500"
              v-for="(item, index) in MantenimientoAviso"
              :key="index"
            >
              <td>{{ item.codAviso }}</td>
              <td>{{ convertBooleanPer(item.periodico) }}</td>
              <td>{{ convertirFecha(item.fechaAviso) }}</td>
              <td>{{ item.diaSemana }}</td>
              <td>{{ item.diaMes }}</td>
              <td>{{ convertBoolean(item.anticiparAviso) }}</td>
              <td>
                <button
                  class="btn-save mb-2"
                  @click="avisosCode(item.codAviso)"
                >
                  Editar
                </button>
                <button
                  class="btn-delete mb-2"
                  @click="viewModalDelete(item.codAviso)"
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
import { Component, Vue } from 'vue-property-decorator';

import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';

import moment from 'moment';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'AvisosDNacional',
})
export default class AvisosComponent extends Vue {
  private isModalVisible: boolean = false;
  private periodico: boolean = false;
  private fechaAviso: string = '';
  private codAviso: number = 0;
  private mensajeAviso: string = '';
  private fechaEvento: string = '';
  private numeroPeriodos: string = '';
  private diaSemana: number = 0;
  private diaMes: number = 0;
  private anticiparAviso: string = '';
  private numeroAviso: number = 0;
  private proximoAviso: string = '';
  private periodicidad: string = '';
  private anticipa1: string = '';
  private anticipa2: string = '';
  private semana: boolean = false;
  private mes: boolean = false;
  private output: string = '';
  private MantenimientoAviso = [];
  private modaldelete: boolean = false;
  private selectedCodAviso: number = -1;

  private isError: boolean = false;
  private isLoading: boolean = false;

  private despaNacApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  public viewModal() {
    this.isModalVisible = true;
  }

  public clearOutput() {
    this.output = '';
  }

  public closeModal() {
    this.isModalVisible = false;
  }

  public async mounted() {
    await this.listAvisos();
  }
  public viewModalDelete(id: number) {
    this.selectedCodAviso = id;
    this.modaldelete = true;
  }

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

  private convertirFecha(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertBoolean(anticipar: boolean) {
    return anticipar ? 'Cumplido' : 'No';
  }
  private convertBooleanPer(anticipar: boolean) {
    return anticipar ? 'Si' : 'No';
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

  private async listAvisos() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getAvisoDespa();
      this.MantenimientoAviso = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener avisos.');
    } finally {
      this.isLoading = false;
    }
  }

  private async avisosCode(codigo: number) {
    try {
      const response = await this.despaNacApi.getCodigoAvisosDespa(codigo);
      this.codAviso = response.data.codAviso;
      this.numeroAviso = response.data.numeroAviso;
      this.mensajeAviso = response.data.mensajeAviso;
      this.fechaAviso = moment(response.data.fechaAviso).format('YYYY-MM-DD');
      this.fechaEvento = moment(response.data.fechaEvento).format('YYYY-MM-DD');
      this.periodico = response.data.periodico;
      this.numeroPeriodos = response.data.numeroPeriodos;
      this.periodicidad = response.data.periodicidad;
      this.diaSemana = response.data.diaSemana;
      this.diaMes = response.data.diaMes;
      this.anticiparAviso = response.data.anticiparAviso;
      this.proximoAviso = moment(response.data.fechaAviso).format('YYYY-MM-DD');
      this.anticipa1 = moment(response.data.proximoAviso)
        .subtract(6, 'd')
        .format('YYYY-MM-DD');
      this.anticipa2 = moment(response.data.proximoAviso)
        .subtract(3, 'd')
        .format('YYYY-MM-DD');
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al filtrar aviso.');
    }

    this.isModalVisible = true;
  }

  private async updateAviso() {
    const codiAvisos = this.codAviso;
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
      const response = await this.despaNacApi.putAvisosDespa(codiAvisos, {
        anticiparAviso: this.anticiparAviso,
        codAviso: this.codAviso,
        diaMes: this.diaMes,
        diaSemana: this.diaSemana,
        fechaAviso: this.fechaAviso,
        fechaEvento: this.fechaEvento,
        mensajeAviso: this.mensajeAviso,
        numeroAviso: this.numeroAviso,
        numeroPeriodos: this.numeroPeriodos,
        periodicidad: this.periodicidad,
        periodico: this.periodico,
        proximoAviso: this.proximoAviso,
      });
      if (response.statusCode !== 200) {
        this.showOutput(true, 'Error al actualizar aviso.');
        return;
      }
      this.showOutput(false, response.message);
      this.clearAviso();
      await this.listAvisos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private async createAviso() {
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
      const response = await this.despaNacApi.postAvisosDespa({
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
      if (response.statusCode !== 201) {
        this.showOutput(true, 'Error al actualizar aviso.');
        return;
      }
      this.showOutput(false, response.message);
      this.clearAviso();
      await this.listAvisos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al crear aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteAviso(CodAviso: number) {
    try {
      this.isLoading = true;
      const response = await this.despaNacApi.deletAvisosDespa(CodAviso);
      this.showOutput(false, response.message);
      await this.listAvisos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private clearAviso() {
    this.periodico = false;
    this.fechaAviso = '';
    this.codAviso = 0;
    this.mensajeAviso = '';
    this.fechaEvento = '';
    this.numeroPeriodos = '';
    this.diaSemana = 0;
    this.diaMes = 0;
    this.anticiparAviso = '';
    this.numeroAviso = 0;
    this.proximoAviso = '';
    this.periodicidad = '';
    this.anticipa1 = '';
    this.anticipa2 = '';
    this.semana = false;
    this.mes = false;
  }
}
</script>

<style scoped></style>
