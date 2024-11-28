<template>
  <Select
    :isItems="items"
    :value="value"
    @input="change"
    :enablePrev="isFirstPage"
    :enableNext="!hasMorePages"
    @prev="prev(fetch)"
    @next="next(fetch)"
    :usePagination="true"
    :enable="isDisabled"
  >
    <slot></slot>
  </Select>
</template>

<script lang="ts">
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import Select from '../reusable/select.vue';
import { Component, Watch, Emit } from 'vue-property-decorator';
import PaginatedSelectWrapper from '@/classes/PaginatedSelectWrapper';

@Component({
  components: {
    Select,
  },
})
export default class PicadoViscTerceroSelect extends PaginatedSelectWrapper {
  private api = new MovViserasApi(this.$store.getters.getAuthToken);

  public async mounted() {
    this.pagination.limit = 100;
    try {
      await this.fetch();
    } catch (e) {
      Sentry.captureException(e);
      this.$emit('error', true, e.message);
    }
  }

  public async fetch() {
    const response = await this.api.getClientPicadoAndPesado(this.pagination);

    this.items = response.data.map<IInterfaceSelect>((d) => ({
      id: d.CodiCliente,
      item: `${d.Expr2} | ${d.NitCliente} | ${d.CodiCliente}`,
    }));
  }

  @Watch('value')
  @Emit('expr2')
  public onChange(v: number) {
    const expr2 = String(this.items.find((i) => i.id === v).item)
      .split('|')[0]
      .trim();
    return expr2;
  }
}
</script>
