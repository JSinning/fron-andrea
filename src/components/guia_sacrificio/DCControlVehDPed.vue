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
        <h1 class="ml-5 mb-3 title">DCControlVehDPed</h1>
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th style="visibility: collapse; display: none">Id pesaje</th>
              <th>Pedido</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in dcControlVehDPedIdPesaje" :key="index">
            <tr class="border-b border-gray-500">
              <td
                style="visibility: collapse; display: none"
                class="text-center"
              >
                {{ item.idPesaje }}
              </td>
              <td class="text-center">
                <select class="appearance-none" v-model="item.idPedido">
                  <option
                    v-for="(idPedido, index) in itemIdPedido"
                    :key="index"
                    :value="idPedido.id"
                  >
                    {{ idPedido.item }}
                  </option>
                </select>
              </td>
              <td class="text-center">{{ item.observac }}</td>
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
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import moment from 'moment';
import { IDcControlVehDPed } from '@/remote/api/guia_sacrificio/type';
@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'DCControlVehDPed',
})
export default class DCControlVehDPed extends Vue {
  @Prop(Number) public idPesaje: number | undefined;
  @Prop(Number) public idPedido: number | undefined;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private itemIdPedido: IInterfaceSelect[] = [];
  private dcControlVehDPedIdPesaje: IDcControlVehDPed[] = [];
  private dcControlVehDPed: IDcControlVehDPed = {
    auton: 0,
    idPedido: 0,
    idPesaje: 0,
    observac: '',
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.vehIdpedido();
    await this.vehPedIdPedidoIdPesaje(this.idPesaje, this.idPedido);
    await this.vehPedIdPesaje(this.idPesaje);
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

  private async vehPedIdPesaje(idPesaje: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getDccontrolvehIdPesaje(idPesaje);
      this.dcControlVehDPedIdPesaje = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async vehPedIdPedidoIdPesaje(idPesaje: number, idPedido: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getDccontrolvehIdPesajeIdPedido(
          idPesaje,
          idPedido,
        );
      this.dcControlVehDPed = response.data as IDcControlVehDPed;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async vehIdpedido() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getIdPedidoDetpedido();
      this.itemIdPedido = response.data.map((e: any) => {
        return {
          id: e.idAuton,
          item: `${e.pedido} - ${e.prefijoPed} - ${e.usuario} - ${e.codigo} - ${
            e.sucursal
          } - ${this.convertDate(e.fecha)}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
