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
          <h1 class="title">ASISTENCIA DE EMPLEADOS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2 justify-end">
        <div class="pr-24 mt-2 md:mb-0">
          <button class="btn-save" @click="adicionarModificar()">
            Adicionar Modificar Registro
          </button>
        </div>
      </div>

      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label"
            >Grupo:
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="GruposSelec"
            >
              <option :value="GruposSelec">{{ GruposSelec }}</option>
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
        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Fecha:</label>
          <input
            type="date"
            class="input"
            v-model="Fecha"
            @change="onChageDate()"
          />
        </div>
        <div class="pl-8">
          <button
            class="btn-save px-8"
            @click="generarAsiten()"
            :disabled="readonly"
          >
            Generar
          </button>
        </div>

        <div class="pl-8 pt-4">
          <div class="flex flex-row flex-wrap">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="label">Iinicio Laboral:</label>
              <input type="checkbox" class="checkbox" v-model="InicioLab" />
            </div>
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="label">Termino Laboral:</label>
              <input type="checkbox" class="checkbox" v-model="TerminoLab" />
            </div>
          </div>
        </div>

        <hr />

        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Fecha</th>
                <th>Empleado</th>
                <th>Inicio Labor</th>
                <th>Termino Labor</th>
                <th>ID</th>
                <th>Temporal</th>
                <th>Opcion</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(item, index) in VisLab" :key="index">
                <td>{{ covertirFecha(item.fechaAsis) }}</td>
                <td>{{ item.idEmpleado }}</td>
                <td>{{ convertTrueOrFlase(item.inicioLab) }}</td>
                <td>{{ convertTrueOrFlase(item.terminoLab) }}</td>
                <td>{{ item.idEmpleado2 }}</td>
                <td>{{ item.nominaP }}</td>

                <td>
                  <button
                    class="btn-save mb-2"
                    @click="editAsistemciEmpl(item.idEmpleado2)"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
})
export default class AsistenciaEncComponent extends Vue {
  private output = '';
  private isError: boolean = false;

  private GruposSelec: number = 0;
  private Fecha: string = '';

  private InicioLab: boolean = false;
  private TerminoLab: boolean = false;
  private IdEmpleado: number = 0;

  private Grupos: any = [];

  private VisLab: any = [];

  private readonly: boolean = false;
  private AddModif: boolean = false;

  private isLoading: boolean = false;

  private AsistemVisc = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.grupos();
    this.readonly = true;
  }

  private async grupos() {
    try {
      const response = await this.AsistemVisc.getGrupos();
      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private validar() {
    if (this.Fecha === '' || this.Fecha === null) {
      this.showOutput(true, 'La Fecha  mo pude ser Vacio');
      return true;
    }

    if (this.GruposSelec === 0 || this.GruposSelec === null) {
      this.showOutput(true, 'El grupo no pude ser Cero');
      return true;
    }

    return false;
  }

  private async onChageDate() {
    if (this.GruposSelec === 0) {
      this.showOutput(true, 'Escoja un Grupo');
      this.Fecha = '';
      return;
    }

    await this.visLab(this.GruposSelec, this.Fecha);
  }

  private async visLab(idGrupo: number, fecha: string) {
    this.isLoading = true;
    try {
      const response = await this.AsistemVisc.getVisLab(idGrupo, {
        FechaAsis: moment(fecha).format('YYYY-MM-DD'),
      });
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const nameEmpleado of response.data) {
        const responseEmpleadoName = await this.AsistemVisc.getEmpleadosByID(
          nameEmpleado.IdEmpleado,
        );
        this.VisLab.push({
          fechaAsis: nameEmpleado.FechaAsis,
          idEmpleado: responseEmpleadoName.data[0][0].Nombre,
          idEmpleado2: nameEmpleado.IdEmpleado,
          inicioLab: nameEmpleado.InicioLab,
          nominaP: nameEmpleado.NominaP,
          terminoLab: nameEmpleado.TerminoLab,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async adicionarModificar() {
    if (this.AddModif) {
      await this.modificarEmpleado(this.IdEmpleado);
      return;
    }
    this.readonly = false;
  }

  private covertirFecha(fecha: string) {
    return moment(fecha).utc().format('YYYY-MM-DD');
  }

  private convertTrueOrFlase(estado: boolean) {
    return estado ? 'SI' : 'No';
  }

  private async generarAsiten() {
    const mensage = `Va a Realizar el Proceso de Generacion de Asistencia de Empleados. A Fecha : ${this.covertirFecha(
      this.Fecha,
    )} Se Eliminaran Movimientos si los hay Creados. Esta Seguro de Generar??`;

    const opcion = confirm(mensage);

    if (this.validar()) {
      return;
    }

    if (!opcion) {
      return;
    }

    await this.deletFechaGrup(this.GruposSelec, this.Fecha);

    await this.adicinarAsis(this.GruposSelec);

    this.VisLab = [];
    await this.visLab(this.GruposSelec, this.Fecha);
  }

  private async adicinarAsis(idGrupo: number) {
    try {
      const response = await this.AsistemVisc.putFechaGrup(idGrupo, {
        FechaA: moment(this.Fecha).format('YYYY-MM-DD'),
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.messeger);
    }
  }

  private async deletFechaGrup(idGrupo: number, fecha: string) {
    try {
      const response = await this.AsistemVisc.deleteFechaGrup(idGrupo, {
        fechaAsis: moment(fecha).format('YYYY-MM-DD'),
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async editAsistemciEmpl(idEmpleado: number) {
    this.isLoading = true;
    try {
      const response = await this.AsistemVisc.getEditAistem(idEmpleado);

      this.InicioLab = response.data[0][0].InicioLab;
      this.TerminoLab = response.data[0][0].TerminoLab;
      this.IdEmpleado = response.data[0][0].IdEmpleado;

      this.readonly = false;
      this.AddModif = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private convertboollandNumber(statusLaboral: boolean) {
    return statusLaboral ? 1 : 0;
  }

  private async modificarEmpleado(idEmpleado: number) {
    try {
      const response = await this.AsistemVisc.putEdiitAsistem(idEmpleado, {
        inicioLab: this.convertboollandNumber(this.InicioLab),
        terminoLab: this.convertboollandNumber(this.TerminoLab),
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }

      this.VisLab = [];
      await this.visLab(this.GruposSelec, this.Fecha);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>

<style scoped></style>
