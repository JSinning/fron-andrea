<template>
  <div>
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="card-table">
        <h1 class="ml-5 mb-3 title">GeneraLotSub</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Guia No.</th>
              <th>Tercero G</th>
              <th>No. animales</th>
              <th>Generar</th>
              <th>Fecha Pes</th>
              <th>Lote No.</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in generaLotSubTable" :key="index">
            <tr class="border-b border-gray-500">
              <td>{{ item.guiaNo }}</td>
              <td>{{ item.terceroG }}</td>
              <td>{{ item.noAnimales }}</td>
              <td class="checkbox">
                <input type="checkbox" v-model="item.generarNo" />
              </td>
              <td>{{ convertDate(item.fechaPes) }}</td>
              <td>{{ item.loteNo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import { IGeneraLotSub } from '@/remote/api/guia_sacrificio/type';
import moment from 'moment/moment';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'GeneraLotSub',
})
export default class GeneraLotSub extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private generaLotSubTable: IGeneraLotSub[] = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.generaLotSub();
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

  private async generaLotSub() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGeneraLotSub();
      this.generaLotSubTable = response.data;
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
table,
td {
  padding: 10px;
}

.checkbox {
  text-align: center;
}
</style>
