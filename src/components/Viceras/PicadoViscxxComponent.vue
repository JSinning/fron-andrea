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
    <div class="flex flex-row flex-wrap">
      <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
        <h1 class="title">Picado Visceras</h1>
      </div>
      <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
      <div class="pl-64 mb-6 md:mb-0">
        <label class="label">
          Relacion Picado Viscera No:
          <select class="bg-white border py-1 pr-2 shadow leading-tight">
            <option></option>
          </select>
        </label>
      </div>
    </div>

    <div class="flex flex-row flex-wrap mb-2 justify-end">
      <div class="pr-20 mt-2 md:mb-0">
        <button class="btn-save">Adicionar Registro</button>
        <button class="btn-save">Modificar</button>
        <button class="btn-save">Guardar</button>
      </div>
    </div>

    <div class="card">
      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Picado Visceras No:</label>
          <input type="text" class="input" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Grupo:
              <select class="bg-white border py-1 pr-2 select">
                <option></option>
              </select>
            </label>
          </div>
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Turno:
              <select class="bg-white border py-1 pr-2 select">
                <option></option>
              </select>
            </label>
          </div>
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Tipo Pic:
              <select class="bg-white border py-1 pr-2 select">
                <option></option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">
            Tercero:
            <select
              class="bg-white border py-1 pr-2 shadow leading-tight select"
            >
              <option></option>
            </select>
          </label>
        </div>

        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <button class="btn-save p-2">Canastilla</button>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Numero Visceras a Picar:</label>
          <input type="text" class="input" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Fecha de Moviemiento:</label>
          <input type="date" class="input" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Lote Ext:</label>
          <input type="text" class="input" />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Tipo Cn:
              <select class="bg-white border py-1 pr-2 select">
                <option></option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- table -->
    <div class="flex flex-row flex-wrap mb-3">
      <div class="card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Producto</th>
              <th>Guia No</th>
              <th>Animal</th>
              <th>Canastilla</th>
              <th>Decomiso</th>
              <th>Fecha</th>
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

    <hr />

    <div class="flex flex-row flex-wrap mt-4">
      <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
        <label class="label">Realizo</label>
        <input type="text" class="input" />
        <label class="label">Observaciones</label>
        <input type="text" class="input" />
      </div>
      <div class="pl-10">
        <button class="btn-save p-5">Informe Preliminar</button>
      </div>

      <div class="pl-10">
        <button class="btn-save p-5">Imforme Definido</button>
      </div>
    </div>

    <div class="flex flex-row flex-wrap mt-4">
      <div class="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64">
        <button class="btn-save">Desconectar</button>
        <select class="bg-white border py-1 pr-1 shadow leading-tight">
          <option>COM 1</option>
        </select>
        <button class="btn-save ml-2">Conectar</button>
      </div>
    </div>

    <div class="flex flex-row flex-wrap mt-3">
      <div class="px-3 mb-6 md:mb-0">
        <input type="text" class="input" placeholder="Desconectado" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class PicadoViscxxComponent extends Vue {}
</script>

<style scoped></style>
