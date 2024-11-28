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
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-6 md:mb-0">
          <h1 class="title">Planilla Despacho Caja Consolidada</h1>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save">Procesar</button>
        </div>
      </div>

      <div class="card mt-5 pt-3">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Despachos a Procesar...</label>
            <DCCTempxDCj1 />
          </div>
          <div class="md:w-10/12 px-3 mb-6 md:mb-0">
            <label class="label">Observacion:</label>
            <input type="text" class="input p-1" maxlength="35" />
          </div>
          <div class="md:w-10/12 px-3 mb-6 md:mb-0">
            <label class="label">Realizo:</label>
            <input type="text" class="input p-1" maxlength="8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DCCTempxDCj1 from '@/components/despacho_caja/DCCTempxDCj1.vue';

@Component({
  components: {
    AlertBox,
    DCCTempxDCj1,
    Loader,
  },
  name: 'DCCTSelecxDCjN',
})
export default class DCCTSelecxDCjN extends Vue {
  // TODO: review to form original about functionality @Andre Melendez Or JUAN CASTAÑO
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private clearOutput() {
    this.output = '';
  }
}
</script>
