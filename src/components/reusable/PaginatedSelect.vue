<template>
  <v-select
    class="select-style"
    label="item"
    :clearable="false"
    :appendToBody="true"
    :options="items"
    :reduce="(item) => item.id"
    :value="value"
    :disabled="disabled"
    @input="change"
    @open="onOpen"
    @search="searchItem"
    :loading="isLoading"
  >
    <li slot="list-footer" class="flex gap-2 p-2 items-stretch">
      <button :disabled="isFirstPage" class="btn-save flex-1" @click="prev">
        Prev
      </button>
      <button :disabled="!hasMorePages" class="btn-save flex-1" @click="next">
        Next
      </button>
    </li>
  </v-select>
</template>

<script lang="ts">
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import Select from '../reusable/select.vue';
import {
  Component,
  Model,
  Prop,
  Emit,
  Vue,
  Watch,
} from 'vue-property-decorator';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
import { debounce } from '@/utils/debounce';

@Component({
  components: {
    Select,
  },
})
export default class PaginatedSelect extends Vue {
  @Model('change') public value!: string | number;
  @Prop() public disabled?: boolean;
  @Prop(Function) public fetch: (
    pagination: IPagination,
    query: IQuery,
  ) => Promise<IInterfaceSelect[]>;
  @Prop(Object) public initPagination?: IPagination;
  @Prop(Array) public initData?: IInterfaceSelect[];

  public pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  public query: IQuery = { query: '' };
  public isFirstPage = true;

  public hasMorePages = true;

  public isLoading = false;

  public items: IInterfaceSelect[] = [];

  public searchByQuery = debounce(this.fetchSearchByQuery, 600);

  public fetchSearchByQuery(search: string) {
    if (!search) {
      return;
    }
    this.query.query = search;
    this.onFetch();
  }

  @Emit('change')
  public change(v: IInterfaceSelect['id']) {
    return v;
  }

  public async prev() {
    if (this.pagination.skip <= 0) {
      this.isFirstPage = true;
      return;
    }
    this.hasMorePages = true;
    this.pagination.skip = this.pagination.skip - this.pagination.limit;
    await this.onFetch();
    this.$forceUpdate();
  }

  public async next() {
    this.isFirstPage = false;
    this.pagination.skip = this.pagination.skip + this.pagination.limit;
    await this.onFetch();
    this.$forceUpdate();
  }

  public async mounted() {
    try {
      if (this.initPagination) {
        this.pagination = this.initPagination;
      }

      if (this.initData) {
        this.items = this.initData;
        this.pagination.limit = this.initData.length;
        return;
      }

      await this.onFetch();
    } catch (e) {
      Sentry.captureException(e);
      this.$emit('error', true, e.message);
    }
  }

  public async onFetch() {
    this.isLoading = true;
    this.items = await this.fetch(this.pagination, this.query);
    this.isLoading = false;
  }

  @Watch('value')
  public async before() {
    if (!this.value || this.items.length === 0) {
      return;
    }
    this.isLoading = true;
    this.searchByQuery(this.value.toString());
    // while (this.items.map((item) => item.id).indexOf(this.value) === -1) {
    //   if (!this.items.length) {
    //     await this.prev();
    //     this.isLoading = false;
    //     return;
    //   }
    //   await this.next();
    // }
    this.isLoading = false;
  }

  public async searchItem(search: string, loading: (arg: boolean) => void) {
    if (search) {
      loading(true);
      this.searchByQuery(search);
      return;
    }
    this.query.query = '';
    await this.onFetch();
  }

  public async onOpen() {
    this.query.query = '';
    await this.onFetch();
  }
}
</script>

<style>
.select-style .vs__search::placeholder,
.select-style .vs__dropdown-toggle,
.select-style .vs__dropdown-menu {
  @apply border-andrea text-xs p-0;
}

.select-style .vs__search,
.select-style .vs__actions,
.select-style .vs__selected {
  @apply px-2 py-px m-0 text-gray-700;
}

.select-style .vs__open-indicator {
  fill: rgba(74, 85, 104, var(--text-opacity));
}
</style>
