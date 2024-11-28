<!--
  */
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 /*
 -->
<template>
  <div>
    <div
      class="flex-row flex flex-wrap p-1 m-1 shadow text-sm bg-andrea"
      v-for="(value, name) in items"
      v-bind:key="name"
      :class="itemSelected == name ? theme : ''"
      @click="
        selected(value);
        itemSelected = name;
      "
    >
      <div v-for="(v, n, i) in value" :key="i">
        <h1 class="mr-2">
          <div v-if="showHeader(titles[i], v)">
            <strong>{{ titles[i] }}:</strong>
            {{ loadValues(v) }}
          </div>
        </h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'ItemTable',
  props: {
    items: Array,
    titles: Array,
  },
})
export default class ItemTable extends Vue {
  private itemSelected: undefined;
  private theme: string = 'bg-andrea';

  public selected(item: any) {
    this.$emit('item-selected', item);
  }

  public loadValues(v: any) {
    if (typeof v === 'boolean') {
      return v ? 'Si' : 'No';
    } else {
      return v;
    }
  }

  public showHeader(t: any, v: any) {
    if (t === undefined) {
      return false;
    }
    if (v === null || v === '') {
      return false;
    }
    return true;
  }
}
</script>
