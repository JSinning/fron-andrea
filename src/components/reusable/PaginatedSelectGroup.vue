<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Component,
  Model,
  Watch,
  Emit,
  ProvideReactive,
  Provide,
  Prop,
} from 'vue-property-decorator';
import IPagination from '@/types/IPagination';

@Component({ inject: [] })
export default class PaginatedSelectGroup extends Vue {
  @Prop(Object) public readonly initPagination?: IPagination;
  @Model('change') public readonly value: string | number;

  public model: string | number = null;

  @ProvideReactive('model') public modelProvider = {
    set: (model: string | number) => {
      this.model = model;
    },
    value: this.model,
  };

  public key = 0;

  @ProvideReactive('key')
  public keyProvider = {
    set: (key: number) => {
      this.key = key;
    },
    value: this.key,
  };

  @ProvideReactive('pagination')
  public pagination: IPagination = {
    limit: 100,
    skip: 0,
  };

  @Provide('setPagination')
  public setPagination = (pagination: IPagination) => {
    this.pagination = pagination;
    return this.pagination;
  };

  @Watch('modelProvider.value')
  @Emit('change')
  public change() {
    return this.modelProvider.value;
  }

  @Watch('value')
  public updateModel() {
    this.modelProvider.value = this.value;
  }

  public mounted() {
    if (this.initPagination) {
      this.pagination = this.initPagination;
    }
  }
}
</script>
