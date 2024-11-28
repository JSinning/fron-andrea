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
            <h1 class="title">Guias a Procesar</h1>
          </div>
          <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Guia a Procesar:</label>
            <input type="text" class="input" />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Guia Nueva:</label>
            <input type="text" class="input" />
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">
              TipoGuia:
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="tipoGuia"
                @change="changeTipoGuia()"
              >
                <option :value="tipoGuia">{{ tipoGuia }}</option>
                <option :value="1">Sacrificio Local</option>
                <option :value="2">Sacrificio Nacional</option>
                <option :value="3">Sacrificio Propio</option>
              </select>
            </label>
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">
              Tercero Nuevo:
              <select
                class="bg-white border py-1 pr-2 shadow leading-tight select"
                v-model="terceroNv"
              >
                <option :value="terceroNv">{{ terceroNv }}</option>
                <option v-for="(item, index) in itemTrceroNuevo" :key="index">
                  {{ item.Nit }} | {{ item.Nombre }}
                </option>
              </select>
            </label>
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <button class="btn-primary">Generar Guia</button>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table h-48">
          <table class="table-fixed w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Guia a Procesar</th>
                <th>Guia Nueva</th>
                <th>TipoGuia</th>
                <th>Trecero Nuevo</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in itemVtGuias"
              :key="index"
            >
              <tr>
                <td>{{ item.guiaViej }}</td>
                <td>{{ item.guiaNue }}</td>
                <td>{{ item.tipoGuia }}</td>
                <td>{{ item.terceroNv }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-row flex-wrap mb-3 -mt-4">
        <div class="md:w-full">
          <button class="btn-primary w-full">Exportar Csv Datos Pesaje</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'MovDespaVtGuia',
})
export default class MovDespaVtGuiaComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private consecTip: number = 0;
  private tipoMov: number = 0;
  private autonum: number = 0;
  private guiaViej: number = 0;
  private guiaNue: number = 0;
  private tipoGuia: number = 0;
  private terceroNv: number = 0;
  private anular: boolean = false;
  private motivoAnula: string = '';
  private fechaG: string = '';

  private itemVtGuias: any = [];
  private itemTrceroNuevo: any = [];

  private despaNacVtGuia = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.tblMovDespaVtGuia();
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async tblMovDespaVtGuia() {
    this.isLoading = true;
    try {
      const response = await this.despaNacVtGuia.getDespaVtGuias();
      this.itemVtGuias = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al buscar informacion');
    } finally {
      this.isLoading = false;
    }
  }

  private async terceros(): Promise<Array<{
    NitCliente: string;
    Expr2: string;
    Expr1: string;
    CodiCliente: string;
    Habilitado: boolean;
  }> | void> {
    this.isLoading = true;
    try {
      const response = await this.despaNacVtGuia.getTercetos();
      return response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al buscar la informacion Terceros');
    } finally {
      this.isLoading = false;
    }
  }

  private async proveedores() {
    this.isLoading = true;
    try {
      const response = await this.despaNacVtGuia.getProvedores();
      return response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al buscar la informacion Terceros');
    } finally {
      this.isLoading = false;
    }
  }

  private async changeTipoGuia() {
    this.itemTrceroNuevo = [];
    if (this.tipoGuia === 3) {
      for (const provedores of await this.proveedores()) {
        this.itemTrceroNuevo.push({
          Nit: provedores.CodProveedor,
          Nombre: provedores.Expr2,
        });
      }
      return;
    }
    const tercerosResult = await this.terceros();
    if (!tercerosResult) {
      return;
    }
    for (const terceros of tercerosResult) {
      this.itemTrceroNuevo.push({
        Nit: terceros.NitCliente,
        Nombre: terceros.Expr2,
      });
    }
  }
}
</script>

<style scoped></style>
