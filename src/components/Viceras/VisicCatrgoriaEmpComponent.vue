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
          <h1 class="title">CATEGORIA EMPLEADOS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2 justify-end">
        <div class="pr-24 mt-2 md:mb-0">
          <button class="btn-save" @click="adicionarEmpl()">
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
            <label class="label">Id Categoria:</label>
            <input
              type="text"
              class="input"
              v-model="idCategoria"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Descripcion:</label>
            <input type="text" class="input" v-model="Descripcion" />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Valor Estimado Quincena:</label>
            <input type="text" class="input" v-model="ValorQuincena" />
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
                <th>ID Categoria</th>
                <th>Descripcion</th>
                <th>Valor Estimado Quincena</th>
                <th>Opcion</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in CategoEmp"
              :key="index"
            >
              <tr>
                <td>{{ item.categoriaEmpl }}</td>
                <td>{{ item.descripcionCatE }}</td>
                <td>{{ item.valorEstimaQ }}</td>

                <td>
                  <button
                    class="btn-save mb-2"
                    @click="editCate(item.categoriaEmpl)"
                  >
                    Editar
                  </button>
                  <button
                    class="btn-delete mb-2"
                    @click="viewModalDelete(item.categoriaEmpl)"
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

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'VisicCatrgoriaEmpComponent',
})
export default class VisicCatrgoriaEmpComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private modaldelete: boolean = false;

  private CategoEmp: any = [];

  private idCategoria: string = '';
  private Descripcion: string = '';
  private ValorQuincena: string = '';
  private readonly: boolean = false;

  private isLoading: boolean = false;

  private ViscCategEmpApi = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.categoriaEmp();
  }

  private async categoriaEmp() {
    this.isLoading = true;
    try {
      const response = await this.ViscCategEmpApi.getCategoriaEmp();
      this.CategoEmp = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async adicionarEmpl() {
    if (this.validation()) {
      return;
    }

    try {
      const response = await this.ViscCategEmpApi.postCategriaEmp({
        categoriaEmpl: this.idCategoria,
        descripcionCatE: this.Descripcion,
        valorEstimaQ: this.ValorQuincena,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }

      await this.categoriaEmp();
      this.clearFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async editCate(idCategoria: string) {
    this.isLoading = true;
    try {
      const response =
        await this.ViscCategEmpApi.getCategoriaEmpID(idCategoria);
      this.idCategoria = response.data.categoriaEmpl;
      this.Descripcion = response.data.descripcionCatE;
      this.ValorQuincena = response.data.valorEstimaQ;
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.nessage);
    } finally {
      this.isLoading = false;
    }
  }

  private async modificarEmpleado() {
    if (this.validation()) {
      return;
    }
    try {
      const response = await this.ViscCategEmpApi.putCategoriaEmp(
        this.idCategoria,
        {
          categoriaEmpl: this.idCategoria,
          descripcionCatE: this.Descripcion,
          valorEstimaQ: this.ValorQuincena,
        },
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      await this.categoriaEmp();
      this.clearFrom();
      this.readonly = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private clearFrom() {
    this.idCategoria = '';
    this.Descripcion = '';
    this.ValorQuincena = '';
  }

  private validation() {
    if (this.idCategoria === null || this.idCategoria === '') {
      this.showOutput(true, 'El IDCategori esta vacio');
      return true;
    }

    if (this.CategoEmp === null || this.CategoEmp === '') {
      this.showOutput(true, 'El Descripcion esta vacio');
      return true;
    }

    if (this.ValorQuincena === null || this.ValorQuincena === '') {
      this.showOutput(true, 'El Valor Quincena  esta vacio');
      return true;
    }

    return false;
  }

  private async eleinarReguitroEmpleado(idEmpleado: string) {
    try {
      const response =
        await this.ViscCategEmpApi.deleteCategoriaEmp(idEmpleado);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      await this.categoriaEmp();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async buttonModalSi() {
    if (this.idCategoria === '') {
      return;
    }
    await this.eleinarReguitroEmpleado(this.idCategoria);
    this.modaldelete = false;
    this.idCategoria = '';
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private viewModalDelete(id: string) {
    this.idCategoria = id;
    this.modaldelete = true;
  }
}
</script>

<style scoped></style>
