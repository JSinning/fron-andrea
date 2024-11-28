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
    <!-- output -->
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="w-full h-full">
      <component
        v-bind:is="componentName"
        :pdfData="pdfData"
        v-bind:message="message"
      ></component>
    </div>
    <div class="main-div mb-2">
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <button @click="eventUpdate()" class="btn-link mr-5">
            <img src="@/assets/img/Guardar.png" />
          </button>
          <button @click="informes()" class="btn-link">
            <img src="@/assets/img/impresora.png" />
          </button>
        </div>
      </div>
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">N° Guia:</label>
            <input type="text" class="input" v-model="nGuia" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Codigo Individual:</label>
            <input type="text" class="input" v-model="codigoIndiv" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Peso Media Canal:</label>
            <input type="text" class="input" v-model="pesoCanal" />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mt-3 mb-3">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">
              Codigo C.C ó Nit :
              <select class="bg-white border py-1 pr-2 shadow leading-tight">
                <option>{{ nit }}</option>
              </select>
            </label>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">
              Cuarto Frio :
              <select
                class="bg-white border py-1 pr-2 shadow leading-tight"
                v-model="cuartoFr"
              >
                <option
                  v-for="value in cuartoFrio"
                  :value="value.IdCuartoF"
                  :key="value.IdCuartoF"
                >
                  {{ value.DescripcionCF }}
                </option>
              </select>
            </label>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">
              Mitad :
              <select class="bg-white border py-1 pr-2 shadow leading-tight">
                <option :value="mitadAn">{{ mitadAn }}</option>
              </select>
            </label>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Fecha y Hora Pesaje:</label>
            <input type="date" class="input" v-model="fechaMov" />
          </div>
          <div class="md:w-1/3 mt-5 px-3 mb-6 md:mb-0">
            <label class="label">
              Posee Rabo :
              <input
                class="mr-2 leading-tight"
                type="checkbox"
                v-model="poseeRab"
              />
            </label>
          </div>
          <div class="md:w-1/3 mt-5 px-3 mb-6 md:mb-0">
            <label class="label">
              Exportacion :
              <input
                class="mr-2 leading-tight"
                type="checkbox"
                v-model="exportacion"
              />
            </label>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mt-3 mb-3">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones:</label>
            <input type="text" class="input" v-model="observac" />
          </div>
          <div class="md:w-1/3 mt-4 px-3 mb-6 md:mb-0">
            <label class="label">
              Grado de Acabado :
              <select
                class="bg-white border py-1 pr-2 shadow leading-tight"
                v-model="gAcabado"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </label>
          </div>
          <div class="md:w-1/3 mt-4 px-3 mb-6 md:mb-0">
            <label class="label">
              Conformacion de la Canal :
              <select
                class="bg-white border py-1 pr-2 shadow leading-tight"
                v-model="conformacionC"
              >
                <option value="E">EXCELENTE</option>
                <option value="B">BUENO</option>
                <option value="R">REGULAR</option>
                <option value="I">INFERIOR</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import CanalCaliente from '@/remote/api/CanalCaliente';
import MovCCalienteApi from '@/remote/api/ReportesCanalCaliente';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
  },
  name: 'MovCanalCaluno',
  props: {
    idAuton: Number,
  },
})
export default class MovCanalCaluno extends Vue {
  private output: string = '';
  private nit: string = '';
  private cuartoFrio: any = [];
  private nGuia: number = 0;
  private codigoIndiv: number = 0;
  private fechaMov: string = '';
  private pesoCanal: number = 0;
  private poseeRab: boolean = false;
  private mitadAn: string = '';
  private observac: string = '';
  private exportacion: boolean = false;
  private cuartoFr: number = 0;
  private nAnimal: number = 0;
  private auton: number = 0;
  private actualiza: boolean = false;
  private actualizaW: boolean = false;
  private imprime: string = '';

  private message: string = '';
  private motivoAnul: string = '';
  private anulado: boolean = false;
  private conformacionC: string = '';
  private clasificacionC: string = '';
  private gAcabado: string = '';
  private edadA: string = '';
  private ordenDia: number = 0;
  private fechaMod: string = '';
  private fechaProc: string = '';
  private usuario: string = '';
  private fechaProc1: string = '';
  private fechaProc2: string = '';

  private componentName: string = '';

  private autonUno: number = 0;
  private NGuiaUno: number = 0;

  private isRepots: boolean = false;

  private isLoading: boolean = false;

  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);
  private MovApi = new MovCCalienteApi(this.$store.getters.getAuthToken);
  private isError: boolean = false;

  public created() {
    this.listCuartoFrio();
    this.processByAuton();
  }

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private processByAuton() {
    this.dataCanalCalienteUno(this.$props.idAuton);
  }

  private async valueNit(id: number) {
    try {
      const result = await this.canalCaliente.getNombreByNGuia(id);
      this.nit = result.data[0].NombreP;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener nombre/nit del tercero.');
    }
  }

  private async listCuartoFrio() {
    try {
      const result = await this.canalCaliente.getCuartosFrios();
      this.cuartoFrio = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener cuartos frios.');
    }
  }

  private async dataCanalCalienteUno(id: number) {
    this.isLoading = true;
    try {
      const result = await this.canalCaliente.getMovCanalCaluno(id);
      const values = result.data;
      this.auton = values.auton;
      this.nGuia = values.nGuia;
      this.codigoIndiv = values.codigoIndiv;
      this.fechaMov = moment.utc(values.fechaMov).format('YYYY-MM-DD');
      this.pesoCanal = values.pesoCanal;
      this.poseeRab = values.poseeRab;
      this.mitadAn = values.mitadAn;
      this.observac = values.observac;
      this.exportacion = values.exportacion;
      this.cuartoFr = values.cuartoFr;
      this.actualiza = values.actualiza;
      this.actualizaW = values.actualizaW;
      this.imprime = values.imprime;
      this.motivoAnul = values.motivoAnul;
      this.anulado = values.anulado;
      this.conformacionC = values.conformacionC;
      this.clasificacionC = values.clasificacionC;
      this.gAcabado = values.gAcabado;
      this.edadA = values.edadA;
      this.ordenDia = values.ordenDia;
      this.fechaMod = moment.utc(values.fechaMod).format('YYYY-MM-DD');
      this.fechaProc = moment.utc(values.fechaProc).format('YYYY-MM-DD');
      this.usuario = values.usuario;
      await this.valueNit(this.nGuia);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async eventUpdate() {
    const fecha: string = moment(this.fechaProc).format('YYYY-MM-DD');
    try {
      const result = await this.canalCaliente.getCofigurSacr();
      this.fechaProc1 = moment(result.data.fechaProc1).format('YYYY-MM-DD');
      this.fechaProc2 = moment(result.data.fechaProc2).format('YYYY-MM-DD');
      if (fecha < this.fechaProc1 || fecha > this.fechaProc2) {
        this.showOutput(true, 'La fecha esta fuera del limite permitido.');
      } else {
        await this.addMovCanalCalienteUno();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al procesar informacion.');
    }
  }

  private async addMovCanalCalienteUno() {
    const id = this.auton;
    try {
      const result = await this.canalCaliente.putMov(id, {
        actualiza: 1,
        actualizaW: this.actualizaW,
        anulado: this.anulado,
        clasificacionC: this.clasificacionC,
        codigoIndiv: this.codigoIndiv,
        conformacionC: this.conformacionC,
        cuartoFr: this.cuartoFr,
        edadA: this.edadA,
        exportacion: this.exportacion,
        fechaMod: this.fechaMod,
        fechaMov: this.fechaMov,
        fechaProc: this.fechaProc,
        gAcabado: this.gAcabado,
        imprime: this.imprime,
        mitadAn: this.mitadAn,
        motivoAnul: this.motivoAnul,
        nGuia: this.nGuia,
        observac: this.observac,
        ordenDia: this.ordenDia,
        pesoCanal: this.pesoCanal,
        poseeRab: this.poseeRab,
        usuario: this.usuario,
      });
      if (result.statusCode !== 200) {
        this.showOutput(true, 'Error al añadir registro.');
      } else {
        this.showOutput(false, result.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al añadir registro.');
    }
  }

  private async informes() {
    if (this.auton === 0) {
      this.showOutput(
        false,
        'No hay informacion que imprimir favor comienze proceo',
      );
      return;
    }
    try {
      const response = await this.canalCaliente.getCofigurSacr();
      if (!response.data.vPrelimin) {
        this.autonUno = this.auton;
        this.NGuiaUno = this.nGuia;
        this.isLoading = true;
        try {
          const pdf = await this.MovApi.getStickMCanPDF(this.autonUno);
          this.pdfData = pdf.data;
          this.showModalPDF = true;
          this.isLoading = false;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }

        this.isLoading = false;
      } else {
        this.autonUno = this.auton;
        this.NGuiaUno = this.nGuia;
        this.isLoading = true;
        try {
          const pdf2 = await this.MovApi.getStickMCanPDF(this.autonUno);
          this.pdfData = pdf2.data;
          this.showModalPDF = true;
          this.isLoading = false;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }
        this.isLoading = false;
      }
      this.isRepots = !this.isRepots;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>
