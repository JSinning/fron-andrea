<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">Confirmar movimientos</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <div class="overflow-x-hidden overflow-x-scroll">
            <table class="table-fixed w-full text-xs" id="tableA">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>N°Guia</th>
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
                v-for="(item, index) in tblConfirmaWebSac"
                :key="index"
              >
                <tr>
                  <td>{{ item.nGuia }}</td>
                  <td>{{ item.loteUs }}</td>
                  <td>{{ item.usuario }}</td>
                  <td>{{ item.clase }}</td>
                  <td>{{ item.sexo }}</td>
                  <td>{{ item.noAnimalesLic }}</td>
                  <td>{{ item.noAnimales }}</td>
                  <td>{{ convertDate(item.FechaPes) }}</td>
                  <td></td>
                  <td class="underline font-bold">{{ item.tipo }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Total Bruto:</td>
                  <td>{{ item.pesEntra }}</td>
                  <td class="font-bold">Tara:</td>
                  <td>{{ item.pesSali }}</td>
                  <td class="font-bold">Total Kilos de Peso:</td>
                  <td>{{ item.totalKilosP }}</td>
                  <td class="font-bold">Peso Promedio B:</td>
                  <td>{{ item.pesoPromedio }}</td>
                </tr>
                <tr>
                  <td class="font-bold">Animales Sacrificados:</td>
                  <td>{{ item.aniSacrif }}</td>
                  <td class="font-bold">Kilos Canal:</td>
                  <td>{{ item.pesoCanal }}</td>
                  <td class="font-bold">% Rendimiento:</td>
                  <td>{{ item.rendim }}</td>
                </tr>
                <tr>
                  <td>
                    <button
                      class="btn-save"
                      @click="modalCanalCalientes(item.nGuia)"
                    >
                      Canal Caliente
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button class="btn-save" @click="modalPieles(item.nGuia)">
                      Pieles
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button class="btn-save" @click="modalViceras(item.nGuia)">
                      Visceras
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button
                      class="btn-save"
                      @click="modalDecomisos(item.nGuia)"
                    >
                      Decomisos
                    </button>
                  </td>
                  <td></td>
                  <td>
                    <button
                      class="btn-save"
                      @click="viewModalInformacion(item.nGuia)"
                    >
                      Confirmar Informacion
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- modal Forms-->
    <div>
      <div class="modal" v-if="modalComponent">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <component v-bind:is="componentName" v-bind:nGuia="nGuia" />
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="modalComponent = !modalComponent"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
    <!-- Modal ActualizarW -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalInfomacion"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8;Esta Seguro de Confirmar Movimientos de Sacrificio? de
              la Guia {{ nGuia }}</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalInformacion()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalInformacion()">
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
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment/moment';
import ConfirmaWebSacDt1 from '@/components/guia_sacrificio/ConfirmaWebSacDt1.vue';
import ConfirmaWebSacDt2 from '@/components/guia_sacrificio/ConfirmaWebSacDt2.vue';
import ConfirmaWebSacDt3 from '@/components/guia_sacrificio/ConfirmaWebSacDt3.vue';
import ConfirmaWebSacDt4 from '@/components/guia_sacrificio/ConfirmaWebSacDt4.vue';

@Component({
  components: {
    AlertBox,
    ConfirmaWebSacDt1,
    ConfirmaWebSacDt2,
    ConfirmaWebSacDt3,
    ConfirmaWebSacDt4,
    Loader,
  },
  name: 'ConfirmaWebSac',
})
export default class ConfirmaWebSac extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private modalComponent: boolean = false;
  private modalInfomacion: boolean = false;
  private componentName: string = '';
  private nGuia: number = 0;

  private tblConfirmaWebSac: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.confirmaWebSac();
  }

  private viewModalInformacion(nGuia: number) {
    this.modalInfomacion = true;
    this.nGuia = nGuia;
  }

  private closeModalInformacion() {
    this.modalInfomacion = false;
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private modalCanalCalientes(nGuia: number) {
    this.nGuia = nGuia;
    this.modalComponent = true;
    this.componentName = 'ConfirmaWebSacDt1';
  }

  private modalPieles(nGuia: number) {
    this.nGuia = nGuia;
    this.modalComponent = true;
    this.componentName = 'ConfirmaWebSacDt2';
  }

  private modalViceras(nGuia: number) {
    this.nGuia = nGuia;
    this.modalComponent = true;
    this.componentName = 'ConfirmaWebSacDt3';
  }

  private modalDecomisos(nGuia: number) {
    this.nGuia = nGuia;
    this.modalComponent = true;
    this.componentName = 'ConfirmaWebSacDt4';
  }

  private async acceptModalInformacion() {
    await this.confirmaInformacion(this.nGuia);
    this.modalInfomacion = false;
    this.nGuia = 0;
  }

  private async confirmaWebSac() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConfirmaWebSac();
      this.tblConfirmaWebSac = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async confirmaInformacion(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postConfirmainfo(nGuia);
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
}
</script>
