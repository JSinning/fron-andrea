<template>
  <PaginatedSelect
    v-model="model.value"
    :fetch="fetcher"
    :initPagination="pagination"
    :key="key"
    :disabled="disabled"
    @change="$emit('change')"
  />
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  InjectReactive,
  Inject,
  Watch,
} from 'vue-property-decorator';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';

@Component({
  components: {
    PaginatedSelect,
  },
})
export default class PaginatedSelectGroupItem extends Vue {
  @Prop(Boolean) public readonly disabled?: boolean;

  @InjectReactive('key')
  public keyProvider: { value: number; set: (key: number) => void };

  public key = this.keyProvider.value ?? 0;

  @InjectReactive({ from: 'model' }) public model: {
    value: string | number;
    set: (model: string | number) => void;
  };

  @InjectReactive({ from: 'pagination' }) public pagination: IPagination;

  @Inject({ from: 'setPagination' }) public setPagination: (
    pagination: IPagination,
  ) => IPagination;

  @Prop(Function) public fetch: (
    pagination: IPagination,
  ) => Promise<IInterfaceSelect[]>;

  public async fetcher(pagination: IPagination) {
    let pag = this.setPagination(pagination);
    this.key++;
    this.keyProvider.set(this.key);
    return this.fetch(pag);
  }

  @Watch('model.value')
  public setValue() {
    this.model.set(this.model.value);
  }
}
</script>
