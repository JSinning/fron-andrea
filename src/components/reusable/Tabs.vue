<template>
  <div>
    <div class="mt-2 mb-0 nav">
      <label
        v-for="(tab, idx) in tabs"
        :for="tab.title"
        :key="tab.title"
        @click="selectTab(idx)"
        :class="{ 'selected-tab rounded-t-md': selectedIndex === idx }"
      >
        <span
          class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
        >
          {{ tab.title }}
        </span>
      </label>
    </div>
    <div class="card mt-0 pt-3 px-10">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Tabs',
})
export default class Tabs extends Vue {
  public selectedIndex = 0;
  public tabs = [];

  public created() {
    this.tabs = this.$children;
  }

  public mounted() {
    this.tabs[0].isActive = true;
  }

  public selectTab(i: number) {
    this.selectedIndex = i;
    this.tabs.forEach((tab, idx) => (tab.isActive = idx === i));
  }
}
</script>

<style scoped>
.selected-tab {
  background-color: rgba(128, 128, 128, 0.329);
}
</style>
