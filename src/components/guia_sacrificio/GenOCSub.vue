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
    <div class="card">
      <div class="flex flex-row flex-wrap grid grid-cols-3">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Tercero</label>
          <input
            type="text"
            class="input"
            v-model="IGenOCSub.terceG"
            readonly
          />
        </div>

        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Fecha</label>
          <input
            type="date"
            class="input"
            v-model="IGenOCSub.fechaPes"
            readonly
          />
        </div>

        <div class="px-3 mb-6 md:mb-0">
          <label class="label">No. animales</label>
          <input
            type="text"
            class="input"
            v-model="IGenOCSub.nAnimG"
            readonly
          />
        </div>

        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Peso en pie</label>
          <input type="text" class="input" v-model="totalKilosP" readonly />
        </div>

        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Peso canal</label>
          <input type="text" class="input" v-model="pesoCanal" readonly />
        </div>

        <div class="px-3 mb-6 md:mb-0">
          <label class="label">% rendimiento</label>
          <input type="text" class="input" v-model="rendGuia" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import { IGenOCSub } from '@/remote/api/guia_sacrificio/type';
import convertToDecimal from '@/utils/convertToDecimal';
@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'GenOCSub',
})
export default class GenOCSub extends Vue {
  @Prop(Number) public loteNo: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private totalKilosP: string = '0.0';
  private rendGuia: string = '0.0';
  private pesoCanal: string = '0.0';

  private IGenOCSub: IGenOCSub = {
    fechaPes: '',
    nAnimG: 0,
    nGuia: 0,
    nLote: 0,
    pesoCanal: 0,
    rendGuia: 0,
    terceG: '',
    totalKilosP: 0,
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.genOCSub(this.loteNo);
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async genOCSub(nLote: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGenOCSub(nLote);
      if (response.data === null) {
        return;
      }
      this.IGenOCSub = response.data as IGenOCSub;
      this.IGenOCSub.fechaPes = response.data.fechaPes;
      this.totalKilosP = convertToDecimal(response.data.totalKilosP);
      this.rendGuia = convertToDecimal(response.data.rendGuia);
      this.pesoCanal = convertToDecimal(response.data.pesoCanal);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
