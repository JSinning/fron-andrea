<template>
  <div class="w-full flex flex-col gap-2">
    <AlertBox
      :output="output.message"
      :isError="output.isError"
      @empty="() => (output.message = '')"
    />
    <Loader v-show="isLoading" />
    <table class="table-fixed w-full text-xs">
      <thead>
        <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
          <th>Guia No</th>
          <th>Codigo</th>
          <th>Descripción</th>
          <th>Kilos</th>
          <th>Proveedor</th>
          <th>Lic. Ica</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(d, i) in data"
          :key="d.guiaNo + i"
          class="border-b border-gray-500"
        >
          <td class="text-center">{{ d.guiaNo }}</td>
          <td class="text-center">{{ d.idCodigo }}</td>
          <td class="text-center">{{ d.descripcionMer }}</td>
          <td class="text-center">{{ d.cantiKil }}</td>
          <td class="text-center">
            {{ d.proveedor.expr1 }}
          </td>
          <td class="text-center">
            {{ d.licIca.nGuia }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex gap-4 items-center justify-end">
      <input class="input" type="number" readonly v-model="cantidad" />
      <input class="input" type="number" readonly v-model="kilos" />
    </div>
  </div>
</template>

<script lang="ts">
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import * as Sentry from '@sentry/browser';
import {
  ITblReproCanal,
  ISubRelaCanGuia3Data,
} from '@/remote/api/cuarteo/types';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import Loader from '../reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
  },
  name: 'SubRelaCanGuia3',
})
export default class SubRelaCanGuia3 extends Vue {
  @Prop(Number) public readonly reprocesoNo: number;

  public data: ISubRelaCanGuia3Data[] = [];
  public cantidad = 0;
  public kilos = 0;

  public isLoading = false;

  public output = {
    isError: false,
    message: '',
  };

  private api = new CuarteoApi(this.$store.getters.getAuthToken);

  public async mounted() {
    try {
      this.isLoading = true;
      const response = await this.api.subRelaCanGuia3.get(this.reprocesoNo);
      this.data = response.data.data;
      this.cantidad = response.data.cantidad;
      this.kilos = Number(response.data.kilos.toFixed(2));
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
