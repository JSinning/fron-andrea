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
  <div class="md:flex md:items-center mb-6">
    <label class="label">
      <input
        :checked="value"
        type="checkbox"
        @change="$emit('input', $event.target.checked)"
        class="mr-2 leading-tight"
      />
      <span class="text-xs">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Checkbox',
  props: ['value'],
})
export default class Checkbox extends Vue {}
</script>
