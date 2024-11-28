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
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div mb-2">
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <button class="btn-link mr-5" @click="guardarRegistro()">
            <img src="@/assets/img/Guardar.png" />
          </button>
        </div>
      </div>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">N° Guia:</label>
            <input type="text" class="input" v-model="nguia" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Codigo Individual:</label>
            <input type="text" class="input" v-model="Codigoind" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Peso Piel:</label>
            <input
              type="text"
              class="input"
              v-model="pesoPiel"
              ref="PesoFocu"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mt-3 mb-3">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">
              Codigo C.C ó Nit :
              <select
                class="bg-white border py-1 pr-2 shadow leading-tight"
                v-model="Nit"
              >
                <option>{{ Nit }}</option>
              </select>
            </label>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Fecha y Hora Pesaje:</label>
            <input type="datetime-local" class="input" v-model="fehayHora" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones:</label>
            <input type="text" class="input" v-model="obseva" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import AlertBox from '@/components/reusable/AlertBox.vue';
import MovPileApi from '@/remote/api/MovPielesApi/MovPileApi';
import MovRepoPielApi from '@/remote/api/MovPielesApi/ReportesPileles';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'movSkinsOne',
  props: {
    idAuton: Number,
  },
})
export default class MovPielesUno extends Vue {
  private nguia: number = 0;
  private Codigoind: number = 0;
  private pesoPiel: number = 0;
  private Nit: string = '';
  private fehayHora: string = '';
  private obseva: string = '';
  private auton: number = 0;

  private output: string = '';

  private isError: boolean = false;

  private isLoading: boolean = false;

  private MovpileUno = new MovPileApi(this.$store.getters.getAuthToken);
  private MovReports = new MovRepoPielApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.listMovUno();
  }

  public validar() {
    if (
      this.Codigoind === 0 ||
      this.fehayHora === '' ||
      this.obseva === '' ||
      this.pesoPiel === 0
    ) {
      return false;
    }
    return true;
  }

  private clearOutput() {
    this.output = '';
  }

  private async getNameP() {
    try {
      const response = await this.MovpileUno.geNomP(this.nguia);
      this.Nit = response.data[0].NombreP;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener nombre/nit del tercero.');
    }
  }

  private async listMovUno() {
    this.isLoading = true;
    try {
      const response = await this.MovpileUno.getMovPielesUno(
        this.$props.idAuton,
      );
      this.nguia = response.data[0].NGuia;
      this.Codigoind = response.data[0].CodigoIndiv;
      this.pesoPiel = response.data[0].PesoPiel;
      this.fehayHora = moment(response.data[0].FechaMov).format(
        'YYYY-MM-DDThh:mm',
      );
      this.obseva = response.data[0].Observac;
      this.auton = response.data[0].Auton;

      this.getNameP();
    } catch (e) {
      Sentry.captureException(e);
      this.isLoading = false;
      this.showOutput(true, 'Error al obtener informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async guardarRegistro() {
    const Auton: number = this.auton;
    const NAnin: number = this.Codigoind;
    if (await this.beforeUpdateForm()) {
      return;
    }
    if (await !this.validar()) {
      return;
    }
    try {
      this.isLoading = true;
      const response = await this.MovpileUno.putGuardar(Auton, NAnin, {
        actualiza: true,
        actualizaSeb: false,
        actualizaW: false,
        anulado: false,
        codigoIndiv: this.Codigoind,
        fechaMov: moment().format('YYYY-MM-DD h:mm:ss a'),
        fechaProc: this.$store.getters.getFechaProceso,
        fechaSeb: null,
        motivoAnul: '0',
        nGuia: this.nguia,
        observac: this.obseva,
        pesoSeb: 0,
        pesopiel: this.pesoPiel,
        usuario: this.$store.getters.getUsuario,
      });
      if (response.statusCode !== 200) {
        this.isLoading = false;
        this.showOutput(true, 'Error al guardar, revise los datos.');
        return;
      } else {
        this.showOutput(false, response.message);
        try {
          const pdf = await this.MovReports.getSticPielMdPDF(Auton);
          ipcRenderer.send('save_pdf', pdf.data);
          this.isLoading = false;
          return;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al guardar registro.');
    } finally {
      this.isLoading = false;
    }
  }

  private beforeUpdateForm() {
    const fecha: string = moment(this.fehayHora).utc().format('YYYY-MM-DD');
    const fechaProc1: string = moment(
      this.$store.getters.getTConfinv1.fechaProc1,
    )
      .utc()
      .format('YYYY-MM-DD');
    const fechaProc2: string = moment(
      this.$store.getters.getTConfinv1.fechaProc2,
    )
      .utc()
      .format('YYYY-MM-DD');

    if (this.nguia === 0) {
      this.showOutput(true, 'No GUIA no puede ser cero.');
      return true;
    }
    if (this.pesoPiel === 0) {
      this.showOutput(true, 'PESO no puede ser cero.');
      const focus = this.$refs.PesoFocu as HTMLImageElement;
      focus.focus();
      return true;
    }

    if (fecha < fechaProc1 || fecha > fechaProc2) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido.');
      return true;
    }

    return false;
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }
}
</script>
