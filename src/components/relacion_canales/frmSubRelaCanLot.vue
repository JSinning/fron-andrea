<template>
  <div>
    <AlertBox
      class="p-0 mx-8"
      :isError="isError"
      :output="output"
      @empty="clearOutput"
    />
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="card-table">
      <table class="table-fixed w-full text-xs" id="tablaB">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th>Guia Nro</th>
            <th>Proveedor</th>
            <th>Codigo</th>
            <th>Unidad</th>
            <th>Kilos</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td>{{ relaSubCanLot.nGuia }}</td>
            <td>{{ relaSubCanLot.expr1 }}</td>
            <td>{{ relaSubCanLot.descripcionCla }}</td>
            <td>{{ relaSubCanLot.unidaC }}</td>
            <td>{{ relaSubCanLot.pesoC }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import RelacionCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import * as Sentry from '@sentry/browser';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'FrmSubRelaCanLot',
  props: {
    guiaGen: Number,
  },
})
export default class FrmSubRelaCanLot extends Vue {
  private isError: boolean = false;
  private output: string = '';
  private isLoading: boolean = false;
  private relaSubCanLot: any = [];

  private relaCanalApi = new RelacionCanalApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.subRelCanLot();
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async subRelCanLot() {
    this.isLoading = true;
    try {
      const response = await this.relaCanalApi.getSubRelCanLot(
        this.$props.guiaGen,
      );
      this.relaSubCanLot = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener informacion por guiaGen.');
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
