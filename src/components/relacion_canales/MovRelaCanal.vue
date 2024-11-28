<!-- /*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/ -->
<template>
  <div class="main-div my-8 p-4 space-y-4">
    <modal v-if="isModalOpen" @close="isModalOpen = false">
      <component :is="modalComponent" v-bind="modalProps"></component>
    </modal>
    <PDFModal
      v-if="isPdfOpen"
      :pdfData="pdf"
      @close="isPdfOpen = false"
    ></PDFModal>
    <h1 class="title">Relacion canal deshuese</h1>
    <div class="flex justify-between">
      <div>
        <button class="btn-save" @click="openDespaModal">Info guia</button>
        <button class="btn-save" @click="openLotModal">
          Consolidado productos
        </button>
      </div>
      <div>
        <button class="btn-save" @click="focusTipoMov" ref="addButton">
          Adicionar registro
        </button>
        <button class="btn-primary" @click="saveOrUpdate">Guardar</button>
        <button class="btn-primary" @click="deleteData">Eliminar</button>
      </div>
    </div>
    <div class="card py-4">
      <div class="max-w-5xl space-y-4 mx-auto">
        <div class="flex gap-4">
          <div class="flex-1 space-y-2">
            <label class="label">Tipo movimiento</label>
            <select
              class="select-rounded w-full text-xs px-2 py-1"
              v-model="searchParams.tipoMov"
              ref="tipoMov"
              :disabled="lockForm"
            >
              <option
                v-for="{ idMovimiento, descripcion } in allTipoMov"
                :key="`${idMovimiento}-${descripcion}`"
                :value="idMovimiento"
              >
                {{ descripcion }}
              </option>
            </select>
          </div>
          <div class="flex-1 space-y-2">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              v-model="form.document"
              ref="documentRef"
              :disabled="lockForm"
            />
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <div class="flex-1 space-y-2">
            <div class="flex gap-2 items-center">
              <label class="label">Relacion canal</label>
              <refresh-icon
                v-if="loading"
                class="spinner-border animate-spin h-4 w-4 text-andrea"
                role="status"
              >
              </refresh-icon>
              <check-icon
                v-if="dispatched"
                class="h-4 w-4 text-andrea"
                role="status"
              ></check-icon>
            </div>
            <input
              type="number"
              class="input"
              v-model="searchParams.consecTip"
              disabled
            />
          </div>
          <div class="flex-1 space-y-2">
            <label class="label">Destino</label>
            <div class="flex gap-4 items-center">
              <div
                class="flex gap-4 p-2 border-solid border border-indigo-600 items-center rounded-md"
              >
                <div class="flex gap-2 items-center">
                  <input
                    type="radio"
                    :value="Number(1)"
                    v-model="form.destino"
                  />
                  <label class="label">Despacho</label>
                  <input
                    type="radio"
                    :value="Number(2)"
                    v-model="form.destino"
                  />
                  <label class="label">Deshuese</label>
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <label class="label">Es propio</label>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="form.esPropio"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex-1 space-y-2">
            <label class="label">Terceros</label>
            <PaginatedSelect
              class="text-xs"
              v-model="form.nitoCC"
              :disabled="form.esPropio"
              :fetch="terceros"
              @error="alert"
            />
          </div>
          <div class="flex-1 space-y-2">
            <label class="label">Fecha movimiento</label>
            <input
              type="date"
              class="input p-1"
              v-model="form.fechaMov"
              :disabled="lockForm"
            />
          </div>
        </div>
      </div>
    </div>
    <sub-det-rela-canal
      :locked="disableSubDetForm"
      :consecTip="Number(searchParams.consecTip)"
      :tipoMov="Number(searchParams.tipoMov)"
      :isOwn="form.esPropio"
      :isMovementCreated="dispatched"
      @alert="(a) => alert(a.output, a.isError)"
      @total="(t) => (total = t)"
      @export="(e) => (exportLabel = e)"
    />
    <div class="flex my-4 mx-4 justify-between">
      <div>
        <label v-if="exportLabel !== ''" class="label text-red-500">{{
          exportLabel
        }}</label>
      </div>
      <div>
        <label class="label italic">Total Unidades y Kilos</label>
        <div class="flex gap-4">
          <div class="space-y-2">
            <label class="label">Unidades</label>
            <input
              type="text"
              class="input"
              v-model="total.unid"
              placeholder="unidades"
              disabled
            />
          </div>
          <div class="space-y-2">
            <label class="label">Kilos</label>
            <input
              type="text"
              class="input"
              v-model="total.subtota"
              placeholder="kilos"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex my-4 mx-4 justify-between items-center">
      <div class="items-center w-full max-w-lg">
        <label class="label mb-2">Realizo</label>
        <input
          type="text"
          class="input mb-4"
          v-model="form.entrego"
          :disabled="lockForm"
        />
        <label class="label mb-2">Observaciones</label>
        <textarea
          type="text"
          class="input mb-4"
          v-model="form.observaciones"
          :disabled="lockForm"
        />
      </div>
      <button class="btn-save" @click="print">Imprimir</button>
    </div>
    <hr />
    <ports />
  </div>
</template>

<script lang="ts">
import LayoutWrapper from '@/classes/LayoutWrapper';
import { Component, Ref, Watch } from 'vue-property-decorator';
import RelaCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import { AllTipoMov, BaseResponse, Customer, MovMercanciaRCana } from '@/types';
import { handle } from '@/utils';
import SubDetRelaCanal from '@/components/relacion_canales/SubDetRelaCanal.vue';
import FrmSubRelaCanLot from '@/components/relacion_canales/frmSubRelaCanLot.vue';
import FrmSubConsoDespa from '@/components/relacion_canales/frmSubConsoDespa.vue';
import Ports from '@/components/reusable/Ports.vue';
import Modal from '@/components/reusable/CustomModal.vue';
import PDFModal from '@/components/reusable/ModalPdfPreview.vue';
import RefreshIcon from '@/assets/icons/Refresh.vue';
import CheckIcon from '@/assets/icons/Check.vue';
import moment from 'moment';
import { Component as VComponent } from 'vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IQuery from '@/types/query';

const { dialog } = window;

@Component({
  components: {
    CheckIcon,
    Modal,
    PDFModal,
    PaginatedSelect,
    Ports,
    RefreshIcon,
    SubDetRelaCanal,
  },
  name: 'MovRelaCanal',
})
export default class MovRelaCanal extends LayoutWrapper {
  @Ref('addButton') public readonly addButton: HTMLButtonElement;
  @Ref('tipoMov') public readonly tipoMovButton: HTMLSelectElement;
  @Ref('documentRef') public readonly documentRef: HTMLInputElement;

  public lockForm = true;
  public isModalOpen = false;
  public modalComponent: VComponent = null;
  public modalProps = null;
  public disableSubDetForm = false;
  public loading = false;
  public dispatched = false;
  public allTipoMov: AllTipoMov[] = null;
  public isPdfOpen = false;
  public exportLabel = '';

  public searchParams: Pick<MovMercanciaRCana, 'tipoMov' | 'consecTip'> = {
    consecTip: null,
    tipoMov: null,
  };

  public initalValues: Partial<MovMercanciaRCana> = {
    destino: 2,
    entrego: null,
    esPropio: true,
    fechaMov: null,
    imprim: 'N',
    nitoCC: null,
    observaciones: null,
    procesado: false,
    ...this.searchParams,
  };

  public form = this.initalValues;

  public total: {
    subtota: number;
    unid: number;
  } = {
    subtota: 0,
    unid: 0,
  };

  public pdf = null;

  public showSubDet = false;
  public showSubLot = false;

  private api = new RelaCanalApi(this.$store.getters.getAuthToken);

  public async mounted() {
    this.showLoading(true);
    const [{ data: allTipoMov }] = await handle(this.api.allTipoMov());

    this.allTipoMov = allTipoMov;

    this.showLoading(false);

    if (this.signal) {
      this.signal();
      return;
    }

    this.addButton.focus();
  }

  @Watch('searchParams.tipoMov')
  public async findConsecTip() {
    const [
      {
        data: { consecTip },
      },
    ] = await handle(this.api.findConsecTip(this.searchParams.tipoMov));
    this.searchParams.consecTip = consecTip;
    this.form.nitoCC = this.$store.getters.getTConfinv1.terceroDesh;
    this.documentRef.focus();
  }

  public checkDatesLimit(date: Date) {
    const date1 = new Date(this.$store.getters.getTConfinv1.fechaProc1);
    const date2 = new Date(this.$store.getters.getTConfinv1.fechaProc2);

    return date.getTime() < date1.getTime() || date.getTime() > date2.getTime();
  }

  public validateBeforeSaveOrUpdate() {
    const { fechaMov, ...rest } = this.form;

    if (rest.nitoCC === null) {
      this.alert('La relación no tiene tercero', true);
      this.loading = false;
      return;
    }

    if (this.checkDatesLimit(new Date(fechaMov))) {
      this.alert('La fecha esta afuera del limite permitido', true);
      this.loading = false;
      return;
    }

    if (
      this.searchParams.consecTip === null ||
      this.searchParams.consecTip === 0
    ) {
      this.alert(
        'La Relación de Canal no puede ser Cero, Escoja Tipo de Movimiento',
        true,
      );
      this.loading = false;
      return;
    }
  }

  public async save() {
    this.loading = true;

    this.validateBeforeSaveOrUpdate();

    this.form = {
      ...this.form,
      fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
      fechaMov: moment(this.form.fechaMov).format('YYYY-MM-DD'),
      ...this.searchParams,
    };

    const [data, error] = await handle(this.api.createMovement(this.form));

    if (error) {
      this.alert(error.message, true);
      this.loading = false;
      return;
    }

    this.alert(data.message);
    this.form = data.data;
    this.loading = false;
    this.dispatched = true;
  }

  public async update() {
    this.loading = true;
    this.dispatched = false;

    this.validateBeforeSaveOrUpdate();

    const { tipoMov, consecTip, fechaMov, ...rest } = this.form;

    const [data, error] = await handle(
      this.api.updateMovement(consecTip, tipoMov, {
        ...rest,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
        fechaMov: moment(fechaMov).format('YYYY-MM-DD'),
      }),
    );

    if (error) {
      this.alert(error.message, true);
      this.loading = false;
      return;
    }

    this.alert(data.message);
    this.loading = false;
    this.dispatched = true;
  }

  public async saveOrUpdate() {
    if (!this.dispatched) {
      await this.save();
      return;
    }

    await this.update();
  }

  public async focusTipoMov() {
    if (this.dispatched) {
      this.reload(function () {
        this.addButton.click();
      });
    }

    this.lockForm = false;

    this.$nextTick(() => {
      this.tipoMovButton.focus();
    });
  }

  public openDespaModal() {
    if (!this.dispatched) {
      this.alert('Debe crear el movimiento primero');
      return;
    }

    this.isModalOpen = true;
    this.modalComponent = FrmSubConsoDespa;
    this.modalProps = {
      consecTipG: this.searchParams.consecTip,
      tipoMovG: this.searchParams.tipoMov,
    };
  }

  public async openLotModal() {
    if (!this.dispatched) {
      this.alert('Debe crear el movimiento primero');
      return;
    }

    const [{ data }] = await handle(
      this.api.guiaNumber(
        this.searchParams.consecTip,
        this.searchParams.tipoMov,
      ),
    );

    if (data == null) {
      this.alert('Este movimiento no tiene productos');
      return;
    }

    this.isModalOpen = true;
    this.modalComponent = FrmSubRelaCanLot;
    this.modalProps = {
      guiaGen: data.guiaNo,
    };
  }

  public async print() {
    if (!this.dispatched) {
      this.alert('Debe crear el movimiento primero');
      return;
    }

    this.showLoading(true);

    const [, err] = await handle(
      this.api.updatePesaje(this.searchParams.consecTip),
    );

    if (err) {
      this.alert(err.message, true);
      this.showLoading(false);
      return;
    }

    const [{ data: pdf }] = await handle(
      this.api.report(this.form.idConsecutivo),
    );

    this.form.imprim = 'S';
    await this.update();
    this.showLoading(false);

    this.pdf = pdf;
    this.isPdfOpen = true;
    this.disableSubDetForm = true;
  }

  public async deleteData() {
    if (!this.dispatched) {
      this.alert('No hay movimiento para eliminar', true);
      return;
    }

    const { response } = await dialog.showMessageBox({
      buttons: ['Sí', 'No'],
      cancelId: -1,
      message:
        'Si hace clic en Sí, no podrá deshacer esta operación. ¿Confirma que desea eliminar estos registros?',
      title: 'Está a punto de eliminar uno o más registros',
      type: 'warning',
    });

    if (response !== 0) {
      return;
    }

    const [success, err] = await handle(
      this.api.deleteMovement(
        this.searchParams.consecTip,
        this.searchParams.tipoMov,
      ),
    );

    if (err) {
      this.alert(err.message, true);
      return;
    }
    this.alert(success.message);
    this.reload();
  }

  private async terceros(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<Customer[]>;
    if (q.query) {
      response = await this.api.customersFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.codiCliente,
        item: `${d.nombreCliente} - ${d.nitCliente} - ${d.codiCliente}`,
      }));
    }
    response = await this.api.customers(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.codiCliente,
      item: `${d.nombreCliente} - ${d.nitCliente} - ${d.codiCliente}`,
    }));
  }
}
</script>
