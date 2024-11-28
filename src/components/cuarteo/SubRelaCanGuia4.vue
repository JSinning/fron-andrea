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
      <div class="card-table">
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">ReprocesoNo</th>
              <th>Guia No</th>
              <th>Codigo</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Peso</th>
              <th>P/Prom</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in tblSubRelaCanGuia4" :key="index">
            <tr class="border-b border-gray-500">
              <td style="visibility: collapse; display: none">
                {{ item.reprocesoNo }}
              </td>
              <td class="text-center">{{ item.guiaNo }}</td>
              <td class="text-center">{{ item.secund }}</td>
              <td class="text-center">{{ item.descripcionMer }}</td>
              <td class="text-center">{{ item.nUnid }}</td>
              <td class="text-center">{{ item.kSecund }}</td>
              <td class="text-center">{{ item.pProm }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { subRelaCanGuia4 } from '@/remote/api/cuarteo/types';

import * as Sentry from '@sentry/browser';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'SubRelaCanGuia4',
})
export default class SubRelaCanGuia4 extends Vue {
  @Prop(Number) public reprocesoNo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private tblSubRelaCanGuia4: subRelaCanGuia4 = [];

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.subRelaCanGuia4(this.reprocesoNo);
  }

  private async subRelaCanGuia4(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getSubRelaCanGuia4(reprocesoNo);
      this.tblSubRelaCanGuia4 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private clearOutput() {
    this.output = '';
  }
}
</script>
