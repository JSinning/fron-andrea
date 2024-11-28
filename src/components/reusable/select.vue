<template>
  <div class="">
    <label class="label"><slot></slot></label>
    <v-select
      placeholder="-- Escoja una opcion--"
      :clearable="false"
      :appendToBody="true"
      :options="isItems"
      :reduce="(label) => label.id"
      label="item"
      v-on:input="openModule(value)"
      @input="changeClick()"
      @open="clickSelect()"
      v-model="value"
      :disabled="enable"
    >
      <li slot="list-footer" class="pagination" v-if="usePagination">
        <button :disabled="enablePrev" class="btn-save" @click="prev">
          Prev
        </button>
        <button :disabled="enableNext" class="btn-save" @click="next">
          Next
        </button>
      </li>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
@Component({
  name: 'select',
})
export default class Select extends Vue {
  @Prop() public isItems: IInterfaceSelect[] | undefined;
  @Prop() public value: string | number | undefined;
  @Prop(Boolean) public enable: boolean | undefined;
  @Prop(Boolean) public enablePrev: boolean | undefined;
  @Prop(Boolean) public enableNext: boolean | undefined;
  @Prop(Boolean) public usePagination: boolean | undefined;

  public openModule(value: any) {
    this.$emit('input', value);
  }

  public changeClick() {
    this.$emit('changed');
  }

  private clickSelect() {
    this.$emit('clickSelect');
  }

  private prev() {
    this.$emit('prev');
  }

  private next() {
    this.$emit('next');
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  margin: 0.25rem 0.25rem 0;
}
.pagination button {
  flex-grow: 1;
}
.pagination button:hover {
  cursor: pointer;
}
</style>
