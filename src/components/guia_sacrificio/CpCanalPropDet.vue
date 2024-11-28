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
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">frmCpCanalPropDet</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <div class="overflow-x-hidden">
            <table class="table-fixed w-full text-xs" id="tableA">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>Guia N°</th>
                  <th>Animal</th>
                  <th>Lado Animal</th>
                  <th>Codigo Producto</th>
                  <th>Guia Nueva</th>
                  <th>Codigo Producto</th>
                  <th>Peso Canal</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr>
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
      </div>
      <hr />
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
  name: 'CpCanalPropDet',
})
export default class CpCanalPropDet extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }
}
</script>
