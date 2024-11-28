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
            <h1 class="title">Relacion de Canal Despacho</h1>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-save" @click="procesar">Procesar</button>
          </div>
        </div>

        <div class="card">
          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">
                desde Concecutivo:
                <PaginatedSelect v-model="idDeshu1" :fetch="consec1">
                </PaginatedSelect>
              </label>
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">
                hasta:
                <PaginatedSelect v-model="idDeshu2" :fetch="consec2">
                </PaginatedSelect>
              </label>
            </div>
          </div>

          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Observaciones:</label>
              <input type="text" class="input" v-model="observaciones" />
            </div>
          </div>

          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Realizo:</label>
              <input type="text" class="input" v-model="realizo" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';
import despachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    PaginatedSelect,
  },
  name: 'MovInforCanDespa',
})
export default class MovInforCanDespaComponent extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;
  private idDeshu1: number = 0;
  private idDeshu2: number = 0;
  private observaciones: string = '';
  private realizo: string = '';

  private despaNaciApi = new despachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  public async mounted() {
    await this.openFrom();
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

  private convertFecha(fech: string) {
    return moment(fech).utc().format('YYYY-MM-DD');
  }

  private async openFrom() {
    await this.deleteTblTemp();
    await this.tblTemp();
  }

  private async procesar() {
    await this.addDNTemp();
    await this.reportRelacCanDan();
  }

  private async reportRelacCanDan() {
    try {
      this.isLoading = true;
      const pdf2 = await this.despaNaciApi.postRelacCanaDN({
        observacion: this.observaciones,
        realizo: this.realizo,
      });
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async tblTemp() {
    this.isLoading = true;
    try {
      const response = await this.despaNaciApi.getDNTemp();
      this.idDeshu1 = response.data.idDeshu1;
      this.idDeshu2 = response.data.idDeshe2;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteTblTemp() {
    this.isLoading = true;
    try {
      await this.despaNaciApi.deleteDNTemp();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al Borrar la informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async addDNTemp() {
    this.isLoading = true;
    try {
      await this.deleteTblTemp();
      await this.despaNaciApi.postDNTemp({
        fecha1: moment().utc().format('YYYY-MM-DD'),
        fecha2: moment().utc().format('YYYY-MM-DD'),
        idDeshu1: this.idDeshu1,
        idDeshu2: this.idDeshu2,
        usuario: this.$store.getters.getUsuario,
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al guardar la informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async consec1(pagination?: IPagination, q?: IQuery) {
    let result: BaseResponse<
      Array<{
        ConsecTip: number;
        FechaMov: string;
        Tercero: string;
      }>
    >;
    if (q.query) {
      result = await this.despaNaciApi.getSearch1Find(q);
      return result.data.map<IInterfaceSelect>((d) => ({
        id: d.ConsecTip,
        item: [d.ConsecTip, this.convertFecha(d.FechaMov), d.Tercero].join(
          ' | ',
        ),
      }));
    }
    result = await this.despaNaciApi.getSearch1(pagination);
    return result.data.map<IInterfaceSelect>((d) => ({
      id: d.ConsecTip,
      item: [d.ConsecTip, this.convertFecha(d.FechaMov), d.Tercero].join(' | '),
    }));
  }

  private async consec2(pagination?: IPagination, q?: IQuery) {
    let result: BaseResponse<
      Array<{
        ConsecTip: number;
        FechaMov: string;
        Tercero: string;
      }>
    >;
    if (q.query) {
      result = await this.despaNaciApi.getSearch2Find(q);
      return result.data.map<IInterfaceSelect>((d) => ({
        id: d.ConsecTip,
        item: [d.ConsecTip, this.convertFecha(d.FechaMov), d.Tercero].join(
          ' | ',
        ),
      }));
    }
    result = await this.despaNaciApi.getSearch2(pagination);
    return result.data.map<IInterfaceSelect>((d) => ({
      id: d.ConsecTip,
      item: [d.ConsecTip, this.convertFecha(d.FechaMov), d.Tercero].join(' | '),
    }));
  }
}
</script>
