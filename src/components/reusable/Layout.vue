<!-- /*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/ -->
<template>
  <div class="flex h-screen">
    <Sidebar
      :open="isSidebarOpen"
      :name="name"
      :menu="components"
      @on-change-menu="setMenu"
    />
    <main class="flex flex-col w-full overflow-x-hidden overflow-y-auto">
      <Navbar :toggleSidebar="toggleSidebar" />
      <div class="overflow-auto">
        <AlertBox
          :output="alert.output"
          :isError="alert.isError"
          @empty="alert.output = ''"
        />
        <div class="flex flex-col">
          <Loader v-show="isLoading" />
        </div>
        <component
          :is="currentComponent"
          @alert="(m) => (alert = m)"
          :message="message"
          @reload="reload"
          :key="render"
          @show-loading="(l) => (isLoading = l)"
          :signal="signal"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import Navbar from '@/components/reusable/Navbar.vue';
import Sidebar from '@/components/reusable/Sidebar.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Menu, MenuOption } from '@/types/Menu';

@Component({
  components: {
    AlertBox,
    Loader,
    Navbar,
    Sidebar,
  },
  name: 'Layout',
})
export default class Layout extends Vue {
  @Prop(String) public readonly name: string;
  @Prop(Array) public readonly components: Menu;
  @Prop(Object) public readonly exception?: {
    isError: boolean;
    output: string;
  };

  public render = 0;
  public signal = null;

  public alert = {
    isError: false,
    output: '',
  };
  public isSidebarOpen = true;
  public currentComponent = null;
  public message = '';
  public isLoading = false;

  public mounted() {
    if (this.exception) {
      this.alert = this.exception;
    }
  }

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public setMenu(menu: MenuOption) {
    if (menu.onLoad) {
      menu.onLoad();
      return;
    }

    this.currentComponent = menu.component;

    if (menu.message) {
      this.message = menu.message;
    }
  }

  public reload(signal: (this: this) => void) {
    this.render++;
    this.signal = signal;
  }
}
</script>
