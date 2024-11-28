<!-- /*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/ -->
<template>
  <div class="overflow-x-auto rounded-lg border border-gray-300">
    <table class="table-auto text-xs w-full">
      <thead>
        <tr class="text-white bg-andrea">
          <th v-for="head in heads" :key="head" class="px-3 py-2">
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody class="text-center">
        <DetMovRelCanRow
          v-for="(item, i) in createdData"
          :canModify="canModify"
          :descriptions="descriptionOptions"
          :focusEtiqueta="false"
          :initData="item"
          :key="item.autoNum + i + rerender"
          :locked="locked"
          :readOnly="true"
          @alert="(a) => alert(a.output, a.isError)"
          @export="(e) => this.$emit('export', e)"
          @save="update"
        >
        </DetMovRelCanRow>
        <DetMovRelCanRow
          v-show="!locked"
          :canModify="canModify"
          :descriptions="descriptionOptions"
          :focusEtiqueta="!lockFocusOnMount && createdData.length > 0"
          :key="createdData.length + rerender"
          :locked="locked"
          :readOnly="false"
          @alert="(a) => alert(a.output, a.isError)"
          @export="(e) => this.$emit('export', e)"
          @save="save"
        ></DetMovRelCanRow>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import RelaCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { handle } from '@/utils';
import DetMovRelCanRow from './DetMovRelCanRow.vue';
import { IOption, DetMovimientoRCanal } from '@/types';
import LayoutWrapper from '@/classes/LayoutWrapper';

@Component({
  components: {
    DetMovRelCanRow,
  },
  name: 'SubDetRelaCanal',
})
export default class SubDetRelaCanal extends LayoutWrapper {
  @Prop(Number) public readonly consecTip: number;
  @Prop(Number) public readonly tipoMov: number;
  @Prop(Boolean) public readonly isOwn: boolean;
  @Prop(Boolean) public readonly isMovementCreated: boolean;
  @Prop(Boolean) public readonly locked: boolean;
  @Prop(Boolean) public readonly fetchOnMount?: boolean;

  public descriptionOptions: IOption[] = [];
  public canModify = false;
  public createdData: DetMovimientoRCanal[] = [];
  public rerender = 0;
  public lockFocusOnMount = false;

  public heads = [
    'Etiqueta',
    'Cod',
    'Descripcion',
    'Cant',
    'Kilos',
    'PH',
    'Temperatura',
    'Guia No',
    'N-Ani',
    'Lado',
    'Kilos CC',
    'Diferencia',
    'Anular',
    'Motivo',
    'Cuarteo',
    '',
  ];

  private api = new RelaCanalApi(this.$store.getters.getAuthToken);

  public async mounted() {
    this.lockFocusOnMount = false;

    const [{ data }] = await handle(this.api.detailDescriptions());

    this.descriptionOptions = data.map(
      ({ idCodigo, descripcionMer, suspendido }) => ({
        disabled: suspendido,
        key: idCodigo,
        text: descripcionMer,
        value: idCodigo,
      }),
    );

    this.canModify = this.$store.getters.getTConfinv1.puedeModK;

    if (this.fetchOnMount && this.rerender < 1) {
      this.lockFocusOnMount = true;
      await this.afterCreateOrUpdate();
      await this.total();
    }
  }

  public async validateBeforeSave(
    data: Partial<DetMovimientoRCanal>,
    error: boolean = true,
  ) {
    if (!this.isMovementCreated) {
      this.alert('Debe crear el movimiento primero', true);
      return;
    }

    if (this.consecTip === 0 || this.tipoMov === null) {
      this.alert(
        'Debe especificar el tipo de movimiento y la relación canal',
        true,
      );
      return;
    }

    const [check, checkFail] = await handle(
      this.api.checkDetailBeforeUpdateOrCreate(
        this.consecTip,
        this.tipoMov,
        data,
        this.isOwn,
      ),
    );

    if (checkFail) {
      this.alert(checkFail.message, error);
      return;
    }

    if (typeof check.data !== 'boolean') {
      data.idEti = check.data.consec;
    }

    return data;
  }

  public async save(data: Partial<DetMovimientoRCanal>) {
    data = await this.validateBeforeSave(data);

    if (!data) {
      return;
    }

    const [res, err] = await handle(
      this.api.createDetail(this.consecTip, this.tipoMov, data),
    );

    if (err) {
      this.alert(err.message, true);
      return;
    }

    await this.afterCreateOrUpdate();
    await this.total();
    this.alert(res.message);
  }

  public async update(data: Partial<DetMovimientoRCanal>) {
    data = await this.validateBeforeSave(data);

    if (!data) {
      return;
    }

    const [res, err] = await handle(
      this.api.updateDetail(this.consecTip, this.tipoMov, data.autoNum, data),
    );

    if (err) {
      this.alert(err.message, true);
      return;
    }

    await this.afterCreateOrUpdate();
    await this.total();
    this.alert(res.message);
    this.rerender++;
  }

  public async afterCreateOrUpdate() {
    const [{ data }] = await handle(this.api.details(this.consecTip));
    this.createdData = data.map((d) => {
      d.idCodigo = d.idCodigo.toLowerCase();
      return d;
    });
  }

  @Emit('total')
  public async total() {
    const [{ data: total }] = await handle(
      this.api.total(this.consecTip, this.tipoMov),
    );

    return total;
  }
}
</script>
