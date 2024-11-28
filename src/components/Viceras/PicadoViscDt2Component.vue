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
  <div class="main-div">
    <div class="flex flex-row">
      <div class="flex-col">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Codigo:</label>
          <input type="text" class="input" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Prodicto:</label>
          <input type="text" class="input" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Undades:</label>
          <input type="text" class="input" />
        </div>
        <div class="pl-64">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Peso Actual:</label>
            <input type="text" class="input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class PicadoViscDt2Component extends Vue {}
</script>

<style scoped></style>
