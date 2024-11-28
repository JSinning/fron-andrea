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
      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <div class="overflow-x-hidden overflow-x-scroll">
            <table class="table-fixed w-full text-xs" id="tableA">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>N°Guia</th>
                  <th>Confirmar</th>
                  <th>Lote Usuario</th>
                  <th>Usuario</th>
                  <th>Clase</th>
                  <th>Sexo</th>
                  <th>Nº Animales Licencia</th>
                  <th>Nº Animales Reales</th>
                  <th>Fecha</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody
                class="text-center border border-slate-700"
                v-for="(item, index) in tblGenPrecPieLot2"
                :key="index"
                @click="selectGuia(item)"
              >
                <tr>
                  <td>{{ item.nGuia }}</td>
                  <td>
                    <input
                      type="checkbox"
                      class="checkBox"
                      v-model="item.actualizaW"
                      @click="viewModalActualizarW"
                    />
                  </td>
                  <td>{{ item.loteUs }}</td>
                  <td>{{ item.usuario }}</td>
                  <td>{{ item.clase }}</td>
                  <td>{{ item.sexo }}</td>
                  <td>{{ item.noAnimalesLic }}</td>
                  <td>
                    <input
                      type="number"
                      class="input"
                      v-model="item.noAnimales"
                    />
                  </td>
                  <td>{{ convertDate(item.fechaPes) }}</td>
                  <td></td>
                  <td class="underline font-bold">{{ item.nitTercero }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Total Bruto:</td>
                  <td>{{ convertToDecimal(item.pesEntra) }}</td>
                  <td class="font-bold">Tara:</td>
                  <td>{{ convertToDecimal(item.pesSali) }}</td>
                  <td class="font-bold">Total Kilos de Peso:</td>
                  <td>
                    <input
                      type="number"
                      class="input"
                      v-model="item.totalKilosP"
                    />
                  </td>
                  <td class="font-bold">Peso Promedio B:</td>
                  <td>{{ convertToDecimal(item.pesoPromedio) }}</td>
                  <td class="font-bold">Peso Promedio R:</td>
                  <td>
                    {{ totalPesoPrmedioR(item.totalKilosP, item.noAnimales) }}
                  </td>
                  <td>
                    <button class="btn-save" @click="viewModalRecalcular">
                      Recalcular Promedio
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <div class="overflow-x-hidden">
            <table class="table-fixed w-full text-sm" id="tableA">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>N°Guia</th>
                  <th>Cod-Individual</th>
                  <th>Fecha Hora</th>
                  <th>Clase</th>
                  <th>Sexo</th>
                </tr>
              </thead>
              <tbody
                class="text-center"
                v-for="(item, index) in tblConfimaWeb2"
                :key="index"
              >
                <tr>
                  <td>{{ item.nGuia }}</td>
                  <td>{{ item.codigoIndiv }}</td>
                  <td>{{ convertDate(item.fechaMov) }}</td>
                  <td>{{ item.clase }}</td>
                  <td>{{ item.sexo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal ActualizarW -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalActualizarW"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >&#x1f6c8; Esta Seguro de Confirmar Guia y Entrada a
                Corrales?</strong
              >
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button
                      class="btn-succes"
                      @click="acceptModalActualizarW()"
                    >
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalActualizarW()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Actualizar W -->
    </div>

    <!-- Modal Recalcular -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalRecalcular"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Confirma Recalcular Promedio??</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalRecalcular()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalRecalcular()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal delete Recalcualar -->
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'GenPrecPieLote2',
})
export default class GenPrecPieLote2 extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private modalActualizarW: boolean = false;
  private modalRecalcular: boolean = false;

  private totalKilosP: number = 0;
  private noAnimales: number = 0;
  private nGuia: number = 0;
  private actualizaW: boolean = false;

  private tblGenPrecPieLot2: any = [];
  private tblConfimaWeb2: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.genPrePieLote2();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private closeModalRecalcular() {
    this.modalRecalcular = false;
  }

  private viewModalRecalcular() {
    this.modalRecalcular = true;
  }

  private closeModalActualizarW() {
    this.modalActualizarW = false;
    this.actualizaW = false;
    this.nGuia = 0;
  }

  private viewModalActualizarW() {
    this.modalActualizarW = true;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertToDecimal(dato: number) {
    return new Intl.NumberFormat('en-GB', {
      currency: 'EUR',
      style: 'currency',
    })
      .format(dato)
      .replace(/[€]/g, '');
  }

  private totalPesoPrmedioR(totalKilosP: number, noAnimales: number) {
    let promedioR = totalKilosP / noAnimales;

    return this.convertToDecimal(promedioR);
  }

  private async acceptModalRecalcular() {
    await this.recalCalcularPromedio(this.nGuia);
    this.modalRecalcular = false;
    this.nGuia = 0;
  }

  private async acceptModalActualizarW() {
    await this.actualizarW(this.nGuia);
    this.modalActualizarW = false;
    await this.genPrePieLote2();
    this.nGuia = 0;
  }

  private async selectGuia(item: any) {
    this.nGuia = item.nGuia;
    this.totalKilosP = item.totalKilosP;
    this.noAnimales = item.noAnimales;
    this.actualizaW = item.actualizaW;

    this.tblConfimaWeb2 = [];
    await this.confirmaWeb2(this.nGuia);
  }

  private async recalCalcularPromedio(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putRecalcularPromedio(
        nGuia,
        {
          noAnimales: this.noAnimales,
          totalKilosP: this.totalKilosP,
        },
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async actualizarW(nGuia: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.putActualizarWGenPrecPieLot2(nGuia);
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async confirmaWeb2(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConfirmaWeb2(nGuia);
      this.tblConfimaWeb2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async genPrePieLote2() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGenPrecPieLot2();
      this.tblGenPrecPieLot2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style>
.checkbox {
  text-align: center;
}
</style>
