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
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'ConfirmaWeb2',
})
export default class ConfirmaWeb2 extends Vue {
  @Prop(Number) public nGuia: number | undefined;

  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private tblConfimaWeb2: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.confirmaWeb2(this.nGuia);
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
}
</script>
