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
    <div class="flex flex-row justify-end">
      <button class="btn-primary mr-8 mb-4" @click="$refs.pdfDocument.print()">
        Imprimir Documento
      </button>
    </div>
    <div class="h-80 pr-8 pl-8 overflow-auto">
      <pdf ref="pdfDocument" :src="pdfData"></pdf>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import pdf from 'vue-pdf';

@Component({
  components: {
    pdf,
  },
  name: 'PDFPreview',
})
export default class PDFPreview extends Vue {
  @Prop(String) public pdfData: string | undefined;
  private pdfSrc: string = '';
}
</script>
