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
    <div class="flex flex-row flex-wrap mb-3">
      <div class="card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Tipo Cn</th>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Descripcion Cliente</th>
              <th>Descripcion Temperatura</th>
              <th>PesoxUnidad</th>
              <th>Unid.Canastilla</th>
              <th>Unid.Canastilla Real</th>
              <th>Dias Vencimeineto</th>
              <th>Fecha de Genearado</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class PesadoViscDt1CsComponent extends Vue {}
</script>

<style scoped></style>
