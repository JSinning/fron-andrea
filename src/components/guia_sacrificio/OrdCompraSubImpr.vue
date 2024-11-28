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
        <h1 class="ml-5 mb-3 title">OrdCompraSubImpr</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">Consecutivo</th>
              <th>Descripcion</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in tblOrdCompraSubImpr" :key="index">
            <tr class="border-b border-gray-500">
              <td style="visibility: collapse; display: none">
                {{ item.idConcecutivo }}
              </td>
              <td class="text-center">{{ item.descripcion }}</td>
              <td class="text-center">
                {{ $convertToDecimal(item.credito) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'OrdCompraSubImpr',
})
export default class OrdCompraSubImpr extends Vue {
  @Prop(Number) public idConcecutivo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private tblOrdCompraSubImpr: any[] = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.tableOrdCompraSubImpr(this.idConcecutivo);
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async tableOrdCompraSubImpr(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraSubImpr(id);
      this.tblOrdCompraSubImpr = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
