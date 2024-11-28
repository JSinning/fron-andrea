<template>
  <button class="btn-primary" v-show="hasMore" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import IPagination from '@/types/IPagination';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'ButtonPagination' })
export default class ButtonPagination extends Vue {
  @Prop(Object) public readonly currentPagination: IPagination;
  @Prop(Number) public readonly currentDataLength: number;

  public get hasMore() {
    return this.currentPagination.limit === this.currentDataLength;
  }
}
</script>
