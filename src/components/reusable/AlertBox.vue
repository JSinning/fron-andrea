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
  <transition
    enter-active-class="animate__fadeInLeft"
    leave-active-class="animate__fadeOutLeft"
  >
    <div
      @click="emptyOutput"
      v-if="output != ''"
      class="alertbox animate__animated"
      :class="{ 'bg-red-500': isError }"
    >
      <div class="flex flex-row">
        <svg
          class="fill-current w-4 h-4 mt-1 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
          />
        </svg>
        <pre>{{ output }}</pre>
      </div>
      <button @click="emptyOutput" class="font-bold mr-3">x</button>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'AlertBox',
})
export default class AlertBox extends Vue {
  @Prop(String) public output: string | undefined;
  @Prop(Boolean) public isError: boolean = false;

  public emptyOutput() {
    this.$emit('empty');
  }

  @Watch('output')
  public closeModal() {
    if (this.output === '') {
      return;
    }
    setTimeout(() => this.emptyOutput(), 9000);
  }
}
</script>
