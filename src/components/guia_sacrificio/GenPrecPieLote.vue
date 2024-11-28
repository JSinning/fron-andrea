<template>
  <div>
    <div class="main-div" v-if="moduleFac">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
      <div class="flex-col">
        <div class="card">
          <div class="flex flex-row flex-wrap">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Digite fecha a procesar:</label>
              <input type="date" class="input" v-model="fechaG1" />
            </div>
            <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
              <button class="btn-save" @click="presentar">Procesar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="moduleFacBursage">
      <FacBursag></FacBursag>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment';
import * as Sentry from '@sentry/browser';
import FacBursag from '@/components/guia_sacrificio/FacBursag.vue';
@Component({
  components: {
    AlertBox,
    FacBursag,
    Loader,
  },
  name: 'GenPrecPieLote',
})
export default class GenPrecPieLote extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private moduleFacBursage: boolean = false;
  private moduleFac: boolean = true;

  private fechaG1: string = '';

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.openForm();
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

  private async openForm() {
    await this.onOpen();
  }

  private async onOpen() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOnOpenForm();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async presentar() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postGeneraRendLt({
        fechaG1: this.convertDate(this.fechaG1),
        fechaG2: this.convertDate(this.fechaG1),
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.moduleFacBursage = true;
        this.moduleFac = false;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style></style>
