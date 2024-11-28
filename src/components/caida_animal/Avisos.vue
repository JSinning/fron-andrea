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
                <input type="date" v-model="fechaAviso" class="input" />
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
                class="md:w-1/5 px-3 mb-6 md:mb-0"
                v-if="periodico"
                role="alert"
              >
                <div class="border text-center text-dark px-4 py-2">
                  Periodicidad
                </div>
                <div class="border px-4 py-2">
                  <div class="text-center">
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
                      <input type="text" class="input" v-model="anticipa1" />
                    </div>
                    <div
                      class="px-3 mb-6 md:mb-0"
                      v-if="anticiparAviso === true"
                    >
                      <input type="text" class="input" v-model="anticipa2" />
                    </div>
                    <div class="px-3 mb-6 md:mb-0">
                      <input type="text" v-model="proximoAviso" class="input" />
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
            class="flex justify-center btn-save w-32"
            name="footer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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
              <td>{{ item.CodAviso }}</td>
              <td>{{ convertBooleanPer(item.Periodico) }}</td>
              <td>{{ convertirFecha(item.FechaAviso) }}</td>
              <td>{{ item.DiaSemana }}</td>
              <td>{{ item.DiaMes }}</td>
              <td>{{ convertBoolean(item.AnticiparAviso) }}</td>
              <td>
                <button
                  class="btn-save mb-2"
                  @click="codigosAviso(item.CodAviso)"
                >
                  Editar
                </button>
                <button
                  class="btn-delete mb-2"
                  @click="deleteAviso(item.CodAviso)"
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
import AvisosApi from '@/remote/api/MovPielesApi/AvisosApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'AvisoSacridico',
})
export default class Avisos extends Vue {
  private isModalVisible: boolean = false;
  private periodico: boolean = false;
  private fechaAviso: string = '';
  private codAviso: string = '';
  private mensajeAviso: string = '';
  private fechaEvento: string = '';
  private numeroPeriodos: string = '';
  private diaSemana: string = '';
  private diaMes: string = '';
  private anticiparAviso: string = '';
  private numeroAviso: string = '';
  private proximoAviso: string = '';
  private periodicidad: string = '';
  private anticipa1: string = '';
  private anticipa2: string = '';
  private semana: boolean = false;
  private mes: boolean = false;
  private MantenimientoAviso = [];
  private output: string = '';

  private isLoading: boolean = false;

  private AvisoApi = new AvisosApi(this.$store.getters.getAuthToken);
  private isError: boolean = false;

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
    await this.avisos();
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

  private async avisos() {
    try {
      this.isLoading = true;
      const response = await this.AvisoApi.getAvisos();
      this.MantenimientoAviso = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener avisos.');
    } finally {
      this.isLoading = false;
    }
  }

  private async codigosAviso(codigo: number) {
    try {
      const response = await this.AvisoApi.getCodigoAvisos(codigo);
      this.codAviso = response.data.CodAviso;
      this.numeroAviso = response.data.NumeroAviso;
      this.mensajeAviso = response.data.MensajeAviso;
      this.fechaAviso = moment(response.data.FechaAviso).format('YYYY-MM-DD');
      this.fechaEvento = moment(response.data.FechaEvento).format('YYYY-MM-DD');
      this.periodico = response.data.Periodico;
      this.numeroPeriodos = response.data.NumeroPeriodos;
      this.periodicidad = response.data.Periodicidad;
      this.diaSemana = response.data.DiaSemana;
      this.diaMes = response.data.DiaMes;
      this.anticiparAviso = response.data.AnticiparAviso;
      this.proximoAviso = moment(response.data.ProximoAviso).format(
        'YYYY-MM-DD',
      );
      this.anticipa1 = moment(response.data.ProximoAviso)
        .subtract(6, 'd')
        .format('YYYY-MM-DD');
      this.anticipa2 = moment(response.data.ProximoAviso)
        .subtract(3, 'd')
        .format('YYYY-MM-DD');
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al filtrar avisos.');
    }

    this.isModalVisible = true;
  }

  private async updateAviso(codiAvisos: number) {
    const weekDay: number = parseInt(this.diaSemana, 10);
    const MothDay: number = parseInt(this.diaMes, 10);
    codiAvisos = parseInt(this.codAviso, 10);
    try {
      this.isLoading = true;
      const response = await this.AvisoApi.putAvisos(codiAvisos, {
        AnticiparAviso: this.anticiparAviso,
        CodAviso: this.codAviso,
        DiaMes: MothDay,
        DiaSemana: weekDay,
        FechaAviso: this.fechaAviso,
        FechaEvento: this.fechaEvento,
        MensajeAviso: this.mensajeAviso,
        NumeroAviso: this.numeroAviso,
        NumeroPeriodos: this.numeroPeriodos,
        Periodicidad: this.periodicidad,
        Periodico: this.periodico,
        ProximoAviso: this.proximoAviso,
      });
      this.showOutput(false, response.message);
      await this.avisos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualizar el aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private async createAviso() {
    const weekDay: number =
      this.diaSemana !== '' ? parseInt(this.diaSemana, 10) : 0;
    const MothDay: number = this.diaMes !== '' ? parseInt(this.diaMes, 10) : 0;

    try {
      this.isLoading = true;
      const response = await this.AvisoApi.postAvisos({
        AnticiparAviso: this.anticiparAviso,
        Avisar: 0,
        CodAviso: this.codAviso,
        DiaMes: MothDay,
        DiaSemana: weekDay,
        Estado: 'Cumplido',
        FechaAviso: this.fechaAviso,
        FechaEvento: this.fechaEvento,
        MensajeAviso: this.mensajeAviso,
        NumeroAviso: this.numeroAviso,
        NumeroPeriodos: this.numeroPeriodos,
        Periodicidad: this.periodicidad,
        Periodico: this.periodico,
        ProximoAviso: this.proximoAviso,
        Usuario: this.$store.getters.getUsuario,
      });
      this.showOutput(false, response.message);
      await this.avisos();
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
      const response = await this.AvisoApi.deletAvisos(CodAviso);
      this.showOutput(false, response.message);
      await this.avisos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar el aviso.');
    } finally {
      this.isLoading = false;
    }
  }

  private clearAviso() {
    this.periodico = false;
    this.fechaAviso = '';
    this.codAviso = '';
    this.mensajeAviso = '';
    this.fechaEvento = '';
    this.numeroPeriodos = '';
    this.diaSemana = '';
    this.diaMes = '';
    this.anticiparAviso = '';
    this.numeroAviso = '';
    this.proximoAviso = '';
    this.periodicidad = '';
    this.anticipa1 = '';
    this.anticipa2 = '';
    this.semana = false;
    this.mes = false;
  }
}
</script>
