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
  <div class="main-div">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-row flex-wrap">
      <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
        <h1 class="title">Picado Visceras</h1>
      </div>
      <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
      <div class="pl-64 mb-6 md:mb-0">
        <label class="label">
          Relacion Picado Viscera No:
          <select
            class="bg-white border py-1 pr-2 shadow leading-tight"
            v-model="IdConcecutivo"
            @change="datosPicado()"
          >
            <option
              v-for="(item, index) in PicadoVisCsNo"
              :key="index"
              :value="item.idConsecutivo"
            >
              {{ item.picadoNo }} | {{ convertFecha(item.fechaPic) }} |
              {{ item.clientePic }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <div class="flex flex-row flex-wrap mb-2 justify-end">
      <div class="pr-20 mt-2 md:mb-0"></div>
    </div>

    <div class="card">
      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Picado Visceras No:</label>
          <input type="text" class="input" v-model="picadoNo" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Grupo:
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="grupoPicado"
              >
                <option :value="grupoPicado">{{ grupoPicado }}</option>
                <option
                  v-for="(item, index) in Grupos"
                  :key="index"
                  :value="item.idGrupo"
                >
                  {{ item.descripGrup }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Turno:
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="turnoPicado"
              >
                <option :value="turnoPicado">{{ turnoPicado }}</option>
                <option
                  v-for="(item, index) in Turnos"
                  :key="index"
                  :value="item.turnoD"
                >
                  {{ item.descripTurn }}
                </option>
              </select>
            </label>
          </div>
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Tipo Pic:
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="tipoPicado"
              >
                <option :value="tipoPicado">{{ tipoPicado }}</option>
                <option
                  v-for="(item, index) in TipoPic"
                  :key="index"
                  :value="item.IdTpPicado"
                >
                  {{ item.DescripTp }}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">
            Tercero:
            <select
              class="bg-white border py-1 pr-2 shadow leading-tight select"
              v-model="tercero"
            >
              <option :value="tercero">{{ tercero }}</option>
            </select>
          </label>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Numero Visceras a Picar:</label>
          <input type="text" class="input" v-model="nVicerasPicado" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Fecha de Moviemiento:</label>
          <input type="date" class="input" v-model="fechaMov" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Lote Ext:</label>
          <input type="text" class="input" v-model="nLoteExt" />
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="flex flex-row flex-wrap mb-3">
      <div class="card-table">
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Tp/Cn</th>
              <th>Etiqueta</th>
              <th>Guia</th>
              <th>Animal No</th>
              <th>Peso Viscera</th>
              <th>Anulado</th>
              <th>Fecha Hora</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <hr />

    <div class="flex flex-row flex-wrap mt-4">
      <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
        <label class="label">Realizo</label>
        <input type="text" class="input" v-model="realizo" />
        <label class="label">Observaciones</label>
        <input type="text" class="input" v-model="obsersiones" />
      </div>
      <div class="pl-10">
        <button class="btn-save p-5">Reimprimir</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
  },

  name: 'PicadoViscCs',
})
export default class PicadoViscCsxxComponent extends Vue {
  private output = '';
  private isError: boolean = false;

  private IdConcecutivo: number = 0;

  private picadoNo: number = 0;
  private grupoPicado: number = 0;
  private turnoPicado: string = '';
  private fechaMov: string = '';
  private tercero: string = '';
  private nVicerasPicado: number = 0;
  private nLoteExt: number = 0;
  private tipoPicado: number = 0;
  private tipoCn: number = 0;
  private realizo: string = '';
  private obsersiones: string = '';
  private procesado: boolean = false;
  private anulado: boolean = false;

  private PicadoVisCsNo: any = [];

  private Turnos: any = [];
  private Grupos: any = [];
  private TipoPic: any = [];

  private PicacdoViscCsApi = new MovViserasApi(
    this.$store.getters.getAuthToken,
  );

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.turnoD();
    await this.grupoPic();
    await this.tipoPic();
    await this.realPicadoNoCs();
  }

  private async realPicadoNoCs() {
    try {
      const response = await this.PicacdoViscCsApi.getPicadoCs();

      this.PicadoVisCsNo = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async turnoD() {
    try {
      const response = await this.PicacdoViscCsApi.getPicadoTurnoD();

      this.Turnos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.messege);
    }
  }

  private async grupoPic() {
    try {
      const response = await this.PicacdoViscCsApi.getGrupos();

      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tipoPic() {
    try {
      const respose = await this.PicacdoViscCsApi.getPicadoTipPic();

      this.TipoPic = respose.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private convertFecha(fech: string) {
    return moment(fech).format('YYYY-MM-DD');
  }
  private async datosPicado() {
    const idConcecutivo: number = this.IdConcecutivo;
    try {
      const response =
        await this.PicacdoViscCsApi.getPicadoCsUno(idConcecutivo);
      this.picadoNo = response.data.picadoNo;
      this.grupoPicado = response.data.grupoPica;
      this.turnoPicado = response.data.turnoPic;
      this.fechaMov = moment(response.data.fechaPic).format('YYYY-MM-DD');
      this.tercero = response.data.clientePic;
      this.nVicerasPicado = response.data.nviscPic;
      this.nLoteExt = response.data.nLoteExt;
      this.tipoPicado = response.data.idTpPicado;
      this.tipoCn = response.data.tpCanas;
      this.realizo = response.data.realizo;
      this.obsersiones = response.data.observacion;
      this.procesado = response.data.procesado;
      this.anulado = response.data.anulada;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>

<style scoped></style>
