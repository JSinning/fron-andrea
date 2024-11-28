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
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <component v-bind:is="componentName"></component>
          </div>
          <div class="modal-footer flex flex-row justify-center">
            <button
              @click="close"
              class="flex justify-center btn-save w-32"
              name="footer"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Avisos from '@/components/pieles/Avisos.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Avisos,
  },
  name: 'Modal',
  props: {
    componentName: String,
  },
})
export default class Modal extends Vue {
  public close() {
    this.$emit('close');
  }
}
</script>
