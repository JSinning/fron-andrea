<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Fincas</h1>
        </div>
      </div>
      <div class="flex flex-row flex-wrap px-5 justify-end">
        <div class="md:w-15 mb-6 md:mb-0 mt-2" v-if="search">
          <label class="label">Busqueda:</label>
          <select
            class="select"
            v-model="idFinca"
            @change="searchLandsID(idFinca)"
          >
            <option
              v-for="(item, index) in searchLands"
              :key="index"
              :value="item.idFinca"
            >
              {{ item.descripcionFin }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="search = !search">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="update">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="updateLands">Guardar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-delete" @click="viewModalDelete">Eliminar</button>
        </div>
      </div>

      <div class="card mt-5 pt-3">
        <div class="flex flex-row flex-wrap mb-2">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Codigo:</label>
            <input
              type="text"
              class="input"
              v-model="idFinca"
              @change="validateLands(idFinca)"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Descripcion:</label>
            <input
              type="text"
              class="input"
              v-model="descripcionFin"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Propietario:</label>
            <input
              type="text"
              class="input"
              v-model="propietario"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Contacto:</label>
            <input
              type="text"
              class="input"
              v-model="contacto"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Ciudad:</label>
            <select class="select" v-model="ciudad" :disabled="readonly">
              <option
                v-for="(items, index) in itemsCities"
                :key="index"
                :value="items.idCiudad"
              >
                {{ items.descripcionCiu }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Vereda:</label>
            <input
              type="text"
              class="input"
              v-model="vereda"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Region:</label>
            <input
              type="text"
              class="input"
              v-model="region"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Ubicacion:</label>
            <input
              type="text"
              class="input"
              v-model="ubicacion"
              :readonly="ubicacion"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal delete Conductor -->
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
              >&#x1f6c8; Esta seguro que desea eliminar Al conductor?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalLands()">
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
    <!-- End Modal delete Conductor -->
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'FincasMod',
})
export default class FincasMod extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private search: boolean = false;
  private readonly: boolean = false;
  private modaldelete = false;
  private idFinca: string = '';
  private descripcionFin: string = '';
  private propietario: string = '';
  private contacto: string = '';
  private ciudad: string = '';
  private vereda: string = '';
  private region: string = '';
  private ubicacion: string = '';
  private fecha: string = '';
  private searchLands: any = [];
  private itemsCities: any = [];

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.searchLand();
    await this.citiesFinca();
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private viewModalDelete() {
    this.modaldelete = true;
  }

  private async acceptModalLands() {
    if (this.idFinca === '' || this.idFinca === null) {
      return;
    }

    await this.deleteLands(this.idFinca);
    this.modaldelete = false;
  }

  private update() {
    this.readonly = !this.readonly;
  }

  private validation() {
    if (this.idFinca === '' || this.idFinca === null) {
      this.showOutput(true, 'El codigo no puede ser vacia');
      return true;
    }

    if (this.descripcionFin === '' || this.descripcionFin == null) {
      this.showOutput(true, 'La descripcion no puede estar vacio');
      return true;
    }

    return false;
  }

  private async updateLands() {
    if (this.validation()) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putFincas(this.idFinca, {
        ciudadF: this.ciudad,
        contacto: this.contacto,
        descripcionFin: this.descripcionFin,
        fecha: this.fecha,
        idFinca: this.idFinca,
        propietario: this.propietario,
        region: this.region,
        ubicacion: this.ubicacion,
        vereda: this.vereda,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
      }
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private async searchLand() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getFincas();
      this.searchLands = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchLandsID(id: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getFincaID(id);
      this.idFinca = response.data.idFinca;
      this.descripcionFin = response.data.descripcionFin;
      this.propietario = response.data.propietario;
      this.contacto = response.data.contacto;
      this.ciudad = response.data.ciudad;
      this.vereda = response.data.vereda;
      this.region = response.data.region;
      this.ubicacion = response.data.ubicacion;
      this.fecha = response.data.fecha;

      this.search = false;
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async citiesFinca() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCiudadesFinca();
      this.itemsCities = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async validateLands(id: string) {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.getFincasID(id);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteLands(id: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.deleteFincas(id);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.clearData();
        this.searchLands = [];
        await this.searchLand();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar Fincas');
    } finally {
      this.isLoading = false;
    }
  }

  private clearData() {
    this.idFinca = '';
    this.descripcionFin = '';
    this.propietario = '';
    this.contacto = '';
    this.ciudad = '';
    this.vereda = '';
    this.region = '';
    this.ubicacion = '';
  }
}
</script>
