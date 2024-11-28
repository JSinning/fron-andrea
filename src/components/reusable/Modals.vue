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
  <!-- Modal -->
  <div
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
    v-if="openModal"
  >
    <div class="relative mx-auto w-auto max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col">
        <div
          class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="text-lg">&#x1f6c8; <slot></slot></strong>
          <div class="content-center mt-2">
            <div class="flex flex-row flex-wrap">
              <div
                class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
              >
                <button class="btn-succes" @click="acceptModal">Si</button>
              </div>
              <div
                class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
              >
                <button class="btn-danger" @click="close">No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'Modals',
})
export default class Modals extends Vue {
  @Prop(Boolean) public openModal?: boolean;

  public acceptModal() {
    this.$emit('Ok');
  }

  public close() {
    this.$emit('close');
  }
}
</script>
