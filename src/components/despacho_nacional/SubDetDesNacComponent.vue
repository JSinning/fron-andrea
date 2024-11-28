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
            <h1 class="title">SubDetDesNac</h1>
          </div>
          <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table h-48">
          <table class="table-fixed w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Etiqueta</th>
                <th>Codigo</th>
                <th>Descripcion</th>
                <th>Cant</th>
                <th>Kilos CF</th>
                <th>Kilos CC</th>
                <th>Diferencia</th>
                <th>PH</th>
                <th>Temperatura</th>
                <th>N-Anim</th>
                <th>Lado</th>
                <th>Anular</th>
                <th>Movimiento</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'SubDetDesNac',
})
export default class SubDetDesNacComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }
}
</script>

<style scoped></style>
