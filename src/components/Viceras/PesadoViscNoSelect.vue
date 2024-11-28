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
    >Relacion Picado Viscera No:</Select
  >
</template>

<script lang="ts">
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import Select from '../reusable/select.vue';
import { Component } from 'vue-property-decorator';
import PaginatedSelectWrapper from '@/classes/PaginatedSelectWrapper';
import moment from 'moment';

@Component({
  components: {
    Select,
  },
})
export default class PesadoViscNoSelect extends PaginatedSelectWrapper {
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
    const response = await this.api.getPesadoVisc(this.pagination);

    this.items = response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConsecutivo,
      item: `${d.PesajeNo} | ${moment(d.FechaPes).format('YYYY-MM-DD')} | ${
        d.Tercero
      }`,
    }));
  }
}
</script>
