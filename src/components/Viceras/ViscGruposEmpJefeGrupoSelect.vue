<template>
  <Select
    :isItems="this.items"
    :value="value"
    @input="change"
    :enablePrev="isFirstPage"
    :enableNext="!hasMorePages"
    @prev="prev(fetch)"
    @next="next(fetch)"
    :usePagination="true"
    >Jefe Grupo:</Select
  >
</template>

<script lang="ts">
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import Select from '../reusable/select.vue';
import { Component } from 'vue-property-decorator';
import PaginatedSelectWrapper from '@/classes/PaginatedSelectWrapper';

@Component({
  components: {
    Select,
  },
  name: 'ViscGruposEmpJefeGrupoSelect',
})
export default class ViscGruposEmpJefeGrupoSelect extends PaginatedSelectWrapper {
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
    const response = await this.api.getJefeGrupo(this.pagination);

    this.items = response.data.map<IInterfaceSelect>((d) => ({
      id: d.IDEmpleado,
      item: d.Nombre,
    }));
  }
}
</script>
