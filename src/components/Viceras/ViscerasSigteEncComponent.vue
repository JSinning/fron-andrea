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
    <div class="modal mt-3">
      <div class="modal-container">
        <div class="modal-body">
          <div class="card-table">
            <table class="table-auto w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th># Guia</th>
                  <th># Viceras</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr class="border-b border-gray-500">
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ViscerasSigteEncComponent extends Vue {}
</script>

<style scoped></style>
