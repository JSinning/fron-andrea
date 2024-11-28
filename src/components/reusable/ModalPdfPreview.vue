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
          <div class="modal-body h-450 overflow-auto">
            <iframe
              class="w-full h-full"
              ref="pdfDocument"
              :src="pdfSrc"
            ></iframe>
          </div>
          <div class="modal-footer flex flex-row justify-center">
            <button
              @click="close"
              class="flex justify-center btn-save w-32"
              name="footer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import pdf from 'vue-pdf';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    pdf,
  },
  name: 'ModalPDFPreview',
})
export default class Modal extends Vue {
  @Prop(String) public pdfData: string | undefined;
  private pdfSrc: string = '';

  public mounted() {
    this.pdfSrc = URL.createObjectURL(this.b64toBlob(this.pdfData));
  }

  public close() {
    this.$emit('close');
  }

  private b64toBlob(b64Data: string): Blob {
    const byteArray: Uint8Array = Uint8Array.from(atob(b64Data), (c) =>
      c.charCodeAt(0),
    );
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return blob;
  }
}
</script>
