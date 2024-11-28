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
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div">
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">EMPLEADOS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2 justify-end">
        <div class="pr-24 mt-2 md:mb-0">
          <button class="btn-save" @click="adicionarEmpleado()">
            Adicionar Empleado
          </button>
          <button class="btn-save" @click="modificarEmpleado()">
            Modificar Empleado
          </button>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label"
              >Grupo:
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="GrupoSelct"
                @change="onChagereGrupo()"
              >
                <option :value="GrupoSelct">{{ GrupoSelct }}</option>
                <option
                  v-for="(item, index) in Grupos"
                  :key="index"
                  :value="item.idGrupo"
                >
                  {{ item.descripGrup }}
                </option>
              </select>
            </label>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Jefe Grupo:</label>
            <PaginatedSelect
              class="text-xs"
              v-model="Empleado"
              :fetch="empleados"
              @error="showOutput"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Categoria:</label>
            <select class="select" v-model="CategoriaEmpl">
              <option :value="CategoriaEmpl">{{ CategoriaEmpl }}</option>
              <option
                v-for="(item, index) in CategoEmp"
                :key="index"
                :value="item.categoriaEmpl"
              >
                {{ item.descripcionCatE }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">ID:</label>
            <input type="text" class="input" v-model="Empleado" readonly />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Temporal:</label>
            <input type="text" class="input" v-model="Temporal" readonly />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha Ingreso:</label>
            <input type="text" class="input" v-model="Fecha" readonly />
          </div>
        </div>
      </div>

      <hr />
      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Empleado</th>
                <th>Categoria</th>
                <th>ID</th>
                <th>Temporal</th>
                <th>Fecha Ingreso</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(item, index) in TblEmpleado" :key="index">
                <td>{{ item.empleado }}</td>
                <td>{{ item.categoria }}</td>
                <td>{{ item.idEmpleado }}</td>
                <td>{{ item.temporal }}</td>
                <td>{{ convertirFecha(item.fecha) }}</td>
                <td>
                  <button
                    class="btn-save mb-2"
                    @click="editEmpledo(item.idEmpleado)"
                  >
                    Editar
                  </button>
                  <button
                    class="btn-delete mb-2"
                    @click="viewModalDelete(item.idEmpleado)"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal delete TipoPes -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modaldelete"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta seguro que desea eliminar este campo ?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="buttonModalSi()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalDelete()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal delete TipoPes -->
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
  },
  name: 'AdicionarEmpliado',
})
export default class VisicEmpleadosGrEncComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private modaldelete: boolean = false;

  private GrupoSelct: number = 0;
  private CategoriaEmpl: string = '';
  private Empleado: number = 0;
  private Temporal: number = 0;
  private Fecha: string = '';

  private Grupos: any = [];
  private CategoEmp: any = [];
  private TblEmpleado: any = [];

  private isLoading: boolean = false;

  private AdicEmplApi = new MovViserasApi(this.$store.getters.getAuthToken);

  public async empleados(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<Array<{ Nombre: string; IDEmpleado: number }>>;
    if (q.query) {
      response = await this.AdicEmplApi.getJefeGrupoFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IDEmpleado,
        item: d.Nombre,
      }));
    }
    response = await this.AdicEmplApi.getJefeGrupo(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IDEmpleado,
      item: d.Nombre,
    }));
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.grupos();
    await this.categoriaEmp();
  }

  private convertirFecha(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async grupos() {
    try {
      const response = await this.AdicEmplApi.getGrupos();

      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async categoriaEmp() {
    try {
      const response = await this.AdicEmplApi.getCategoriaEmp();
      this.CategoEmp = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async onChagenEmpleado() {
    if (this.Empleado === 0) {
      return;
    }

    await this.temporal(this.Empleado);

    await this.fechaEmpleado(this.Empleado);
  }

  private async temporal(idEmplead: number) {
    try {
      const response = await this.AdicEmplApi.getEmpleTem(idEmplead);
      this.Temporal = response.data[0][0].NominaP;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fechaEmpleado(idEmpleado: number) {
    try {
      const response = await this.AdicEmplApi.getEmpleFech(idEmpleado);
      this.Fecha = moment(response.data[0][0].FechaIngreso).format(
        'YYYY-MM-DD',
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async onChagereGrupo() {
    if (this.GrupoSelct === 0) {
      return;
    }

    this.TblEmpleado = [];

    await this.tblEmpleado(this.GrupoSelct);
  }

  private async tblEmpleado(idGrupo: number) {
    this.isLoading = true;
    try {
      const response = await this.AdicEmplApi.getEmplTodo(idGrupo);
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const Empleado of response.data[0]) {
        const temp = await this.AdicEmplApi.getEmpleTem(Empleado.IdEmpleado);
        const fecha = await this.AdicEmplApi.getEmpleFech(Empleado.IdEmpleado);
        const empleadoName = await this.AdicEmplApi.getEmpleadosByID(
          Empleado.IdEmpleado,
        );

        this.TblEmpleado.push({
          categoria: Empleado.CategoriaEmpl,
          empleado: empleadoName.data[0][0].Nombre,
          fecha: fecha.data[0][0].FechaIngreso,
          idEmpleado: Empleado.IdEmpleado,
          temporal: temp.data[0][0].NominaP,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async adicionarEmpleado() {
    if (this.validarForm()) {
      return;
    }

    try {
      const response = await this.AdicEmplApi.postEmpleado({
        categoriaEmpl: this.CategoriaEmpl,
        idEmpleado: this.Empleado,
        idGrupo: this.GrupoSelct,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.TblEmpleado = [];
      await this.tblEmpleado(this.GrupoSelct);
      this.clearFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async editEmpledo(idEmpleado: number) {
    this.isLoading = true;
    try {
      const response = await this.AdicEmplApi.getEmpleadoID(idEmpleado);
      this.GrupoSelct = response.data[0][0].IdGrupo;
      this.Empleado = response.data[0][0].IdEmpleado;
      this.CategoriaEmpl = response.data[0][0].CategoriaEmpl;
      await this.onChagenEmpleado();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async modificarEmpleado() {
    try {
      const response = await this.AdicEmplApi.putEmpleado(this.Empleado, {
        IdEmpleado: this.Empleado,
        categoriaEmpl: this.CategoriaEmpl,
        idGrupo: this.GrupoSelct,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.TblEmpleado = [];
      await this.tblEmpleado(this.GrupoSelct);
      this.clearFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async eleinarReguitroElemento(idEmpleado: number) {
    try {
      const response = await this.AdicEmplApi.deleteEmpleado(idEmpleado);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.TblEmpleado = [];
      await this.tblEmpleado(this.GrupoSelct);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async buttonModalSi() {
    if (this.Empleado === 0) {
      return;
    }
    await this.eleinarReguitroElemento(this.Empleado);
    this.modaldelete = false;
    this.Empleado = 0;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private viewModalDelete(id: number) {
    this.Empleado = id;
    this.modaldelete = true;
  }

  private clearFrom() {
    this.Empleado = 0;
    this.CategoriaEmpl = '';
    this.Temporal = 0;
    this.Fecha = '';
  }

  private validarForm() {
    if (this.GrupoSelct === 0) {
      this.showOutput(true, 'El GRUPO NO PUEDE SER VACIO');
      return true;
    }
    if (this.Empleado === 0) {
      this.showOutput(true, 'EL EMPLEADO NO PUDE SER VACIO');
      return true;
    }
    if (this.CategoriaEmpl === null || this.CategoriaEmpl === '') {
      this.showOutput(true, 'LA CATEGORIA NO PUDE SER VACIA');
      return true;
    }
    return false;
  }
}
</script>
