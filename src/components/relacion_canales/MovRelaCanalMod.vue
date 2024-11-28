<template>
  <div class="container mx-auto">
    <div class="main-div mb-2">
      <modal v-if="isModalOpen" @close="isModalOpen = false">
        <component :is="modalComponent" v-bind="modalProps"></component>
      </modal>
      <PDFModal
        v-if="isPdfOpen"
        :pdfData="pdf"
        @close="isPdfOpen = false"
      ></PDFModal>
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-2/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Relacion canal deshuese</h1>
        </div>
        <div class="px-3 md:w-3/4 mt-2 mb-3 md:mb-0" style="margin-right: 3px">
          <div ref="busClientRef" :style="{ display: 'none' }">
            <label class="label">Busqueda relacion de canal:</label>
            <PaginatedSelect
              class="text-xs"
              v-model="idConsecutivo"
              :fetch="busClient"
              @change="onUpdateBusClient"
            />
          </div>
        </div>

        <div class="md:w-1/3 px-3 mb-6 md:mb-0 mt-2">
          <button @click="openDespaModal" class="btn-save">Info guia</button>
          <button @click="openLotModal" class="btn-save">
            Consolidado productos
          </button>
        </div>
        <div class="md:w-2/3 px-3 mb-6 md:mb-0 mt-2 float-left">
          <button class="btn-save" @click="showBusClient">
            Buscar registro
          </button>
          <button class="btn-primary" @click="modify">
            Modificar registro
          </button>
          <button class="btn-primary" @click="save">Guardar registro</button>
          <button class="btn-primary" @click="onClickAnularTab">
            Anular registro
          </button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="anular" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block mb-0 text-andrea font-semibold text-xs"
          >
            Datos Basicos
          </span>
        </label>

        <label for="anular">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block mb-0 text-andrea font-semibold text-xs"
            ref="anularTabRef"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 hidden tab-datos">
        <div class="flex flex-row flex-wrap w-full">
          <div class="md:w-1/8 px-3 mb-6 md:mb-0">
            <label class="label">Tipo movimiento</label>
            <select
              ref="tipoMovRef"
              class="select-rounded w-full text-xs px-2 py-1"
              v-model="form.tipoMov"
              :disabled="lockedForm"
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

          <div class="md:w-4/12 px-3 mb-6 md:mb-0">
            <label class="label">Relacion canal</label>
            <input type="text" class="input" v-model="form.consecTip" />
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Destino :</label>
          </div>

          <div class="px-3 mb-6 md:mb-0">
            <div class="border-solid border border-indigo-600">
              <div class="flex flex-row flex-wrap">
                <div class="px-3 mb-6 md:mb-0">
                  <label class="label">Despacho:</label>
                  <input
                    type="radio"
                    class="checkbox"
                    :value="1"
                    v-model="form.destino"
                  />
                </div>
                <div class="px-3 mb-6 md:mb-0">
                  <label class="label">Deshuese:</label>
                  <input
                    type="radio"
                    class="checkbox"
                    :value="2"
                    v-model="form.destino"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="md:w-1/10 px-1 mb-6 md:mb-0 inline">
            <label class="label">Es propio:</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="form.esPropio"
              readonly
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
            <label class="label">Terceros</label>
            <PaginatedSelect
              class="text-xs"
              v-model="form.nitoCC"
              :disabled="form.esPropio"
              :fetch="terceros"
              @error="alert"
            />
          </div>
          <div class="md:w-4/12 px-3 py-3 mb-1 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              v-model="form.document"
              :disabled="lockedForm"
            />
          </div>
          <div class="md:w-1/8 px-3 py-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input
              type="date"
              class="input p-1"
              v-model="form.fechaMov"
              :disabled="lockedForm"
            />
          </div>
        </div>

        <sub-det-rela-canal
          :key="form.consecTip"
          :locked="lockedForm"
          :consecTip="Number(form.consecTip)"
          :tipoMov="Number(form.tipoMov)"
          :isOwn="form.esPropio"
          :isMovementCreated="true"
          @alert="(a) => alert(a.output, a.isError)"
          @total="(t) => (total = t)"
          @export="(e) => (exportLabel = e)"
          :fetchOnMount="true"
        />

        <div class="flex flex-row flex-wrap mb-2">
          <div class="md:w-1/8 px-3 mb-2 md:mb-0">
            <input type="text" class="input" disabled />
          </div>

          <label v-if="exportLabel !== ''" class="label text-red-500">{{
            exportLabel
          }}</label>

          <div class="md:w-7 px-3 mb-2 md:mb-0">
            <label class="label">Total Unidades y Kilos :</label>
          </div>

          <div class="md:w-7 px-3 mb-2 md:mb-0">
            <input
              type="text"
              class="input"
              v-model="total.unid"
              placeholder="unidades"
              readonly
            />
          </div>

          <div class="md:w-7 mb-2 md:mb-0">
            <input
              type="text"
              class="input"
              v-model="total.subtota"
              placeholder="kilos"
              readonly
            />
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-4">
          <div class="px-3 mb-2 md:mb-0">
            <label class="label">Realizo</label>
            <input
              type="text"
              class="input"
              v-model="form.entrego"
              :disabled="lockedForm"
            />
          </div>
          <div class="md:w-4/12 mb-2 px-3 md:mb-0">
            <label class="label">Observaciones</label>
            <input
              type="text"
              class="input"
              v-model="form.observaciones"
              :disabled="lockedForm"
            />
          </div>
          <div class="px-3 mb-2 md:mb-0">
            <button class="btn-save" :disabled="lockedForm" @click="print">
              Imprimir
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Anulado</label>
            <input
              type="checkbox"
              class="checkbox"
              readonly
              ref="anularRef"
              v-model="form.anulada"
            />
          </div>

          <div class="md:w-7 mb-2 md:mb-0">
            <label class="label">Motivo:</label>
            <input
              type="text"
              class="input"
              v-model="form.motivoAnul"
              ref="motivoAnulRef"
            />
          </div>

          <div class="md:w-1/3 px-3 mb-6 md:mb-0 mt-2">
            <button class="btn-save" @click="anular">Anular</button>
          </div>
        </div>
      </div>

      <hr />

      <ports />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator';
import '../../assets/tab.css';
import LayoutWrapper from '@/classes/LayoutWrapper';
import RelaCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import { handle } from '@/utils/handle';
import { TMovimientos } from '@/remote/api/relacion_canales/types/TMovimiento';
import moment from 'moment';
import { MovMercanciaRCana, AllTipoMov, Customer, BaseResponse } from '@/types';
import Ports from '@/components/reusable/Ports.vue';
import SubDetRelaCanal from '@/components/relacion_canales/SubDetRelaCanal.vue';
import Modal from '@/components/reusable/CustomModal.vue';
import PDFModal from '@/components/reusable/ModalPdfPreview.vue';
import FrmSubRelaCanLot from '@/components/relacion_canales/frmSubRelaCanLot.vue';
import FrmSubConsoDespa from '@/components/relacion_canales/frmSubConsoDespa.vue';
import { Component as VComponent } from 'vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IQuery from '@/types/query';

@Component({
  components: {
    Modal,
    PDFModal,
    PaginatedSelect,
    Ports,
    SubDetRelaCanal,
  },
  name: 'MovRelaCanalMod',
})
export default class MovRelaCanalMod extends LayoutWrapper {
  @Ref('busClientRef') public readonly busClientRef: HTMLDivElement;
  @Ref('tipoMovRef') public readonly tipoMovRef: HTMLSelectElement;
  @Ref('anularRef') public readonly anularRef: HTMLInputElement;
  @Ref('anularTabRef') public readonly anularTabRef: HTMLSpanElement;
  @Ref('motivoAnulRef') public readonly motivoAnulRef: HTMLInputElement;

  public customers: TMovimientos[] = null;
  public idConsecutivo: number = null;
  public allTipoMov: AllTipoMov[] = null;
  public customersData: Customer[] = null;
  public form: Partial<MovMercanciaRCana> = {
    consecTip: null,
    destino: 2,
    entrego: null,
    esPropio: true,
    fechaMov: null,
    imprim: 'N',
    nitoCC: null,
    observaciones: null,
    procesado: false,
    tipoMov: null,
  };
  public total: {
    subtota: number;
    unid: number;
  } = {
    subtota: 0,
    unid: 0,
  };
  public exportLabel = '';
  public lockedForm = true;
  public pdf = null;
  public showSubDet = false;
  public showSubLot = false;
  public isPdfOpen = false;
  public disableSubDetForm = false;
  public isModalOpen = false;
  public modalComponent: VComponent = null;
  public modalProps = null;

  private api = new RelaCanalApi(this.$store.getters.getAuthToken);

  public async mounted() {
    this.showLoading(true);

    const [{ data }] = await handle(this.api.getCliente());
    const [{ data: allTipoMov }] = await handle(this.api.allTipoMov());
    const [{ data: customersData }] = await handle(this.api.customers());

    this.customers = data.map((d) => {
      d.fechaMov = moment(d.fechaMov).format('DD/MM/YYYY');
      return d;
    });

    this.allTipoMov = allTipoMov;
    this.customersData = customersData;

    this.showLoading(false);
  }

  public showBusClient() {
    this.busClientRef.style.display = 'block';
  }

  public modify() {
    if (this.form.consecTip === null) {
      return;
    }

    if (this.checkDatesLimit(new Date(this.form.fechaMov))) {
      this.alert('La fecha esta afuera del limite permitido', true);
      return;
    }

    if (this.form.anulada) {
      this.alert('Documento anulado', true);
      return;
    }

    this.unlock();

    this.tipoMovRef.focus();
  }

  public unlock() {
    this.lockedForm = false;
  }

  public async onUpdateBusClient() {
    const [{ data }] = await handle(this.api.getBusCliente(this.idConsecutivo));
    data.fechaMov = moment(data.fechaMov).format('YYYY-MM-DD');
    this.form = data;
    this.busClientRef.style.display = 'none';
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
      this.showLoading(false);
      return;
    }

    if (this.checkDatesLimit(new Date(fechaMov))) {
      this.alert('La fecha esta afuera del limite permitido', true);
      this.showLoading(false);
      return;
    }

    if (this.form.consecTip === null || this.form.consecTip === 0) {
      this.alert(
        'La Relación de Canal no puede ser Cero, Escoja Tipo de Movimiento',
        true,
      );
      this.showLoading(false);
      return;
    }
  }

  public async save() {
    this.showLoading(true);

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
      this.showLoading(false);
      return;
    }

    this.alert(data.message);
    this.showLoading(false);
  }

  public async print() {
    this.showLoading(true);

    const [, err] = await handle(this.api.updatePesaje(this.form.consecTip));

    if (err) {
      this.alert(err.message, true);
      this.showLoading(false);
      return;
    }

    const [{ data: pdf }] = await handle(
      this.api.report(this.form.idConsecutivo),
    );

    this.form.imprim = 'S';
    await this.save();
    this.showLoading(false);

    this.pdf = pdf;
    this.isPdfOpen = true;
    this.disableSubDetForm = true;
  }

  public onClickAnularTab() {
    if (this.form.consecTip === null) {
      return;
    }

    if (this.checkDatesLimit(new Date(this.form.fechaMov))) {
      this.alert('La fecha esta afuera del limite permitido', true);
      return;
    }

    if (this.form.anulada) {
      this.alert('Documento anulado', true);
      return;
    }

    this.anularTabRef.click();
    this.anularRef.focus();
    this.form.anulada = true;
    this.motivoAnulRef.focus();
  }

  public async anular() {
    if (this.form.consecTip === null) {
      return;
    }

    this.showLoading(true);

    const [data, err] = await handle(
      this.api.anularMovement(this.form.consecTip, this.form.tipoMov, {
        motivoAnul: this.form.motivoAnul,
      }),
    );

    if (err) {
      this.alert(err.message, true);
      this.showLoading(false);
      return;
    }

    this.showLoading(false);
    this.alert(data.message);
  }

  public openDespaModal() {
    if (this.form.consecTip === null) {
      return;
    }

    this.isModalOpen = true;
    this.modalComponent = FrmSubConsoDespa;
    this.modalProps = {
      consecTipG: this.form.consecTip,
      tipoMovG: this.form.tipoMov,
    };
  }

  public async openLotModal() {
    if (this.form.consecTip === null) {
      return;
    }

    const [{ data }] = await handle(
      this.api.guiaNumber(this.form.consecTip, this.form.tipoMov),
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

  private async busClient(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<TMovimientos[]>;
    if (q.query) {
      response = await this.api.getClienteFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.idConsecutivo,
        item: `${d.consecTip} | ${moment(d.fechaMov)
          .utc()
          .format('YYYY-MM-DD')} | ${d.nombreCliente}`,
      }));
    }
    response = await this.api.getCliente(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.idConsecutivo,
      item: `${d.consecTip} | ${moment(d.fechaMov)
        .utc()
        .format('YYYY-MM-DD')} | ${d.nombreCliente}`,
    }));
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
