<template>
  <div class="w-full flex flex-col gap-2">
    <Loader v-show="isLoading" />
    <AlertBox
      :output="output.message"
      :isError="output.isError"
      @empty="() => (output.message = '')"
    />
    <table class="table-fixed w-full text-xs">
      <thead>
        <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
          <th>Cod</th>
          <th>Unid</th>
          <th>Kilos</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-500">
          <td class="text-center">{{ data.idCodigo }}</td>
          <td class="text-center">{{ data.unidaC }}</td>
          <td class="text-center">{{ pesoC }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import { FriRCanaGuiasProd } from '@/remote/api/relacion_canales/types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '../reusable/Loader.vue';
import * as Sentry from '@sentry/browser';
import convertToDecimal from '@/utils/convertToDecimal';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'SubConsoDespa',
})
export default class SubConsoDespa extends Vue {
  @Prop(Number) public readonly consecTip: FriRCanaGuiasProd['consecTip'];
  @Prop(Number) public readonly tipoMov: FriRCanaGuiasProd['tipoMov'];

  public data: Partial<FriRCanaGuiasProd> = {};

  public isLoading = false;

  public output = {
    isError: false,
    message: '',
  };

  get pesoC() {
    return isNaN(this.data.pesoC) ? '' : convertToDecimal(this.data.pesoC);
  }

  private api = new CuarteoApi(this.$store.getters.getAuthToken);

  public async mounted() {
    try {
      this.isLoading = true;
      const response = await this.api.getSubConsoDespaData({
        consecTip: this.consecTip,
        tipoMov: this.tipoMov,
      });
      this.data = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
