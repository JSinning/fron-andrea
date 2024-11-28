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
          <h1 class="title">GRUPOS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2 justify-end">
        <div class="pr-24 mt-2 md:mb-0">
          <button class="btn-save" @click="adicionarGrupo()">
            Adicionar Grupo
          </button>
          <button class="btn-save" @click="modificarGrupo()">
            Modificar Grupo
          </button>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">ID Grupo:</label>
            <input
              type="text"
              class="input"
              v-model="IdGrupo"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Descripcion:</label>
            <input type="text" class="input" v-model="Descripcion" />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label"> Jefe Grupo: </label>
            <PaginatedSelect
              v-model="JefeGrupoID"
              :fetch="jefeGrupos"
              @error="showOutput"
            />
          </div>
        </div>
      </div>

      <hr />
      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table">
          <table class="table-fixed w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>ID Grupo</th>
                <th>Descripcion</th>
                <th>Jefe Grupo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in GrupoEmp"
              :key="index"
            >
              <tr>
                <td>{{ item.IdGrupo }}</td>
                <td>{{ item.Descrip }}</td>
                <td v-for="(sub, subIndex) in item.JefeGrup" :key="subIndex">
                  {{ sub.Nombre }}
                </td>

                <td>
                  <button class="btn-save mb-2" @click="ediit(item.IdGrupo)">
                    Editar
                  </button>
                  <button
                    class="btn-delete mb-2"
                    @click="viewModalDelete(item.IdGrupo)"
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
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';
import Select from '../reusable/select.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IPagination from '@/types/IPagination';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
    Select,
  },
  name: 'ViscGruposEmp',
})
export default class ViscGruposEmp extends Vue {
  private output = '';
  private isError: boolean = false;
  private readonly: boolean = false;
  private modaldelete: boolean = false;

  private GrupoEmp: any = [];

  private JefeGrupoID: number = 0;
  private IdGrupo: number = 0;
  private Descripcion: string = '';

  private isLoading: boolean = false;

  private ViscGrupEmpApi = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.grupoEmp();
  }

  private async grupoEmp() {
    this.isLoading = true;
    try {
      const response = await this.ViscGrupEmpApi.getGrupos();
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const grupo of response.data) {
        const nombre = await this.ViscGrupEmpApi.getJefeGrupoID(grupo.jefeGrup);

        this.GrupoEmp.push({
          Descrip: grupo.descripGrup,
          IdGrupo: grupo.idGrupo,
          JefeGrup: nombre.data,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async adicionarGrupo() {
    if (this.validation()) {
      return;
    }

    try {
      const response = await this.ViscGrupEmpApi.postGrupos({
        descripGrup: this.Descripcion,
        idGrupo: this.IdGrupo,
        jefeGrup: this.JefeGrupoID,
      });
      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
      this.GrupoEmp = [];
      await this.grupoEmp();
      this.clearFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async ediit(idGrupos: number) {
    this.isLoading = true;
    try {
      const response = await this.ViscGrupEmpApi.getGruposID(idGrupos);
      this.IdGrupo = response.data.idGrupo;
      this.Descripcion = response.data.descripGrup;
      this.JefeGrupoID = response.data.jefeGrup;

      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async modificarGrupo() {
    try {
      const response = await this.ViscGrupEmpApi.putGrupos(this.IdGrupo, {
        descripGrup: this.Descripcion,
        idGrupo: this.IdGrupo,
        jefeGrup: this.JefeGrupoID,
      });
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      this.GrupoEmp = [];
      await this.grupoEmp();
      this.clearFrom();
      this.readonly = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async eleinarReguitroGrupo(idGrupo: number) {
    try {
      const response = await this.ViscGrupEmpApi.deleteGrupos(idGrupo);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.GrupoEmp = [];
      await this.grupoEmp();
      this.clearFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private clearFrom() {
    this.IdGrupo = 0;
    this.Descripcion = '';
    this.JefeGrupoID = 0;
  }

  private validation() {
    if (this.IdGrupo === 0) {
      this.showOutput(true, 'El idGrupo no pude ser cero');
      return true;
    }
    if (this.Descripcion === null || this.Descripcion === '') {
      this.showOutput(true, 'La DESCRIPCION  no pude estar vacia');
      return true;
    }
    if (this.JefeGrupoID === 0) {
      this.showOutput(true, 'El Jefe de Grupo no pude ser Vacio');
      return true;
    }
    return false;
  }

  private async buttonModalSi() {
    if (this.IdGrupo === 0) {
      return;
    }
    await this.eleinarReguitroGrupo(this.IdGrupo);
    this.modaldelete = false;
    this.IdGrupo = 0;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private viewModalDelete(id: number) {
    this.IdGrupo = id;
    this.modaldelete = true;
  }

  private async jefeGrupos(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<Array<{ Nombre: string; IDEmpleado: number }>>;
    if (q.query) {
      response = await this.ViscGrupEmpApi.getJefeGrupoFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IDEmpleado,
        item: d.Nombre,
      }));
    }
    response = await this.ViscGrupEmpApi.getJefeGrupo(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IDEmpleado,
      item: d.Nombre,
    }));
  }
}
</script>
