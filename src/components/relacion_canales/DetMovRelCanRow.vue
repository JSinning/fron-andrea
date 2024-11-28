<!-- /*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/ -->
<template>
  <tr>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.etiqueta }}</span>
      <input
        v-show="!isReadOnly"
        v-model="form.etiqueta"
        ref="etiquetaRef"
        @change="checkEtiqueta"
      />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.idCodigo }}</span>
      <input v-else v-model="form.idCodigo" disabled />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ description }}</span>
      <select v-else v-model="form.idCodigo" @change="updateEtiqueta">
        <option
          v-for="description in descriptions"
          :value="description.value.toString().toLowerCase()"
          :key="description.value.toString().toLowerCase()"
        >
          {{ description.text }}
        </option>
      </select>
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.cantidadUn }}</span>
      <input
        v-else
        v-model.number="form.cantidadUn"
        type="number"
        :disabled="!canModify"
      />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.cantidad }}</span>
      <input v-else v-model.number="form.cantidad" type="number" required />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.ph }}</span>
      <input v-else v-model.number="form.ph" type="number" required />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.temperatura }}</span>
      <input v-else v-model.number="form.temperatura" type="number" required />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.guiaNo }}</span>
      <input v-else v-model.number="form.guiaNo" type="number" disabled />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.nAnima }}</span>
      <input v-else v-model.number="form.nAnima" type="number" disabled />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.ladoAni }}</span>
      <input v-else v-model="form.ladoAni" type="text" disabled />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.cantidad2 }}</span>
      <input v-else v-model.number="form.cantidad2" type="number" disabled />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ Math.abs(form.difer) }}</span>
      <input v-else v-model.number="difer" type="number" disabled />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1' : ''">
      <input
        v-model="form.anular"
        type="checkbox"
        @change="form.motivoAnula = null"
        :disabled="isReadOnly"
      />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1 text-left' : ''">
      <span v-if="isReadOnly">{{ form.motivoAnula }}</span>
      <input
        v-else
        v-model="form.motivoAnula"
        type="text"
        :disabled="!form.anular"
      />
    </td>
    <td :class="isReadOnly ? 'px-1 py-1' : ''">
      <input v-model="form.cuarteo" type="checkbox" :disabled="isReadOnly" />
    </td>
    <td v-if="!locked" class="border-none">
      <button
        type="submit"
        class="btn-save m-0"
        @click.stop="isReadOnly ? toggleReadOnly() : save()"
      >
        {{ isReadOnly ? 'Editar' : 'Guardar' }}
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Ref, Emit } from 'vue-property-decorator';
import { DetMovimientoRCanal, IOption } from '@/types';
import moment from 'moment';
import { handle } from '@/utils';
import RelaCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import LayoutWrapper from '@/classes/LayoutWrapper';

@Component({
  name: 'DetMovRelCanRow',
})
export default class DetMovRelCanRow extends LayoutWrapper {
  @Ref('etiquetaRef') public readonly etiquetaRef: HTMLInputElement;

  @Prop(Array) public readonly descriptions: IOption[];
  @Prop(Boolean) public readonly canModify: boolean;
  @Prop(Boolean) public readonly readOnly: boolean;
  @Prop(Object) public readonly initData?: DetMovimientoRCanal;
  @Prop(Boolean) public readonly focusEtiqueta?: boolean;
  @Prop(Boolean) public readonly locked?: boolean;

  public form: Partial<DetMovimientoRCanal> = {
    anular: false,
    cantidad: null,
    cantidad2: null,
    cantidadUn: 1,
    cuarteo: false,
    etiqueta: null,
    guiaNo: null,
    idCodigo: null,
    idEti: 0,
    ladoAni: null,
    motivoAnula: null,
    nAnima: null,
    ph: null,
    temperatura: null,
  };

  public description = null;
  public isReadOnly: boolean = null;

  private api = new RelaCanalApi(this.$store.getters.getAuthToken);

  public mounted() {
    if (this.initData && this.readOnly) {
      this.isReadOnly = this.readOnly;
      this.form = this.initData;
      this.form.difer = Number(this.form.difer.toFixed(2));
      this.description = this.descriptions.find(
        (d) => d.key.toString().toLowerCase() === this.form.idCodigo,
      ).text;
    }

    if (this.focusEtiqueta) {
      this.etiquetaRef.focus();
    }
  }

  public async checkEtiqueta() {
    const splitted = this.form.etiqueta.split('.');

    if (splitted.length === 5) {
      const [, noGuia] = await handle(
        this.api.checkEtiqueta(this.form.etiqueta),
      );

      if (noGuia) {
        this.etiquetaRef.focus();
        this.alert(noGuia.message, true);
        return;
      }

      this.form.guiaNo = Number(splitted[0]);
      this.form.nAnima = Number(splitted[1]);
      this.form.ladoAni = splitted[2];
      this.form.cantidad2 = parseFloat(splitted[3].replace(',', '.'));
      this.form.idCodigo = splitted[4].toLowerCase();

      await this.afterCheckEtiqueta();
    }
  }

  public async afterCheckEtiqueta() {
    const [, err] = await handle(
      this.api.afterCheckEtiqueta(this.form.etiqueta),
    );

    if (err) {
      this.export('');
      return;
    }

    this.export('Exportacion');
  }

  @Emit()
  public export(e: string) {
    return e;
  }

  public updateEtiqueta() {
    const splitted = this.form.etiqueta.split('.');

    if (splitted.length === 5) {
      this.form.etiqueta = this.form.etiqueta.replace(
        splitted[splitted.length - 1],
        this.form.idCodigo,
      );
      this.alert(
        'Etiqueta actualizada. Haga clic en el botón guardar para efectuar estos cambios.',
      );
    }
  }

  public get difer() {
    return Math.abs(this.form.cantidad - this.form.cantidad2).toFixed(2);
  }

  public toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
    this.$nextTick(() => {
      this.etiquetaRef.focus();
      this.etiquetaRef.select();
    });
  }

  @Emit()
  public save() {
    this.form = {
      ...this.form,
      fechaG: moment(this.form.fechaG).format(),
    };
    return this.form;
  }
}
</script>

<style scoped>
input,
select,
span,
button {
  @apply px-1 py-1;
}

td {
  @apply border border-gray-400;
}
</style>
