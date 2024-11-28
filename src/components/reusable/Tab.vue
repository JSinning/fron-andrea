<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Tab',
})
export default class Tab extends Vue {
  @Prop(String) public readonly title: string;

  public isActive = false;
}
</script>
