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
  <div class="flex flex-wrap mx-auto p-1 w-1/2">
    <label class="label" for="input">
      <slot></slot>
    </label>
    <input id="input" :value="text" @input="inputOccurred" class="input" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  model: {
    event: 'input',
    prop: 'text',
  },
  name: 'CustomInput',
  props: ['text'],
})
export default class CustomInput extends Vue {
  public inputOccurred(e: any) {
    this.$emit('input', e.target.value);
  }
}
</script>
